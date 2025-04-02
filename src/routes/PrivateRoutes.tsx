import AddOrders from "@/components/orders/AddOrders";
import PrivateLayout from "../layouts/PrivateLayout";
import BusinessKYCVerification from "@/components/kyc/BusinessKYCVerification";
import VerificationHistory from "@/components/kyc/VerificationHistory";

export default function PrivateRoutes() {
  return {
    path: "/",
    element: <PrivateLayout />,
    children: [
      { path: "add-order", element: <AddOrders /> }, //? Welcome Screen
      { path: "kyc", element: <BusinessKYCVerification /> }, //? Kyc Screen
      { path: "verification-history", element: <VerificationHistory /> },
    ],
  };
}
