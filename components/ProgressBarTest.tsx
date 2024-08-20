import React from "react";
import styles from "@/styles/progressbar.module.css";

type ProgressBarProps = {
  currentStep: number;
};


const ProgressBarTest: React.FC<ProgressBarProps> = ({ currentStep }) => {
  return (
    <div className="relative flex justify-around items-center w-full max-w-4xl mx-auto ">
      {/* Línea de progreso */}
      <div className={styles.progressLine}></div>

      {/* Círculos y textos */}
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <span><strong className="text-xs">STEP 1</strong></span>
          <div
            className={`${styles.circle} ${currentStep >= 1 ? "bg-[#FF0000]" : "bg-gray-300"
              }`}
          ></div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <span><strong className="text-xs">STEP 2</strong></span>
          <div
            className={`${styles.circle} ${currentStep >= 2 ? "bg-[#FF0000]" : "bg-gray-300"
              }`}
          ></div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <span><strong className="text-xs">STEP 3</strong></span>
          <div
            className={`${styles.circle} ${currentStep >= 3 ? "bg-[#FF0000]" : "bg-gray-300"
              }`}
          ></div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <span><strong className="text-xs">STEP 4</strong></span>
          <div
            className={`${styles.circle} ${currentStep >= 4 ? "bg-[#FF0000]" : "bg-gray-300"
              }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBarTest;
