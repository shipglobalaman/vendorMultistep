import { Section } from "@/components/orders/AddOrders";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/components/orders/store/Store";
import {
  setActiveSection,
  setActiveStep,
} from "@/components/orders/store/OrderSlice";

type SectionItemProps = {
  section: Section;
  index: number;
  component: React.ElementType;
};

export function SectionItem({ section, index, component }: SectionItemProps) {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.order);
  const { activeSection, activeStep } = formData;
  const isActive = activeSection === section.value;
  const Component = component;
  return (
    <AccordionItem value={section.value}>
      <AccordionTrigger
        className={`${
          isActive ? "bg-gray-100" : "bg-white"
        } p-4 flex border justify-between`}>
        <div className="flex gap-4">
          {activeStep > index ? (
            <span className="bg-green-500 text-white p-1 w-5 h-5 rounded-sm flex items-center justify-center">
              <Check size={16} />
            </span>
          ) : (
            <span className="bg-black text-white p-1 w-5 h-5 rounded-sm flex items-center justify-center">
              {index}
            </span>
          )}
          <span>{section.label}</span>
        </div>
        {activeStep > index && (
          <div
            onClick={() => {
              dispatch(setActiveSection(section.value));
              dispatch(setActiveStep(index));
            }}
            className="underline text-blue-700 cursor-pointer">
            Change
          </div>
        )}
      </AccordionTrigger>
      <AccordionContent className="p-6 bg-white border">
        <div className="space-y-4">
          <Component
            setActiveSection={setActiveSection}
            setActiveStep={setActiveStep}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
