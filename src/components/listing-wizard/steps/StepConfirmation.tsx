import { useState } from "react";
import type { ProductFormData } from "../Container";
import Button from "../../ui/Button";

interface StepConfirmationProps {
  data: ProductFormData;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
  success: boolean;
  error: string | null;
  onNewListing: () => void;
}

export const StepConfirmation = ({
  data,
  onBack,
  onSubmit,
  loading,
  success,
  error,
  onNewListing,
}: StepConfirmationProps) => {
  const [showOptions, setShowOptions] = useState(false);

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
        <Button variant="secondary" onClick={onBack} disabled={success}>
          Back
        </Button>
        <Button
          variant="success"
          onClick={() => {
            onSubmit();
            setShowOptions(true);
          }}
          disabled={success}
        >
          {loading ? "Listing..." : "Confirm & List"}
        </Button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && (
        <>
          <p className="text-green-500 mt-2">Product listed successfully!</p>
          {showOptions && (
            <div className="p-4 border rounded bg-white shadow mt-4 text-center space-y-2">
              <p className="font-medium">What would you like to do next?</p>
              <div className="flex justify-center gap-4">
                <Button variant="primary" onClick={onNewListing}>
                  List Another
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => (window.location.href = "/")}
                >
                  Go to Homepage
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
