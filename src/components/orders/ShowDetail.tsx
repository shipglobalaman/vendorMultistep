import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useSelector } from "react-redux";
import type { RootState } from "@/components/store/Store";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import boxPng from "/boxPng.png";
import type { z } from "zod";
import {
  formSchema,
  orderFormSchema,
  itemSchema,
} from "@/zod validation/Schema";

const ShowDetail = () => {
  const formData = useSelector((state: RootState) => state.order);

  return (
    <div>
      <div className="px-6 pb-4 bg-white justify-center items-center rounded-lg">
        {formData.activeStep <= 1 && <QuickTips />}
        <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
          {formData.activeStep > 1 && (
            <ConsignorDetails
              pickupAddress={formData.pickupAddress}
              activeStep={formData.activeStep}
            />
          )}
          {formData.activeStep > 2 && <ConsigneeDetails {...formData} />}
        </Accordion>
        {formData.activeStep > 3 && <ItemDetails {...formData} />}
      </div>
      {formData.shippingOption && formData.activeStep > 4 && (
        <Summary shippingOption={formData.shippingOption} />
      )}
    </div>
  );
};

export default ShowDetail;

const ConsignorDetails = ({
  pickupAddress,
  activeStep,
}: {
  pickupAddress: string;
  activeStep: number;
}) => (
  <AccordionItem
    value="item-1"
    className={`${activeStep > 2 ? "" : "border-0"}`}>
    <AccordionTrigger className="font-bold text-base">
      Consignor Details <ChevronDown className="text-gray-300" />
    </AccordionTrigger>
    <AccordionContent>
      <div className="space-y-2">
        <p className="text-gray-400">Name</p>
        <p className="text-base font-medium">Aman Tripathi | 9651837693</p>
        <p>aman.tripathi@shipglobal.in</p>

        <p className="text-gray-400">Address</p>
        <p>{pickupAddress}</p>
      </div>
    </AccordionContent>
  </AccordionItem>
);

const ConsigneeDetails = ({
  shippingFirstName,
  shippingLastName,
  shippingMobile,
  sameAsBilling,
  billingAddress1,
  billingAddress2,
  billingLandmark,
  billingPincode,
  billingCountry,
  billingState,
  billingCity,
  shippingAddress1,
  shippingAddress2,
  shippingLandmark,
  shippingPincode,
  shippingCountry,
  shippingState,
  shippingCity,
  activeStep,
}: z.infer<typeof formSchema>) => (
  <AccordionItem
    value="item-2"
    className={`${activeStep > 3 ? "" : "border-0"}`}>
    <AccordionTrigger className="font-bold text-base">
      Consignee Details <ChevronDown className="text-gray-300" />
    </AccordionTrigger>
    <AccordionContent>
      <div className="space-y-2">
        <p className="text-gray-400">Name</p>
        <p className="font-semibold">
          {shippingFirstName} {shippingLastName} | {shippingMobile}
        </p>

        <p className="text-gray-400">Billing Address</p>
        <div>
          {sameAsBilling ? (
            <p>Same as shipping address</p>
          ) : (
            <p>
              {billingAddress1}, {billingAddress2}, {billingLandmark},
              {billingPincode}, {billingCountry.label}, {billingState},
              {billingCity}
            </p>
          )}
        </div>

        <p className="text-gray-400">Shipping Address</p>
        <p>
          {shippingAddress1}, {shippingAddress2}, {shippingLandmark},
          {shippingPincode}, {shippingCountry.label}, {shippingState},
          {shippingCity}
        </p>
      </div>
    </AccordionContent>
  </AccordionItem>
);

const ItemDetails = ({
  length,
  breadth,
  height,
  actualWeight,
  items,
  invoiceCurrency,
}: z.infer<typeof orderFormSchema>) => {
  const [showAll, setShowAll] = useState(false);
  const volumetricWeight = (
    (Number(length) * Number(breadth) * Number(height)) /
    5000
  ).toFixed(2);
  const billedWeight =
    Number(actualWeight) > Number(volumetricWeight)
      ? actualWeight
      : volumetricWeight;

  const visibleItems = showAll ? items : [items[0]];
  const toggleShowAll = () => setShowAll(!showAll);

  return (
    <div>
      <div className="font-bold text-base mt-8 mb-3">Item Details</div>
      <div className="text-sm">
        <div className="space-y-4">
          <div className="grid grid-cols-2">
            <div>
              <p className="text-gray-400">Billed Weight</p>
              <p className="font-semibold">{billedWeight}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-400">Dimensions</p>
              <p className="font-semibold">
                {length} cm x {breadth} cm x {height} cm
              </p>
            </div>
          </div>
          {visibleItems.map(
            (item: z.infer<typeof itemSchema>, index: number) => (
              <div key={index} className="grid grid-cols-3 gap-1 pb-2">
                <div className="space-y-1">
                  <p className="text-gray-400">Product</p>
                  <p className="font-semibold">{item.productName || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400">HSN</p>
                  <p className="font-semibold">{item.hsn || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400">SKU</p>
                  <p className="font-semibold">{item.sku || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400">QTY</p>
                  <p className="font-semibold">{Number(item.qty) || "0"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400">Unit Price</p>
                  <p className="font-semibold">
                    {invoiceCurrency} {Number(item.unitPrice) || "0"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400">Total</p>
                  <p className="font-semibold">
                    {invoiceCurrency}
                    {Number(item.qty) * Number(item.unitPrice) || "0"}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
        {items.length > 1 && (
          <div className="flex justify-between items-center mt-4">
            {!showAll && (
              <p className="text-orange-400 text-xs font-semibold">
                +{items.length - 1} more products...
              </p>
            )}
            <button
              onClick={toggleShowAll}
              className="mt-2 text-xs font-medium text-blue-800">
              {showAll ? "Hide" : "View"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Summary = ({ shippingOption }: { shippingOption: { rate: number } }) => (
  <div className="rounded-lg p-3 px-0 pb-3 mt-3 border border-yellow-750 bg-orange-50">
    <div className="px-5 py-1.5 text-base font-semibold border-b border-orange-100 text-orange-500">
      Summary
    </div>
    <div>
      <div className="flex justify-between px-5 mt-4 space-x-10 text-sm font-normal text-black">
        <div className="grid gap-y-4">
          <p>Logistic Fee</p>
          <p>GST</p>
        </div>
        <div className="grid text-right text-black gap-y-4">
          <p>Rs.{shippingOption?.rate}</p>
          <p>Rs.2765.16</p>
        </div>
      </div>
      <div className="flex justify-between px-5 py-3 mt-5 text-sm font-semibold bg-orange-100">
        <p>Total</p>
        <p>Rs. {(shippingOption?.rate ?? 0) + 2765.16}</p>
      </div>
    </div>
  </div>
);

const QuickTips = () => {
  return (
    <div className="flex flex-col py-4">
      <p className="font-semibold text-lg mx-auto">Quick Tips</p>
      <img src={boxPng} className="h-44 w-50 mx-auto" />
      <p className="font-semibold text-sm mt-3">Dead Weight:</p>
      <div className="text-xs mt-3">
        <p>
          Dead/Dry weight or volumetric weight whichever is higher will be taken
          while calculating the freight rates.
        </p>
        <p className="mt-3">
          Fixed COD charge or COD % of the order value whichever is higher will
          be taken while calculating the COD fee.
        </p>
        <p className="mt-3">Above prices are exclusive of GST.</p>
        <p className="mt-3">
          The above pricing is subject to change based on fuel surcharges and
          courier company base rates.
        </p>
      </div>
      <p className="font-semibold text-sm mt-5">
        Volumetric Weight: (L X W X H / 5000)
      </p>
      <p className="mt-3 text-xs">
        Volumetric Weight (or DIM weight) is calculated based on the dimensions
        of the package.
      </p>
      <p className="mt-3 text-xs">
        The formula for calculating volumetric weight involves multiplying the
        length, width, and height of the package and then dividing by 5000.
      </p>
    </div>
  );
};
