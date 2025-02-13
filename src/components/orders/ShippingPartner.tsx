import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/components/orders/store/Store";
import {
  setFormData,
  setActiveStep,
} from "@/components/orders/store/OrderSlice";
import { CircleCheck } from "lucide-react";
import clsx from "clsx";
import { fetchAPI } from "./Api";

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
        const data = await fetchAPI("get-shipper-rates", "POST", {
          customer_shipping_postcode: shippingPincode,
          customer_shipping_country_code: shippingCountry.value,
          package_weight: billedWeight,
          package_length: length,
          package_breadth: breadth,
          package_height: height,
        });

        setShippingOptions(data.data.rate || []);
      } catch (error) {
        console.error("Error fetching shipping options:", error);
      }
    }

    if (shippingPincode && shippingCountry && billedWeight) {
      fetchShippingOptions();
    }
  }, [shippingPincode, shippingCountry, billedWeight, length, breadth, height]);

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
    <div className="max-w-3xl mx-auto ">
      <p>
        All shipments via ShipGlobal services are
        <b>Delivered Duty Paid (DDP)</b> , hence <b>no extra duty</b> will be
        billed on the consignee or the shipper. Rates are inclusive of covid &
        fuel surcharge, exclusive of GST and ex-Delhi Hub.
      </p>
      <br />
      <p>
        In case any doubt, please call/whatsapp at
        <span className="text-blue-800 font-semibold">011-422 77777</span>
      </p>
      <div className="flex justify-center mt-6">
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
              <div className="font-bold">{item.value} KG</div>
              <div className="text-xs">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {shippingOptions.length === 0 ? (
        <p className="text-center text-lg font-semibold">
          No Shipper Available
        </p>
      ) : (
        <Table className="mt-3 w-full border-separate border-spacing-y-4">
          <TableHeader>
            <TableRow className="border">
              <TableHead className="bg-gray-100 p-3 border border-r-0 border-gray-200 first:rounded-l-lg text-left font-normal">
                Courier Partner
              </TableHead>
              <TableHead className="bg-gray-100 p-3 border border-x-0 border-gray-200 text-left font-normal">
                Delivery Time
              </TableHead>
              <TableHead className="bg-gray-100 p-3 border border-x-0 border-gray-200 text-left font-normal">
                Shipment Rate
              </TableHead>
              <TableHead className="bg-gray-100 p-3 border border-l-0 border-gray-200 first:rounded-l-lg last:rounded-r-lg text-left font-normal">
                Select
              </TableHead>
            </TableRow>
          </TableHeader>

          <Form {...form}>
            {shippingOptions.map((option, index) => (
              <TableBody className="relative" key={index}>
                <TableRow>
                  <TableCell className="bg-blue-50 absolute w-full z-10 text-start text-xs px-4 py-1 text-red-500 rounded-tr-md rounded-tl-md border-t border-x">
                    <p>Duties will be charged, if applicable.</p>
                  </TableCell>
                </TableRow>

                <ShippingOptionCard
                  key={index}
                  option={option}
                  isSelected={
                    form.watch("shippingOption") === option.provider_code
                  }
                  onSelect={handleSelect}
                />
              </TableBody>
            ))}
          </Form>
        </Table>
      )}

      <div className="flex justify-end">
        <Button
          disabled={!formData.shippingOption}
          className="bg-blue-900 hover:bg-blue-800 text-white px-8 mt-6">
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
    <TableRow
      key={option.provider_code}
      onClick={() => onSelect(option.provider_code)}
      className={clsx(
        "border rounded-md cursor-pointer relative overflow-hidden"
      )}>
      <TableCell className="bg-white p-5 border border-r-0 border-gray-200 rounded-l-lg font-semibold overflow-hidden">
        {option.display_name}
      </TableCell>
      <TableCell className="bg-white p-5 border border-x-0 border-gray-200">
        {option.transit_time}
      </TableCell>
      <TableCell className="bg-white p-5 border border-x-0 border-gray-200">
        Rs. {option.rate}
      </TableCell>
      <TableCell className="bg-white p-5 border border-l-0 border-gray-200 rounded-r-lg">
        <CircleCheck
          className={clsx(
            "w-5 h-5 mx-auto",
            isSelected
              ? "fill-green-500 text-white"
              : "fill-gray-300 text-white"
          )}
        />
      </TableCell>
    </TableRow>
  );
}
