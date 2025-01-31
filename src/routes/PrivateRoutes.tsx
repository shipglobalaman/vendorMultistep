import AddOrders from "@/components/orders/AddOrders";
import PrivateLayout from "../layouts/PrivateLayout";

export default function PrivateRoutes() {
  return {
    path: "/",
    element: <PrivateLayout />,
    children: [
      { path: "add-order", element: <AddOrders /> }, //? Welcome Screen
    ],
  }
}
