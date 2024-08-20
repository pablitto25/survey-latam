import React from "react";

type ProgressBarProps = {
  currentStep: number;
};

const steps = ["STEP 1", "STEP 2", "STEP 3", "STEP 4"];

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  return (
    <div className="flex justify-between items-center w-full max-w-lg mx-auto">
      {steps.map((step, index) => (
        <div key={index} className="relative flex-1 flex items-center">
          <div
            className={`h-8 w-8 rounded-full border-2 flex items-center justify-center ${
              index + 1 <= currentStep ? "bg-red-500 border-red-500" : "bg-gray-200 border-gray-300"
            }`}
          >
            <span
              className={`text-xs font-bold ${
                index + 1 <= currentStep ? "text-white" : "text-gray-500"
              }`}
            >
              {index + 1}
            </span>
          </div>
          {index !== steps.length - 1 && (
            <div className="flex-1 h-0.5 bg-gray-300 mx-2">
              <div
                className={`h-0.5 ${
                  index + 1 < currentStep ? "bg-red-500" : "bg-gray-300"
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
