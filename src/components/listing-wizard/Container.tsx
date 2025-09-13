import { useState } from "react";
import { StepProductDetails } from "./steps/StepProductDetails";
import { StepPreview } from "./steps/StepPreview";
import { StepConfirmation } from "./steps/StepConfirmation";

export type ProductFormData = {
  title: string;
  description: string;
  priceCents: number;
};

export const WizardContainer = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    description: "",
    priceCents: 0,
  });

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Sell a Product</h1>

      {step === 1 && (
        <StepProductDetails
          data={formData}
          onChange={setFormData}
          onNext={next}
        />
      )}
      {step === 2 && (
        <StepPreview data={formData} onNext={next} onBack={back} />
      )}
      {step === 3 && <StepConfirmation data={formData} onBack={back} />}

      <div className="mt-4 text-sm text-gray-500 text-center">
        Step {step} of 3
      </div>
    </div>
  );
};
