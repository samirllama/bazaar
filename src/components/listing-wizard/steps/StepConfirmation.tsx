import type { ProductFormData } from "../Container";
import Button from "../../ui/Button";

interface StepConfirmationProps {
  data: ProductFormData;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
  success: boolean;
  error: string | null;
}

export const StepConfirmation = ({
  data,
  onBack,
  onSubmit,
  loading,
  success,
  error,
}: StepConfirmationProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Confirm Your Listing</h2>
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
        <Button variant="success" onClick={onSubmit} disabled={loading}>
          {loading ? "Listing..." : "Confirm & List"}
        </Button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && (
        <p className="text-green-500 mt-2">Product listed successfully!</p>
      )}
    </div>
  );
};
