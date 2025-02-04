import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { orderFormSchema } from "@/zod validation/Schema";

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
      const parsedData = JSON.parse(savedData);
      console.log(parsedData);
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
        {/* Shipment Type Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Shipment Type</h2>
          <p className="text-gray-500">
            Please select the shipment Mode. Note: CSB-V Shipments can only be
            sent through ShipGlobal Direct. If other partner services are needed
            please select CSB IV.
          </p>
          <p className="text-gray-500">
            If you need more info, please call/whatsapp at
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
                    {[
                      {
                        type: "CSB IV",
                        icon: <UserCheck2 className="w-6 h-6 text-blue-500" />,
                        description:
                          "Non Commercial Mode Minimum Documentation,",
                        extra: "All Service Providers",
                      },
                      {
                        type: "CSB V",
                        icon: <FileEdit className="w-6 h-6 text-gray-500" />,
                        description:
                          "Commercial Mode Valid Export Documents Required, ",
                        extra: "Only ShipGlobal Direct",
                      },
                    ].map((item) => (
                      <Card
                        key={item.type}
                        onClick={() => field.onChange(item.type)}
                        className={`border-2 border-dashed cursor-pointer transition-all ${
                          field.value === item.type
                            ? "border-blue-500"
                            : "border-gray-200"
                        }`}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            {item.icon}
                            <span className="font-medium">{item.type}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-gray-600">{item.description}</p>
                          <p className="text-gray-600">{item.extra}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Shipment Details Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Shipment Details</h2>
          <p className="text-gray-500">
            If you need more info, please check out{" "}
            <a href="#" className="text-blue-500">
              Help Page
            </a>
            .
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["actualWeight", "length", "breadth", "height"].map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as "actualWeight" | "length" | "breadth" | "height"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex">
                        <Input
                          {...field}
                          type="number"
                          placeholder="0.00"
                          className="rounded-r-none"
                        />
                        <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-muted text-muted-foreground text-sm">
                          {field.name === "actualWeight" ? "KG" : "CM"}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        {/* Order Details Section */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Order Details</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FormField
              control={form.control}
              name="invoiceNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Invoice No. <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter invoice number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="invoiceDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Invoice Date <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="invoiceCurrency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Invoice Currency <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="INR">INR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="orderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Id/Ref. Id</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter order ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="iossNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IOSS Number:</FormLabel>
                <FormControl>
                  <Input placeholder="Enter IOSS number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Item Details Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Item Details</h2>
            {fields.map((field, index) => (
              <div className="lg:flex items-center gap-x-2">
                <div
                  key={field.id}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4 ">
                  {(itemFields as ItemFields[]).map((itemField) => (
                    <FormField
                      key={itemField}
                      control={form.control}
                      name={`items.${index}.${itemField}` as const}
                      render={({ field }) => (
                        <FormItem
                          className={
                            itemField === "unitPrice" ||
                            itemField === "productName"
                              ? "lg:col-span-2"
                              : "col-span-1"
                          }>
                          <FormLabel>
                            {itemField === "productName"
                              ? "Product Name"
                              : itemField === "sku"
                              ? "SKU"
                              : itemField === "hsn"
                              ? "HSN"
                              : itemField === "qty"
                              ? "Qty"
                              : "Unit Price(INR)"}
                            {itemField !== "sku" && (
                              <span className="text-red-500">*</span>
                            )}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type={
                                itemField === "qty" || itemField === "unitPrice"
                                  ? "number"
                                  : "text"
                              }
                              placeholder={`Enter ${itemField}`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <FormField
                    control={form.control}
                    name={`items.${index}.igst` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          IGST <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select IGST" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">0%</SelectItem>
                            <SelectItem value="5">5%</SelectItem>
                            <SelectItem value="12">12%</SelectItem>
                            <SelectItem value="18">18%</SelectItem>
                            <SelectItem value="28">28%</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
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
