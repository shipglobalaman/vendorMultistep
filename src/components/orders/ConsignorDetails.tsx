import { ComboBoxFormField } from "@/components/elements/ComboBoxFormField";
import { Button } from "../ui/button";
import type * as z from "zod";
import { consignorSchema } from "@/zod validation/Schema";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/components/orders/store/Store";
import {
  setFormData,
  setStep,
  setActiveSection,
  setActiveStep,
} from "@/components/orders/store/OrderSlice";

const addresses = [
  {
    value:
      "Head OFFICE, mahipalpur, Indira Park, South West Delhi, Delhi-110045-8392328932",
    label:
      "Head OFFICE, mahipalpur, Indira Park, South West Delhi, Delhi-110045-8392328932",
  },
];

const ConsignorDetails = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.order);

  const form = useForm<z.infer<typeof consignorSchema>>({
    resolver: zodResolver(consignorSchema),
    defaultValues: useSelector((state: RootState) => state.order),
  });
  const pickupAddress = form.watch("pickupAddress");
  function onSubmit(values: z.infer<typeof consignorSchema>) {
    dispatch(setActiveSection("consignee"));
    dispatch(setActiveStep(2));
    dispatch(setFormData(values));
    dispatch(setStep(formData.step + 1));
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="px-2 space-y-5">
          <div className="flex items-center gap-1">
            <h2 className="text-xl font-semibold">Select Pickup Address</h2>
            <span className="text-red-500">*</span>
          </div>
          <div className="w-4/5">
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
          <div className="sm:flex justify-between items-center">
            <div className="p-4 sm:w-5/6">
              {pickupAddress && (
                <div>
                  <p className="text-sm font-semibold text-gray-400">
                    Pickup Address
                  </p>
                  {pickupAddress}
                </div>
              )}
            </div>
            <div className="flex items-end justify-end">
              <Button
                type="submit"
                className="mt-10 bg-blue-900 hover:bg-blue-800"
                size="lg">
                Continue
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ConsignorDetails;
