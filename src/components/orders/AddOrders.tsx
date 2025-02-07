import DashboardPage from "@/layouts/DashboardPage";
import BuyerDetail from "./BuyerDetail";
import OrderDetail from "./OrderDetail";
import ShippingPartner from "./ShippingPartner";
import PlaceOrder from "./PlaceOrder";
import Stepper from "./Stepper";
import { useSelector } from "react-redux";
import type { RootState } from "@/components/orders/store/Store";

export default function AddOrders() {
  const { step } = useSelector((state: RootState) => state.order);

  return (
    <DashboardPage>
      <div className="xl:flex xl:space-x-10 block space-x-0 space-y-4 xl:space-y-0">
        <div className="xl:w-1/4 w-full p-6 bg-white flex justify-center items-center rounded-lg">
          <Stepper step={step} />
        </div>

        <div className="xl:w-3/4 w-full sm:p-8 px-0 py-4 bg-white rounded-lg">
          {step === 1 && <BuyerDetail />}
          {step === 2 && <OrderDetail />}
          {step === 3 && <ShippingPartner />}
          {step === 4 && <PlaceOrder />}
        </div>
      </div>
    </DashboardPage>
  );
}
