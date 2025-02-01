import { useState } from "react";
import { cn } from "@/lib/utils";
import DashboardPage from "@/layouts/DashboardPage";
import BuyerDetail from "./BuyerDetail";

export default function AddOrders() {
  const [step, setStep] = useState(1);

  return (
    <DashboardPage>
      <div className="lg:flex lg:space-x-10 block space-x-0">
        <div className="lg:w-1/4 w-full p-6 bg-white flex justify-center items-center rounded-lg">
          <div className="space-y-6">
            {[
              { number: 1, title: "Buyer Details" },
              { number: 2, title: "Order Details" },
              { number: 3, title: "Shipping Partner" },
              { number: 4, title: "Place Order" },
            ].map((item) => (
              <div key={item.number} className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg text-sm",
                    step === item.number
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  )}>
                  {item.number}
                </div>
                <div
                  className={cn(
                    "mt-1 text-base font-medium",
                    step === item.number ? "text-blue-500" : "text-gray-600"
                  )}>
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-3/4 w-full p-8 bg-white rounded-lg">
          {step === 1 && <BuyerDetail step={step} setStep={setStep} />}
        </div>
      </div>
    </DashboardPage>
  );
}
