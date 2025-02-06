import React from "react";

type Step = {
  number: number;
  title: string;
};

interface StepperProps {
  step: number;
}

const StepIndicator: React.FC<{ number: number; isActive: boolean }> = ({
  number,
  isActive,
}) => (
  <div
    className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm border border-gray-300
    ${isActive ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`}>
    {number}
  </div>
);

const Stepper: React.FC<StepperProps> = ({ step }) => {
  const steps: Step[] = [
    { number: 1, title: "Buyer Details" },
    { number: 2, title: "Order Details" },
    { number: 3, title: "Shipping Partner" },
    { number: 4, title: "Place Order" },
  ];

  return (
    <div>
      {/* Mobile View */}
      <div className="flex xl:hidden items-center justify-between w-full">
        {steps.map((item) => (
          <div
            key={item.number}
            className="flex flex-col items-center justify-center space-x-5">
            <StepIndicator
              number={item.number}
              isActive={step === item.number}
            />
            <div
              className={`mt-1 text-sm font-medium ${
                step === item.number ? "text-blue-500" : "text-gray-600"
              }`}>
              {item.title}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden xl:flex flex-col">
        {steps.map((item, index, array) => (
          <div key={item.number} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <StepIndicator
                number={item.number}
                isActive={step === item.number}
              />
              {index !== array.length - 1 && (
                <div className="h-8 border-l-2 border-dashed border-gray-300"></div>
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
    </div>
  );
};

export default Stepper;
