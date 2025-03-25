import AddOrders from "@/components/orders/AddOrders";
import PrivateLayout from "../layouts/PrivateLayout";
import BusinessKYCVerification from "@/components/kyc/BusinessKYCVerification";

export default function PrivateRoutes() {
  return {
    path: "/",
    element: <PrivateLayout />,
    children: [
      { path: "add-order", element: <AddOrders /> }, //? Welcome Screen
      { path: "kyc", element: <BusinessKYCVerification /> }, //? Kyc Screen
    ],
  };
}
