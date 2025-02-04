// Stepper.tsx
import React from "react";

type Step = {
  number: number;
  title: string;
};

interface StepperProps {
  step: number;
}

const Stepper: React.FC<StepperProps> = ({ step }) => {
  const steps: Step[] = [
    { number: 1, title: "Buyer Details" },
    { number: 2, title: "Order Details" },
    { number: 3, title: "Shipping Partner" },
    { number: 4, title: "Place Order" },
  ];

  return (
    <div>
      {steps.map((item, index, array) => (
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
  );
};

export default Stepper;
