import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/components/orders/store/Store";
import { setFormData, setStep } from "@/components/orders/store/OrderSlice";

interface ShippingOption {
  id: string;
  name: string;
  price: number;
  transitTime: string;
  hasDuties?: boolean;
  isRecommended?: boolean;
}

const shippingOptions: ShippingOption[] = [
  {
    id: "shipglobal",
    name: "ShipGlobal Direct",
    price: 7722,
    transitTime: "7 - 10 Days",
    isRecommended: true,
  },
  {
    id: "ups-promotional",
    name: "UPS Promotional",
    price: 15362,
    transitTime: "4 - 7 Days",
    hasDuties: true,
  },
  {
    id: "dhl",
    name: "DHL Express",
    price: 15966,
    transitTime: "4 - 7 Days",
    hasDuties: true,
  },
  {
    id: "ups",
    name: "UPS",
    price: 19176,
    transitTime: "4 - 7 Days",
    hasDuties: true,
  },
];

function ShippingOptionCard({
  option,
  isSelected,
  onSelect,
}: {
  option: ShippingOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <Card
      onClick={() => onSelect(option.id)}
      className={`p-4 text-sm border border-dashed cursor-pointer ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <div className="flex items-center gap-3">
          <input
            type="radio"
            id={option.id}
            name="shippingOption"
            checked={isSelected}
            onChange={() => onSelect(option.id)}
            className="w-5 h-5 text-blue-500 border rounded-full"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{option.name}</span>
              {option.isRecommended && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700">
                  Cheapest
                </Badge>
              )}
            </div>
            {option.hasDuties && (
              <div className="text-red-500 text-sm">
                Duties will be charged, if applicable.
              </div>
            )}
            <div className="text-gray-500">
              Estimated Transit: {option.transitTime}
            </div>
          </div>
        </div>
        <div className="text-xl font-bold mt-2 sm:mt-0">Rs. {option.price}</div>
      </div>
    </Card>
  );
}

export default function ShippingPartner() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.order);
  const { actualWeight, length, breadth, height } = formData;

  const volumetricWeight =
    (Number(length) * Number(breadth) * Number(height)) / 5000;
  const billedWeight =
    Number(actualWeight) > volumetricWeight ? actualWeight : volumetricWeight;

  const weightData = [
    { value: actualWeight, label: "Dead Weight" },
    { value: volumetricWeight, label: "Volumetric Weight" },
    { value: billedWeight, label: "Billed Weight" },
  ];

  const form = useForm({
    defaultValues: {
      shippingOption: useSelector(
        (state: RootState) =>
          state.order.shippingOption?.id || shippingOptions[0].id
      ),
    },
  });

  useEffect(() => {
    if (formData.shippingOption) {
      form.setValue("shippingOption", formData.shippingOption.id);
    }
  }, [form, formData]);

  const onSubmit = (data: { shippingOption: string }) => {
    const selectedShippingOption = shippingOptions.find(
      (option) => option.id === data.shippingOption
    );
    if (selectedShippingOption) {
      dispatch(setFormData({ shippingOption: selectedShippingOption }));
      dispatch(setStep(formData.step + 1));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Select Shipping Partner</h1>
      <p className="text-gray-500 mb-4 text-sm">
        All shipments via ShipGlobal Direct service are Delivered Duty Paid
        (DDP), hence no extra duty will be billed on the consignee or the
        shipper. Rates are inclusive of covid & fuel surcharge, exclusive of GST
        and ex-Delhi Hub.
      </p>
      <p className="text-gray-500 mb-8 text-sm">
        If you need more info, please call/whatsapp at
        <a href="tel:011-422-77-777" className="text-blue-500">
          011-422 77 777
        </a>
        .
      </p>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {weightData.map((item, index) => (
            <Card
              key={index}
              className="p-2 text-center border border-dashed w-40">
              <div className="font-bold">{item.value}kg</div>
              <div className="text-gray-500 text-xs">{item.label}</div>
            </Card>
          ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {shippingOptions.map((option) => (
              <ShippingOptionCard
                key={option.id}
                option={option}
                isSelected={form.watch("shippingOption") === option.id}
                onSelect={(id) => form.setValue("shippingOption", id)}
              />
            ))}
          </div>
          <div className="flex justify-between items-center pt-4">
            <Button
              type="button"
              onClick={() => {
                dispatch(setStep(formData.step - 1));
              }}
              variant="ghost"
              className="text-blue-500 hover:text-blue-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
