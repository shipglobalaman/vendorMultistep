import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/components/orders/store/Store";
import {
  setFormData,
  setStep,
  setActiveSection,
  setActiveStep,
} from "@/components/orders/store/OrderSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, type UseFormReturn } from "react-hook-form";
import type * as z from "zod";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { orderFormSchema } from "@/zod validation/Schema";
import { FormInput } from "../elements/FormInput";
import { Badge } from "../ui/badge";

export default function OrderDetail() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.order);
  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: useSelector((state: RootState) => state.order),
  });

  useEffect(() => {
    form.reset(formData);
  }, [form, formData]);

  function onSubmit(values: z.infer<typeof orderFormSchema>) {
    dispatch(setFormData(values));
    dispatch(setStep(formData.step + 1));
    dispatch(setActiveSection("shipping"));
    dispatch(setActiveStep(4));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container mx-auto space-y-8">
        {/* <ShipmentSelection form={form} /> */}
        <div className="space-y-6">
          <OrderDetails form={form} />
          <BoxMeasurements form={form} />
          <ItemsDetails form={form} />
        </div>
        <div className="flex justify-end">
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
        options={["INR", "USD", "EUR"]}
      />
      <FormInput
        control={form.control}
        name="orderId"
        label="Order Id/Ref. Id"
        required
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
}: {
  form: UseFormReturn<z.infer<typeof orderFormSchema>>;
}) => {
  const formData = useSelector((state: RootState) => state.order);
  const { invoiceCurrency } = formData;
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
                  label = "Unit Price(INR)";
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
      ))}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="secondary"
          onClick={() => append({ ...itemTemplate })}
          className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Item
        </Button>
        <p className="font-semibold">
          Total Price : {invoiceCurrency} {totalPrice}
        </p>
      </div>
    </div>
  );
};
