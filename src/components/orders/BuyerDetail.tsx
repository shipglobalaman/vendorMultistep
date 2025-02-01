import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "@/zod validation/Schema";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DashboardPage from "@/layouts/DashboardPage";
import { FormInput } from "../elements/FormInput";

const addresses = [
  {
    value: "office-1",
    label:
      "Head OFFICE, mahipalpur, Indira Park, South West Delhi, Delhi-110045-8392328932",
  },
];
interface FormValues {
  shippingFirstName: string;
  shippingLastName: string;
  shippingMobile: string;
  shippingAlternateMobile: string;
  shippingEmail: string;
  shippingCountry: string;
  shippingAddress1: string;
  shippingLandmark: string;
  shippingCity: string;
  shippingState: string;
  shippingPincode: string;
  billingFirstName: string;
  billingLastName: string;
  billingMobile: string;
  billingAlternateMobile: string;
  billingEmail: string;
  billingCountry: string;
  billingAddress1: string;
  billingLandmark: string;
  billingCity: string;
  billingState: string;
  billingPincode: string;
}
interface BuyerDetailProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
export default function BuyerDetail({ step, setStep }: BuyerDetailProps) {
  const [checked, setChecked] = useState(true);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupAddress: "",
      shippingFirstName: "",
      shippingLastName: "",
      shippingMobile: "",
      shippingAlternateMobile: "",
      shippingEmail: "",
      shippingCountry: "india",
      shippingAddress1: "",
      shippingLandmark: "",
      shippingAddress2: "",
      shippingPincode: "",
      shippingCity: "",
      shippingState: "",
      sameAsBilling: false,
      billingFirstName: "",
      billingLastName: "",
      billingMobile: "",
      billingAlternateMobile: "",
      billingEmail: "",
      billingCountry: "india",
      billingAddress1: "",
      billingLandmark: "",
      billingAddress2: "",
      billingPincode: "",
      billingCity: "",
      billingState: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log(values);
    setStep(step + 1);
  }
  return (
    <DashboardPage>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="max-w-3xl">
            <div className="mb-8">
              <div className="flex items-center gap-1">
                <h2 className="text-xl font-semibold">Select Pickup Address</h2>
                <span className="text-red-500">*</span>
              </div>
              <FormField
                control={form.control}
                name="pickupAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full mt-2 justify-between h-auto py-3 text-left font-normal">
                            {field.value
                              ? addresses.find(
                                  (address) => address.value === field.value
                                )?.label
                              : "Select pickup address..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
                          <Command>
                            <CommandInput placeholder="Search address..." />
                            <CommandList>
                              <CommandEmpty>No address found.</CommandEmpty>
                              <CommandGroup>
                                {addresses.map((address) => (
                                  <CommandItem
                                    key={address.value}
                                    value={address.value}
                                    onSelect={() => {
                                      form.setValue(
                                        "pickupAddress",
                                        address.value
                                      );
                                      setOpen(false);
                                    }}>
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === address.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {address.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-6">
                Buyer Shipping Details
              </h2>
              <div className="md:grid grid-cols-3 gap-6">
                <FormInput
                  control={form.control}
                  name="shippingFirstName"
                  label="First Name"
                  className=""
                />
                <FormInput
                  control={form.control}
                  name="shippingLastName"
                  label="Last Name"
                  className=""
                />
                <FormInput
                  control={form.control}
                  name="shippingMobile"
                  label="Mobile No."
                  className=""
                />
                <FormInput
                  control={form.control}
                  name="shippingAlternateMobile"
                  label="Alternate Mobile No."
                  className=""
                />
                <FormInput
                  control={form.control}
                  name="shippingEmail"
                  label="Email Id"
                  className="col-span-2"
                />
              </div>
              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="shippingCountry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="india">India (IND)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <FormInput
                  control={form.control}
                  name="shippingAddress1"
                  label="Address 1"
                  className=""
                />
                <FormInput
                  control={form.control}
                  name="shippingLandmark"
                  label="Landmark"
                  className=""
                />
              </div>
              <div className="space-y-2 mt-6">
                <FormInput
                  control={form.control}
                  name="shippingAddress2"
                  label="Address 2"
                  className=""
                />
              </div>
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <FormInput
                  control={form.control}
                  name="shippingPincode"
                  label="Pincode"
                  className=""
                />
                <FormInput
                  control={form.control}
                  name="shippingCity"
                  label="City"
                  className=""
                />
                <FormField
                  control={form.control}
                  name="shippingState"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="up">UP</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mt-12">
              <FormField
                control={form.control}
                name="sameAsBilling"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(value) => {
                          setChecked(value as boolean);
                          field.onChange(value);
                          if (value) {
                            Object.keys(form.getValues()).forEach((key) => {
                              if (key.startsWith("shipping")) {
                                const billingKey = key.replace(
                                  "shipping",
                                  "billing"
                                ) as keyof FormValues;
                                form.setValue(
                                  billingKey,
                                  form.getValues(key as keyof FormValues)
                                );
                              }
                            });
                          }
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Shipping & Billing Address are same</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className={checked ? "hidden" : "mt-12"}>
              <h2 className="text-xl font-semibold mb-6">
                Buyer Billing Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormInput
                  control={form.control}
                  name="billingFirstName"
                  label="First Name"
                  className=""
                />
                <FormInput
                  control={form.control}
                  name="billingLastName"
                  label="Last Name"
                  className=""
                />
                <FormInput
                  control={form.control}
                  name="billingMobile"
                  label="Mobile No."
                  className=""
                />
              </div>
              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="billingCountry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={form.watch("sameAsBilling")}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="india">India (IND)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-6">
                <FormInput
                  control={form.control}
                  name="billingAddress1"
                  label="Address 1"
                  className=""
                />
                <FormInput
                  control={form.control}
                  name="billingLandmark"
                  label="Landmark"
                  className=""
                />
              </div>
              <div className="space-y-2 mt-6">
                <FormInput
                  control={form.control}
                  name="billingAddress2"
                  label="Address 2"
                  className=""
                />
              </div>
              <div className="grid grid-cols-3 gap-6 mt-6">
                <FormInput
                  control={form.control}
                  name="billingPincode"
                  label="Pincode"
                  className=""
                />
                <FormInput
                  control={form.control}
                  name="billingCity"
                  label="City"
                  className=""
                />
                <FormField
                  control={form.control}
                  name="billingState"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={form.watch("sameAsBilling")}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="up">UP</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit" className="mt-10" size="lg">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </DashboardPage>
  );
}
