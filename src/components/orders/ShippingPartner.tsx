import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

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
}: {
  option: ShippingOption;
  isSelected: boolean;
}) {
  return (
    <Card
      className={`p-4 border border-dashed${
        isSelected ? "border-blue-500" : "border-gray-300"
      }`}>
      <FormLabel className="flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-4">
          <FormControl>
            <RadioGroupItem
              value={option.id}
              className="w-5 h-5"
              checked={isSelected}
            />
          </FormControl>
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
        <div className="text-xl font-bold">Rs. {option.price}</div>
      </FormLabel>
    </Card>
  );
}

interface ShippingPartnerProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function ShippingPartner({
  step,
  setStep,
}: ShippingPartnerProps) {
  const [selectedShippingOption, setSelectedShippingOption] =
    useState<string>("");
  const form = useForm({
    defaultValues: {
      shippingOption: selectedShippingOption || shippingOptions[0].id,
    },
  });

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const formData = JSON.parse(storedData);
      if (formData.shippingOption) {
        setSelectedShippingOption(formData.shippingOption);
        form.setValue("shippingOption", formData.shippingOption.id);
      }
    }
  }, [form]);

  const onSubmit = (data: { shippingOption: string }) => {
    const existingData = localStorage.getItem("formData");
    let formData = existingData ? JSON.parse(existingData) : {};
    setStep(step + 1);
    const selectedShippingOption = shippingOptions.find(
      (option) => option.id === data.shippingOption
    );
    if (selectedShippingOption) {
      formData = {
        ...formData,
        shippingOption: selectedShippingOption,
      };

      localStorage.setItem("formData", JSON.stringify(formData));
    } else {
      console.log("No shipping partner selected");
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
        If you need more info, please call/whatsapp at{" "}
        <a href="tel:011-422-77-777" className="text-blue-500">
          011-422 77 777
        </a>
        .
      </p>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="p-2 text-center border border-dashed w-40">
            <div className="font-bold">11.00 KG</div>
            <div className="text-gray-500 text-xs">Dead Weight</div>
          </Card>
          <Card className="p-2 text-center border border-dashed w-40">
            <div className=" font-bold">1.60 KG</div>
            <div className="text-gray-500 text-xs">Volumetric Weight</div>
          </Card>
          <Card className="p-2 text-center border border-dashed w-40">
            <div className="font-bold">11.00 KG</div>
            <div className="text-gray-500 text-xs">Billed Weight</div>
          </Card>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="shippingOption"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedShippingOption(value);
                    }}
                    className="space-y-4">
                    {shippingOptions.map((option) => (
                      <ShippingOptionCard
                        key={option.id}
                        option={option}
                        isSelected={field.value === option.id}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center pt-4">
            <Button
              type="button"
              onClick={() => {
                setStep(step - 1);
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
