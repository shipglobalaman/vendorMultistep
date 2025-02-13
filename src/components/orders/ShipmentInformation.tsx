import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, useFieldArray, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { Plus, Trash2 } from "lucide-react";

import { orderFormSchema } from "@/zod validation/Schema";
import type { RootState } from "@/components/orders/store/Store";
import {
  setFormData,
  setStep,
  setActiveSection,
  setActiveStep,
} from "@/components/orders/store/OrderSlice";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "../ui/badge";
import { FormInput } from "../elements/FormInput";
import { fetchAPI } from "./Api";

export default function OrderDetail() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.order);
  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: useSelector((state: RootState) => state.order),
  });

  const invoiceCurrency = form.watch("invoiceCurrency");
  useEffect(() => {
    form.reset(formData);
  }, [form, formData]);

  async function onSubmit(values: z.infer<typeof orderFormSchema>) {
    try {
      setErrorMessage("");

      await fetchAPI("validate-order-invoice", "POST", {
        csbv: "0",
        currency_code: values.invoiceCurrency,
        package_weight: values.actualWeight,
        package_height: values.height,
        package_length: values.length,
        package_breadth: values.breadth,
        vendor_order_item: values.items.map((item) => ({
          vendor_order_item_name: item.productName,
          vendor_order_item_sku: item.sku || "",
          vendor_order_item_quantity: Number(item.qty),
          vendor_order_item_unit_price: Number(item.unitPrice),
          vendor_order_item_hsn: item.hsn,
          vendor_order_item_tax_rate: item.igst || "0",
        })),
      });

      dispatch(setFormData(values));
      dispatch(setStep(formData.step + 1));
      dispatch(setActiveSection("shipping"));
      dispatch(setActiveStep(4));
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container mx-auto space-y-8">
        <div className="space-y-6">
          <OrderDetails form={form} />
          <BoxMeasurements form={form} />
          <ItemsDetails
            form={form}
            errorMessage={errorMessage}
            invoiceCurrency={invoiceCurrency}
          />
        </div>
        <div className="flex justify-end items-center">
          <Button
            size="lg"
            type="submit"
            className="mt-6 bg-blue-900 hover:bg-blue-800">
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
}

const OrderDetails = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof orderFormSchema>>;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FormInput
        control={form.control}
        name="invoiceNo"
        label="Invoice No."
        required
      />
      <FormInput
        control={form.control}
        name="invoiceDate"
        label="Invoice Date"
        type="date"
        required
      />
      <FormInput
        control={form.control}
        name="invoiceCurrency"
        label="Invoice Currency"
        required
        type="select"
        options={["INR", "USD", "EUR", "GPB", "CAD", "AUD", "AED", "SUR"]}
      />
      <FormInput
        control={form.control}
        name="orderId"
        label="Order Id/Ref. Id"
      />
      <FormInput control={form.control} name="iossNumber" label="IOSS Number" />
    </div>
  );
};

type OrderFormFields = keyof z.infer<typeof orderFormSchema>;
const shipmentFields: { name: OrderFormFields; label: string; unit: string }[] =
  [
    { name: "actualWeight", label: "Actual Weight", unit: "KG" },
    { name: "length", label: "Length", unit: "CM" },
    { name: "breadth", label: "Breadth", unit: "CM" },
    { name: "height", label: "Height", unit: "CM" },
  ];

const BoxMeasurements = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof orderFormSchema>>;
}) => {
  return (
    <section className="space-y-4">
      <h2 className="text-base font-bold">Box Measurements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {shipmentFields.map(({ name, label, unit }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {label} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="flex">
                    <Input
                      {...field}
                      placeholder="0.00"
                      className="rounded-r-none"
                      value={typeof field.value === "string" ? field.value : ""}
                      type="number"
                    />
                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-muted text-muted-foreground text-sm">
                      {unit}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </section>
  );
};

const ItemsDetails = ({
  form,
  errorMessage,
  invoiceCurrency,
}: {
  form: UseFormReturn<z.infer<typeof orderFormSchema>>;
  errorMessage?: string | null;
  invoiceCurrency?: string;
}) => {
  const items = form.watch("items");
  const totalPrice = items.reduce((acc, item) => {
    const qty = Number(item.qty) || 0;
    const unitPrice = Number(item.unitPrice) || 0;
    return acc + qty * unitPrice;
  }, 0);
  const itemFields = ["productName", "sku", "hsn", "qty", "unitPrice"];
  const itemTemplate = {
    productName: "",
    sku: "",
    hsn: "",
    qty: "",
    unitPrice: "",
    igst: "0",
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <h2 className="text-base font-bold">Item(s) Details</h2>
        <Badge
          variant="secondary"
          className="bg-orange-100 text-orange-600 font-normal py-0">
          Items that can export
        </Badge>
      </div>
      {fields.map((field, index) => (
        <div>
          <div className="lg:flex items-center gap-x-2" key={field.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4">
              {itemFields.map((itemField) => {
                let label = "";
                switch (itemField) {
                  case "productName":
                    label = "Product Name";
                    break;
                  case "sku":
                    label = "SKU";
                    break;
                  case "hsn":
                    label = "HSN";
                    break;
                  case "qty":
                    label = "Qty";
                    break;
                  case "unitPrice":
                    label = `Unit Price(${invoiceCurrency})`;
                    break;
                }
                const className =
                  itemField === "unitPrice" || itemField === "productName"
                    ? "lg:col-span-2"
                    : "col-span-1";
                const required = itemField !== "sku";

                return (
                  <FormInput
                    key={itemField}
                    control={form.control}
                    name={
                      `items.${index}.${itemField}` as keyof z.infer<
                        typeof orderFormSchema
                      >
                    }
                    label={label}
                    className={className}
                    type={
                      itemField === "qty" || itemField === "unitPrice"
                        ? "number"
                        : "text"
                    }
                    required={required}
                  />
                );
              })}

              <FormInput
                control={form.control}
                name={`items.${index}.igst` as const}
                label="IGST"
                className="col-span-1"
                type="select"
                required
                options={["0", "5", "12", "18", "28"]}
              />
            </div>
            {index > 0 && (
              <div onClick={() => remove(index)} className="mt-7">
                <Trash2 className="w-5 h-5 text-red-500 cursor-pointer" />
              </div>
            )}
          </div>
          <p className="text-xs font-semibold text-destructive py-4">
            {errorMessage}
          </p>
        </div>
      ))}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="secondary"
          onClick={() => append({ ...itemTemplate })}
          className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Item
        </Button>
        <p className="font-bold text-base">
          Total Price : {invoiceCurrency} {totalPrice}
        </p>
      </div>
    </div>
  );
};
