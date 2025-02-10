import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/components/orders/store/Store";
import {
  setFormData,
  setActiveStep,
} from "@/components/orders/store/OrderSlice";
import { CircleCheck } from "lucide-react";
import clsx from "clsx";

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

export default function ShippingPartner() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.order);
  const { actualWeight, length, breadth, height } = formData;

  const volumetricWeight = (
    (Number(length) * Number(breadth) * Number(height)) /
    5000
  ).toFixed(2);
  const billedWeight = Math.max(Number(actualWeight), Number(volumetricWeight));

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

  const handleSelect = (id: string) => {
    form.setValue("shippingOption", id);
    const selectedOption = shippingOptions.find((option) => option.id === id);
    if (selectedOption)
      dispatch(setFormData({ shippingOption: selectedOption }));
    dispatch(setActiveStep(5));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Select Shipping Partner</h1>
      <p className="text-gray-500 mb-4 text-sm">
        All shipments via ShipGlobal Direct service are Delivered Duty Paid
        (DDP)...
      </p>
      <p className="text-gray-500 mb-8 text-sm">
        If you need more info, call/WhatsApp at
        <a href="tel:011-422-77-777" className="text-blue-500">
          {" "}
          011-422 77 777
        </a>
        .
      </p>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {weightData.map((item, index) => (
            <div
              key={index}
              className={clsx(
                "p-2 text-center border w-30 rounded-lg",
                item.label === "Billed Weight"
                  ? "bg-orange-100 text-orange-400 border-orange-400"
                  : "bg-gray-50 text-gray-500"
              )}>
              <div className="font-bold">{item.value}kg</div>
              <div className="text-xs">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
      <table className="mt-3 w-full">
        <thead>
          <tr className="grid grid-cols-1 sm:grid-cols-4 font-normal py-2 border rounded-md mb-4 text-slate-500 bg-slate-50 text-center">
            <th>Courier Partner</th>
            <th>Delivery Time</th>
            <th>Shipment Rate</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          <Form {...form}>
            <div className="space-y-2">
              {shippingOptions.map((option) => (
                <ShippingOptionCard
                  key={option.id}
                  option={option}
                  isSelected={form.watch("shippingOption") === option.id}
                  onSelect={handleSelect}
                />
              ))}
            </div>
            <div className="flex justify-end">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 mt-6">
                Pay & Add Order
              </Button>
            </div>
          </Form>
        </tbody>
      </table>
    </div>
  );
}

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
    <tr
      key={option.id}
      onClick={() => onSelect(option.id)}
      className={clsx(
        "grid grid-cols-1 sm:grid-cols-4 py-4 border rounded-md mb-2 cursor-pointer text-center relative overflow-hidden border-gray-300",
        { "pt-8": option.name !== "ShipGlobal Direct" }
      )}>
      {option.hasDuties && (
        <div className="bg-blue-50 absolute w-full text-start text-xs px-4 py-1 text-red-500">
          Duties will be charged, if applicable.
        </div>
      )}
      <td className="font-semibold text-sm">{option.name}</td>
      <td className="text-gray-500">{option.transitTime}</td>
      <td className="text-gray-500">Rs. {option.price}</td>
      <td>
        <CircleCheck
          className={clsx(
            "w-5 h-5 mx-auto",
            isSelected
              ? "fill-green-500 text-white"
              : "fill-gray-300 text-white"
          )}
        />
      </td>
    </tr>
  );
}
