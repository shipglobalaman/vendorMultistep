import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/zod validation/Schema";
import type * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import DashboardPage from "@/layouts/DashboardPage";
import { FormInput } from "@/components/elements/FormInput";
import { ComboBoxFormField } from "@/components/elements/ComboBoxFormField";
import { useCountries, useStates } from "@/components/orders/CountryApi";

const addresses = [
  {
    value:
      "Head OFFICE, mahipalpur, Indira Park, South West Delhi, Delhi-110045-8392328932",
    label:
      "Head OFFICE, mahipalpur, Indira Park, South West Delhi, Delhi-110045-8392328932",
  },
];

interface BuyerDetailProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function BuyerDetail({ step, setStep }: BuyerDetailProps) {
 
  const [selectedShippingCountry, setSelectedShippingCountry] = useState("");
  const [selectedBillingCountry, setSelectedBillingCountry] = useState("");
  const { countries, loading: countriesLoading } = useCountries();
  const { states: shippingStates, loading: statesLoading } = useStates(
    selectedShippingCountry
  );
  const { states: billingStates, loading: billingStatesLoading } = useStates(
    selectedBillingCountry
  );
  const savedData = localStorage.getItem("formData");
  const initialChecked = savedData
    ? JSON.parse(savedData).sameAsBilling ?? true
    : true;
  const [checked, setChecked] = useState(initialChecked);


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

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      form.reset(parsedData);
      if (parsedData.shippingCountry) {
        setSelectedShippingCountry(parsedData.shippingCountry);
      }
      if (parsedData.billingCountry) {
        setSelectedBillingCountry(parsedData.billingCountry);
      }
    }
  }, [form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const existingData = localStorage.getItem("formData");
    let formData = existingData ? JSON.parse(existingData) : {};
    formData = {
      ...formData,
      ...values,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
    setStep(step + 1);
  }

  const shippingAddress = form.watch([
    "shippingFirstName",
    "shippingLastName",
    "shippingMobile",
    "shippingAlternateMobile",
    "shippingEmail",
    "shippingCountry",
    "shippingAddress1",
    "shippingLandmark",
    "shippingAddress2",
    "shippingPincode",
    "shippingCity",
    "shippingState",
  ]);

  useEffect(() => {
    if (checked) {
      form.setValue("billingFirstName", form.getValues("shippingFirstName"));
      form.setValue("billingLastName", form.getValues("shippingLastName"));
      form.setValue("billingMobile", form.getValues("shippingMobile"));
      form.setValue(
        "billingAlternateMobile",
        form.getValues("shippingAlternateMobile")
      );
      form.setValue("billingEmail", form.getValues("shippingEmail"));
      form.setValue("billingAddress1", form.getValues("shippingAddress1"));
      form.setValue("billingLandmark", form.getValues("shippingLandmark"));
      form.setValue("billingAddress2", form.getValues("shippingAddress2"));
      form.setValue("billingPincode", form.getValues("shippingPincode"));
      form.setValue("billingCity", form.getValues("shippingCity"));
      form.setValue("billingCountry", form.getValues("shippingCountry"));
      form.setValue("billingState", form.getValues("shippingState"));
    }
  }, [checked, form, shippingAddress]);

  return (
    <DashboardPage>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="max-w-3xl">
            <div className="px-2 space-y-5 mb-12">
              <div className="flex items-center gap-1">
                <h2 className="text-xl font-semibold">Select Pickup Address</h2>
                <span className="text-red-500">*</span>
              </div>
              <ComboBoxFormField
                name="pickupAddress"
                label="Pickup Address"
                options={addresses}
                placeholder="Select pickup address..."
                searchPlaceholder="Search address..."
                emptyMessage="No address found."
                required={true}
              />
            </div>
            <hr />
            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-6">
                Buyer Shipping Details
              </h2>
              <div className="md:grid grid-cols-3 gap-6 space-y-5 md:space-y-0">
                <FormInput
                  key="shippingFirstName"
                  control={form.control}
                  name="shippingFirstName"
                  label="First Name"
                  required={true}
                />
                <FormInput
                  key="shippingLastName"
                  control={form.control}
                  name="shippingLastName"
                  label="Last Name"
                  required={true}
                />
                <FormInput
                  key="shippingMobile"
                  control={form.control}
                  name="shippingMobile"
                  label="Mobile No."
                  required={true}
                />
                <FormInput
                  key="shippingAlternateMobile"
                  control={form.control}
                  name="shippingAlternateMobile"
                  label="Alternate Mobile No."
                />
                <FormInput
                  key="shippingEmail"
                  control={form.control}
                  name="shippingEmail"
                  label="Email Id"
                  className="col-span-2"
                  required={true}
                />
              </div>
            </div>
            <div className="mt-6">
              <ComboBoxFormField
                name="shippingCountry"
                label="Country"
                options={countries.map((country) => ({
                  value: country.code,
                  label: country.name,
                }))}
                placeholder="Select Country"
                searchPlaceholder="Search country..."
                emptyMessage="No country found."
                loading={countriesLoading}
                onOptionSelected={setSelectedShippingCountry}
                required={true}
              />
            </div>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <FormInput
                key="shippingAddress1"
                control={form.control}
                name="shippingAddress1"
                label="Address 1"
                required={true}
              />
              <FormInput
                key="shippingLandmark"
                control={form.control}
                name="shippingLandmark"
                label="Landmark"
              />
            </div>
            <div className="space-y-2 mt-6">
              <FormInput
                key="shippingAddress2"
                control={form.control}
                name="shippingAddress2"
                label="Address 2"
                required={true}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <FormInput
                key="shippingPincode"
                control={form.control}
                name="shippingPincode"
                label="Pincode"
                required={true}
              />
              <FormInput
                key="shippingCity"
                control={form.control}
                name="shippingCity"
                label="City"
                required={true}
              />
              <ComboBoxFormField
                name="shippingState"
                label="State"
                options={shippingStates.map((state) => ({
                  value: state.name,
                  label: state.name,
                }))}
                placeholder="Select a state"
                searchPlaceholder="Search state..."
                emptyMessage="No state found."
                loading={statesLoading}
                required={true}
              />
            </div>
          </div>
          <div className="mt-12">
            <FormInput
              control={form.control}
              name="sameAsBilling"
              label="Shipping & Billing Address are same"
              type="checkbox"
              checked={checked}
              onCheckedChange={setChecked}
            />
          </div>
          <div className={`${checked ? "hidden" : "mt-12"}`}>
            <h2 className="text-xl font-semibold mb-6">
              Buyer Billing Details
            </h2>
            <div className="md:grid grid-cols-3 gap-6 space-y-5 md:space-y-0">
              <FormInput
                key="billingFirstName"
                control={form.control}
                name="billingFirstName"
                label="First Name"
              />
              <FormInput
                key="billingLastName"
                control={form.control}
                name="billingLastName"
                label="Last Name"
              />
              <FormInput
                key="billingMobile"
                control={form.control}
                name="billingMobile"
                label="Mobile No."
              />
              <FormInput
                key="billingAlternateMobile"
                control={form.control}
                name="billingAlternateMobile"
                label="Alternate Mobile No."
              />
              <FormInput
                key="billingEmail"
                control={form.control}
                name="billingEmail"
                label="Email Id"
                className="col-span-2"
              />
            </div>
            <div className="mt-6">
              <ComboBoxFormField
                name="billingCountry"
                label="Billing Country"
                options={countries.map((country) => ({
                  value: country.code,
                  label: country.name,
                }))}
                placeholder="Select Country"
                searchPlaceholder="Search country..."
                emptyMessage="No country found."
                loading={countriesLoading}
                onOptionSelected={setSelectedBillingCountry}
                required={true}
              />
            </div>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <FormInput
                key="billingAddress1"
                control={form.control}
                name="billingAddress1"
                label="Address 1"
              />
              <FormInput
                key="billingLandmark"
                control={form.control}
                name="billingLandmark"
                label="Landmark"
              />
            </div>
            <div className="space-y-2 mt-6">
              <FormInput
                key="billingAddress2"
                control={form.control}
                name="billingAddress2"
                label="Address 2"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <FormInput
                key="billingPincode"
                control={form.control}
                name="billingPincode"
                label="Pincode"
              />
              <FormInput
                key="billingCity"
                control={form.control}
                name="billingCity"
                label="City"
              />
              <ComboBoxFormField
                name="billingState"
                label="Billing State"
                options={billingStates.map((state) => ({
                  value: state.name,
                  label: state.name,
                }))}
                placeholder="Select a state"
                searchPlaceholder="Search state..."
                emptyMessage="No state found."
                loading={billingStatesLoading}
                required={true}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="mt-10 bg-blue-400 hover:bg-blue-500"
              size="lg">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </DashboardPage>
  );
}
