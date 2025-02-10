import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSelector } from "react-redux";
import type { RootState } from "@/components/orders/store/Store";

export default function PlaceOrder() {
  const formData = useSelector((state: RootState) => state.order);

  const {
    pickupAddress,
    shippingAddress1,
    shippingAddress2,
    shippingLandmark,
    shippingCity,
    shippingState,
    shippingCountry,
    shippingMobile,
    shippingFirstName,
    shippingLastName,
    shippingOption,
  } = formData;

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Order Details</h1>

      <div className="sm:flex sm:space-y-0 space-y-4 gap-8 justify-between">
        <div className="w-3/5 space-y-2">
          <h2 className="text-lg text-muted-foreground">Pickup Address:</h2>
          <div className="space-y-1">
            <p className="font-semibold">{pickupAddress}</p>
          </div>
        </div>

        <div className="sm:w-2/5 w-full space-y-2">
          <h2 className="text-lg text-muted-foreground">Delivery Address:</h2>
          <div className="space-y-1">
            <p className="font-semibold">{`${shippingFirstName} ${shippingLastName}`}</p>
            <p>{shippingAddress1}</p>
            <p>
              {shippingAddress2},{shippingLandmark}
            </p>
            <p>{shippingCity}</p>
            <p>{shippingState}</p>
            <p>{shippingCountry}</p>
            <p>{shippingMobile}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <h2 className="text-lg text-muted-foreground">Shipping Partner:</h2>
          <p className="font-semibold">{shippingOption?.name || "N/A"}</p>
          <p className="text-sm text-muted-foreground">
            Transit Time: {shippingOption?.transitTime || "N/A"}
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg text-muted-foreground">Shipment Mode</h2>
          <p className="font-semibold">{formData.shipmentType}</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg text-muted-foreground">Billed Weight:</h2>
          <p className="font-semibold">{formData.breadth} KG</p>
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Logistic Fee</span>
            <span className="font-semibold">Rs. {shippingOption?.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">GST</span>
            <span className="font-semibold">Rs. 2,765.16</span>
          </div>
          <div className="flex justify-between border-t pt-4">
            <span className="text-muted-foreground">Total</span>
            <span className="font-semibold">
              Rs. {(shippingOption?.price ?? 0) + 2765.16}
            </span>
          </div>
        </div>
      </Card>

      <div className="flex justify-between items-center pt-4">
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8">
          Pay & Add Order
        </Button>
      </div>
    </div>
  );
}
