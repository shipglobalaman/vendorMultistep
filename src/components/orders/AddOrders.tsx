import DashboardPage from "@/layouts/DashboardPage";
import { Accordion } from "@/components/ui/accordion";
import BuyerDetail from "./ConsigneeDetails";
import OrderDetail from "./ShipmentInformation";
import ShippingPartner from "./ShippingPartner";
import ConsignorDetails from "./ConsignorDetails";
import ShowDetail from "./ShowDetail";
import { SectionItem } from "./SectionItem";
import { useSelector } from "react-redux";
import type { RootState } from "@/components/store/Store";
import BreadCrumb from "./BreadCrumb";

export type Section = {
  value: string;
  label: string;
  component: React.ElementType;
};

const sections: Section[] = [
  {
    value: "consignor",
    label: "Consignor Details",
    component: ConsignorDetails,
  },
  { value: "consignee", label: "Consignee Details", component: BuyerDetail },
  { value: "shipment", label: "Shipment Information", component: OrderDetail },
  {
    value: "shipping",
    label: "Select Shipping Partner",
    component: ShippingPartner,
  },
];

export default function AddOrders() {
  const formData = useSelector((state: RootState) => state.order);
  const { activeSection } = formData;
  return (
    <DashboardPage>
      <p className="text-2xl my-2">Create CSB-IV Order</p>
      <BreadCrumb />
      <div className="flex space-x-2 mt-5">
        <div className="w-full lg:w-4/6 rounded-lg">
          <Accordion
            type="single"
            value={activeSection}
            className="w-full space-y-2">
            {sections.map((section, index) => (
              <SectionItem
                key={section.value}
                section={section}
                index={index + 1}
                component={section.component}
              />
            ))}
          </Accordion>
        </div>
        <div className="w-2/6 max-h-max hidden lg:block">
          <ShowDetail />
        </div>
      </div>
    </DashboardPage>
  );
}
