import { useState } from "react";
import DashboardPage from "@/layouts/DashboardPage";
import BuyerDetail from "./BuyerDetail";
import OrderDetail from "./OrderDetail";
import ShippingPartner from "./ShippingPartner";
import PlaceOrder from "./PlaceOrder";
import Stepper from "./Stepper";

export default function AddOrders() {
  const [step, setStep] = useState(1);

  return (
    <DashboardPage>
      <div className="xl:flex xl:space-x-10 block space-x-0">
        <div className="xl:w-1/4 w-full p-6 bg-white flex justify-center items-center rounded-lg">
          <Stepper step={step} />
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
