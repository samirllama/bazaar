import { ProductFormData } from "../Container";

type Props = {
  data: ProductFormData;
  onBack: () => void;
};

export const StepConfirmation = ({ data, onBack }: Props) => (
  <div className="text-center space-y-4">
    <h2 className="text-xl font-semibold">Listing Created!</h2>
    <p>
      Your product <strong>{data.title}</strong> is ready to be listed.
    </p>
    <button onClick={onBack} className="px-4 py-2 border rounded">
      Back to Edit
    </button>
  </div>
);
