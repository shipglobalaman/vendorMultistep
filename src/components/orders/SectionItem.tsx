import { Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clsx } from "clsx";

import { Section } from "@/components/orders/AddOrders";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
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
        className={clsx(
          "p-4 flex border justify-between",
          isActive ? "bg-gray-100" : "bg-white text-gray-500"
        )}>
        <div className="flex gap-4">
          <span
            className={clsx(
              "p-1 w-5 h-5 rounded-sm flex items-center justify-center text-white",
              activeStep > index ? "bg-green-500" : "bg-black"
            )}>
            {activeStep > index ? <Check size={16} /> : index}
          </span>
          <span>{section.label}</span>
        </div>
        {activeStep > index && index !== activeStep - 1 && (
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
