import { useEffect, useState } from "react";
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
  provider_code: string;
  display_name: string;
  helper_text?: string;
  image: string;
  transit_time: string;
  rate: number;
  bill_weight_kg: number;
  remote_charges: number;
  handling_charges: number;
  provider_status: boolean;
  LOGISTIC_FEE: number;
  REMOTE_FEE: number;
  HANDLING_FEE: number;
  hasDuties?: boolean;
  isRecommended?: boolean;
}

const API_URL =
  "https://api.fr.stg.shipglobal.in/api/v1/orders/get-shipper-rates";
const API_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnRpdHlJZCI6MzAwNjcsImNyZWF0ZWRfYXQiOnsiZGF0ZSI6IjIwMjUtMDItMDggMTY6NTM6MzQuOTI4NjA0IiwidGltZXpvbmVfdHlwZSI6MywidGltZXpvbmUiOiJBc2lhL0tvbGthdGEifSwiZXhwaXJlc19hdCI6eyJkYXRlIjoiMjAyNS0wMy0xMCAxNjo1MzozNC45Mjg2MDciLCJ0aW1lem9uZV90eXBlIjozLCJ0aW1lem9uZSI6IkFzaWEvS29sa2F0YSJ9LCJpZCI6IjM1MWM1NDBhLWY4YTEtNDhjMy1hNWIyLTk5MmM2MDg1OGY4NSIsInJlbW90ZV9lbnRpdHlfaWQiOjB9.hFbb_XIYMSl_APZF0SdTwYkrnMJDOphtkerCyk2LF5s";

export default function ShippingPartner() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.order);
  const {
    actualWeight,
    length,
    breadth,
    height,
    shippingCountry,
    shippingPincode,
  } = formData;
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);

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

  useEffect(() => {
    async function fetchShippingOptions() {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
          body: JSON.stringify({
            customer_shipping_postcode: shippingPincode,
            customer_shipping_country_code: shippingCountry,
            package_weight: billedWeight,
            package_length: length,
            package_breadth: breadth,
            package_height: height,
          }),
        });

        const data = await response.json();
        setShippingOptions(data.data.rate || []);
      } catch (error) {
        console.error("Error fetching shipping options:", error);
      }
    }

    fetchShippingOptions();
  });

  const form = useForm({
    defaultValues: {
      shippingOption: useSelector(
        (state: RootState) => state.order.shippingOption?.provider_code || ""
      ),
    },
  });

  useEffect(() => {
    if (formData.shippingOption) {
      form.setValue("shippingOption", formData.shippingOption.provider_code);
    }
  }, [form, formData]);
  useEffect(() => {
    if (formData.shippingOption) {
      form.setValue("shippingOption", formData.shippingOption.provider_code);
    }
  }, [form, formData]);

  const handleSelect = (provider_code: string) => {
    form.setValue("shippingOption", provider_code);
    const selectedOption = shippingOptions.find(
      (option) => option.provider_code === provider_code
    );
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

      <table className="mt-3 w-full border-separate border-spacing-y-4">
        <thead className="border">
          <tr>
            <th className="bg-gray-100 p-3 border border-r-0 border-gray-200 first:rounded-l-lg text-left font-normal">
              Courier Partner
            </th>
            <th className="bg-gray-100 p-3 border border-x-0 border-gray-200 text-left font-normal">
              Delivery Time
            </th>
            <th className="bg-gray-100 p-3 border border-x-0 border-gray-200 text-left font-normal">
              Shipment Rate
            </th>
            <th className="bg-gray-100 p-3 border border-l-0 border-gray-200 first:rounded-l-lg last:rounded-r-lg text-left font-normal">
              Select
            </th>
          </tr>
        </thead>
        <tbody className="relative">
          <Form {...form}>
            {shippingOptions.map((option) => (
              <>
                <td className="bg-blue-50 absolute w-full z-10 text-start text-xs px-4 py-1 text-red-500 rounded-tr-md rounded-tl-md border-t border-x">
                  <p>Duties will be charged, if applicable.</p>
                </td>
                <ShippingOptionCard
                  key={option.provider_code}
                  option={option}
                  isSelected={
                    form.watch("shippingOption") === option.provider_code
                  }
                  onSelect={handleSelect}
                />
              </>
            ))}
          </Form>
        </tbody>
      </table>

      <div className="flex justify-end">
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 mt-6">
          Pay & Add Order
        </Button>
      </div>
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
      key={option.provider_code}
      onClick={() => onSelect(option.provider_code)}
      className={clsx(
        "border bg-gray-50 rounded-md cursor-pointer relative overflow-hidden"
      )}>
      <td className="bg-white p-5 border border-r-0 border-gray-200 rounded-l-lg font-semibold overflow-hidden">
        {option.display_name}
      </td>
      <td className="bg-white p-5 border border-x-0 border-gray-200">
        {option.transit_time}
      </td>
      <td className="bg-white p-5 border border-x-0 border-gray-200">
        Rs. {option.rate}
      </td>
      <td className="bg-white p-5 border border-l-0 border-gray-200 rounded-r-lg">
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
