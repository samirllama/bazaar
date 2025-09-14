import type { ProductFormData } from "../Container";
import Button from "../../ui/Button";

interface StepPreviewProps {
  data: ProductFormData;
  onNext: () => void;
  onBack: () => void;
}

export const StepPreview = ({ data, onNext, onBack }: StepPreviewProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Preview Your Product</h2>
      <div className="p-4 bg-gray-50 rounded-md space-y-2">
        <p>
          <strong>Title:</strong> {data.title}
        </p>
        <p>
          <strong>Description:</strong> {data.description}
        </p>
        <p>
          <strong>Price:</strong> ${(data.priceCents / 100).toFixed(2)}
        </p>
      </div>
      <div className="flex justify-between">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button variant="primary" onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
};
