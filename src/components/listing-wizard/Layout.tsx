import React from "react";

interface WizardLayoutProps {
  title: string;
  step: number;
  totalSteps: number;
  children: React.ReactNode;
}

export const WizardLayout = ({
  title,
  step,
  totalSteps,
  children,
}: WizardLayoutProps) => (
  <div className="border rounded-lg p-6 shadow-lg bg-white max-w-lg mx-auto">
    <div className="mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-2 w-full bg-gray-200 h-2 rounded">
        <div
          className="h-2 bg-blue-600 rounded transition-all"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Step {step} of {totalSteps}
      </p>
    </div>
    <div>{children}</div>
  </div>
);
