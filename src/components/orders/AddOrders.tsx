import { useState } from "react";
import DashboardPage from "@/layouts/DashboardPage";
import BuyerDetail from "./BuyerDetail";
import OrderDetail from "./OrderDetail";
import ShippingPartner from "./ShippingPartner";
import PlaceOrder from "./PlaceOrder";

export default function AddOrders() {
  const [step, setStep] = useState(1);

  return (
    <DashboardPage>
      <div className="xl:flex xl:space-x-10 block space-x-0">
        <div className="xl:w-1/4 w-full p-6 bg-white flex justify-center items-center rounded-lg">
          <div>
            {[
              { number: 1, title: "Buyer Details" },
              { number: 2, title: "Order Details" },
              { number: 3, title: "Shipping Partner" },
              { number: 4, title: "Place Order" },
            ].map((item, index, array) => (
              <div key={item.number} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm border border-gray-300
                    ${
                      step === item.number
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                    {item.number}
                  </div>

                  {index !== array.length - 1 && (
                    <div className="h-8 border-l-2 border-dashed border-gray-300 "></div>
                  )}
                </div>
                <div
                  className={`mt-1 text-base font-medium ${
                    step === item.number ? "text-blue-500" : "text-gray-600"
                  }`}>
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:w-3/4 w-full p-8 bg-white rounded-lg">
          {step === 1 && <BuyerDetail step={step} setStep={setStep} />}
          {step == 2 && <OrderDetail step={step} setStep={setStep} />}
          {step == 3 && <ShippingPartner step={step} setStep={setStep} />}
          {step == 4 && <PlaceOrder step={step} setStep={setStep} />}
        </div>
      </div>
    </DashboardPage>
  );
}
