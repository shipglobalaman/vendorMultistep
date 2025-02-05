import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { Plus, UserCheck2, FileEdit, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import clsx from "clsx";
import { FormInput } from "../elements/FormInput";

interface OrderDetailProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
type ItemFields = "productName" | "sku" | "hsn" | "qty" | "unitPrice";

export default function OrderDetail({ step, setStep }: OrderDetailProps) {
  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      shipmentType: "CSB IV",
      invoiceCurrency: "INR",
      items: [
        {
          productName: "",
          sku: "",
          hsn: "",
          qty: "",
          unitPrice: "",
          igst: "0",
        },
      ],
    },
  });

  const itemFields = ["productName", "sku", "hsn", "qty", "unitPrice"];
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      const parsedData: z.infer<typeof orderFormSchema> = JSON.parse(savedData);
      form.reset(parsedData);
    }
  }, [form]);

  function onSubmit(values: z.infer<typeof orderFormSchema>) {
    const existingData = localStorage.getItem("formData");
    let formData = existingData ? JSON.parse(existingData) : {};
    formData = {
      ...formData,
      ...values,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
    setStep(step + 1);
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container mx-auto p-6 space-y-8">
        <ShipmentSelection form={form} />
        <ShipmentDetails form={form} />

        {/* Order Details Section */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Order Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            />
          </div>
          <FormInput
            control={form.control}
            name="iossNumber"
            label="IOSS Number"
          />

          {/* Item Details Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Item Details</h2>
            {fields.map((field, index) => (
              <div className="lg:flex items-center gap-x-2" key={field.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4">
                  {(itemFields as ItemFields[]).map((itemField) => {
                    // Conditionally determine the label based on the field name
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

                    // Conditionally determine the className
                    const className =
                      itemField === "unitPrice" || itemField === "productName"
                        ? "lg:col-span-2"
                        : "col-span-1";

                    // Conditionally make fields required (example: 'sku' is not required)
                    const required = itemField !== "sku";

                    return (
                      <FormInput
                        key={itemField}
                        control={form.control}
                        name={`items.${index}.${itemField}` as const}
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
                {fields.length > 1 && (
                  <div onClick={() => remove(index)} className="mt-7">
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </div>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                append({
                  productName: "",
                  sku: "",
                  hsn: "",
                  qty: "",
                  unitPrice: "",
                  igst: "0",
                })
              }
              className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Item
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <Button
            onClick={() => {
              setStep(step - 1);
            }}
            variant="ghost"
            className="text-blue-500 hover:text-blue-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}

const shipmentOptions = [
  {
    type: "CSB IV",
    icon: <UserCheck2 className="w-6 h-6 text-blue-500" />,
    description: "Non-Commercial Mode - Minimum Documentation Required",
    extra: "Supports All Service Providers",
  },
  {
    type: "CSB V",
    icon: <FileEdit className="w-6 h-6 text-gray-500" />,
    description: "Commercial Mode - Valid Export Documents Required",
    extra: "Only ShipGlobal Direct",
  },
];

const ShipmentSelection = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof orderFormSchema>>;
}) => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Shipment Type</h2>
      <p className="text-gray-500">
        Please select the shipment mode. Note: CSB-V shipments can only be sent
        through ShipGlobal Direct. If other partner services are needed, please
        select CSB IV.
      </p>
      <p className="text-gray-500">
        If you need more info, call/WhatsApp at{" "}
        <a href="tel:+919811098919" className="text-blue-500">
          +91 9811098919
        </a>
        .
      </p>

      <FormField
        control={form.control}
        name="shipmentType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <div className="grid md:grid-cols-2 gap-6">
                {shipmentOptions.map(({ type, icon, description, extra }) => (
                  <Card
                    key={type}
                    onClick={() => field.onChange(type)}
                    aria-label={`Select ${type}`}
                    className={clsx(
                      "border-2 border-dashed cursor-pointer transition-all",
                      field.value === type
                        ? "border-blue-500"
                        : "border-gray-200"
                    )}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {icon}
                        <span className="font-medium">{type}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-gray-600">{description}</p>
                      <p className="text-gray-600">{extra}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
};

const shipmentFields = [
  { name: "actualWeight", label: "Actual Weight", unit: "KG" },
  { name: "length", label: "Length", unit: "CM" },
  { name: "breadth", label: "Breadth", unit: "CM" },
  { name: "height", label: "Height", unit: "CM" },
];

const ShipmentDetails = ({ form }) => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Shipment Details</h2>
      <p className="text-gray-500">
        If you need more info, please check out{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Help Page
        </a>
        .
      </p>

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
