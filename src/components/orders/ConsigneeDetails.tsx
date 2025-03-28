import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/zod validation/Schema";
import type * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/elements/FormInput";
import { ComboBoxFormField } from "@/components/elements/ComboBoxFormField";
import { useCountries, useStates } from "@/components/orders/CountryApi";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/components/store/Store";
import {
  setFormData,
  setStep,
  setActiveSection,
  setActiveStep,
} from "@/components/store/OrderSlice";

export default function BuyerDetail() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.order);
  const { sameAsBilling } = formData;
  const [selectedShippingCountry, setSelectedShippingCountry] = useState({
    value: "",
    label: "",
  });
  const [selectedBillingCountry, setSelectedBillingCountry] = useState({
    value: "",
    label: "",
  });
  const { countries, loading: countriesLoading } = useCountries();
  const { states: shippingStates } = useStates(selectedShippingCountry.value);
  const { states: billingStates } = useStates(selectedBillingCountry.value);
  const [checked, setChecked] = useState(sameAsBilling);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: useSelector((state: RootState) => state.order),
  });

  useEffect(() => {
    if (formData.shippingCountry) {
      setSelectedShippingCountry(formData.shippingCountry);
    }
    if (formData.billingCountry) {
      setSelectedBillingCountry(formData.billingCountry);
    }
  }, [formData]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(setActiveSection("shipment"));
    dispatch(setActiveStep(3));
    dispatch(setFormData(values));
    dispatch(setStep(formData.step + 1));
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

      setSelectedBillingCountry({
        value: form.getValues("shippingCountry")?.value || "",
        label: form.getValues("shippingCountry")?.label || "",
      });
    }
  }, [checked, form, shippingAddress]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-w-3xl">
          <h2 className="text-base font-semibold mb-6">Personal Details</h2>
          <div className="lg:grid grid-cols-3 gap-6 space-y-5 lg:space-y-0">
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
              label="Mobile Number"
              required={true}
            />
            <FormInput
              key="shippingEmail"
              control={form.control}
              name="shippingEmail"
              label="Email Id"
              required={true}
            />
          </div>
          <h2 className="text-base font-semibold my-6">Shipping Address</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <FormInput
              key="shippingAddress1"
              control={form.control}
              name="shippingAddress1"
              label="Address 1"
              required={true}
            />
            <FormInput
              key="shippingAddress2"
              control={form.control}
              name="shippingAddress2"
              label="Address 2"
              required={true}
            />
            <FormInput
              key="shippingLandmark"
              control={form.control}
              name="shippingLandmark"
              label="Landmark"
            />
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
              onOptionSelected={(selected) => {
                const country = countries.find((c) => c.code === selected);
                if (country) {
                  setSelectedShippingCountry({
                    value: country.code,
                    label: country.name,
                  });
                  form.setValue("shippingCountry", {
                    value: country.code,
                    label: country.name,
                  });
                  form.setValue("shippingState", "");
                }
              }}
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
              required={true}
            />
            <FormInput
              key="shippingCity"
              control={form.control}
              name="shippingCity"
              label="City"
              required={true}
            />
            <FormInput
              key="shippingPincode"
              control={form.control}
              name="shippingPincode"
              label="Pincode"
              required={true}
            />
          </div>
        </div>
        <div className="mt-10">
          <FormInput
            control={form.control}
            name="sameAsBilling"
            label="Billing address is same as shipping address"
            type="checkbox"
            checked={checked}
            onCheckedChange={setChecked}
          />
        </div>
        <div className={`${checked ? "hidden" : "mt-10"}`}>
          <h2 className="text-base font-semibold mb-6">Billing Address</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
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

            <FormInput
              key="billingAddress2"
              control={form.control}
              name="billingAddress2"
              label="Address 2"
            />

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
              onOptionSelected={(selected) => {
                const country = countries.find((c) => c.code === selected);
                if (country) {
                  setSelectedBillingCountry({
                    value: country.code,
                    label: country.name,
                  });
                  form.setValue("billingCountry", {
                    value: country.code,
                    label: country.name,
                  });
                  form.setValue("billingState", "");
                }
              }}
              required={true}
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
              required={true}
            />
            <FormInput
              key="billingCity"
              control={form.control}
              name="billingCity"
              label="City"
            />
            <FormInput
              key="billingPincode"
              control={form.control}
              name="billingPincode"
              label="Pincode"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="mt-10 bg-blue-900 hover:bg-blue-800"
            size="lg">
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
}
