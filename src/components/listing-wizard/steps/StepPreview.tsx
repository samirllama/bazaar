import { ProductFormData } from '../Container';

type Props = {
  data: ProductFormData;
  onBack: () => void;
  onNext: () => void;
};

export const StepPreview = ({ data, onBack, onNext }: Props) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold">Preview Your Listing</h2>
    <div className="border rounded p-4">
      <p><strong>Title:</strong> {data.title}</p>
      <p><strong>Description:</strong> {data.description}</p>
      <p><strong>Price:</strong> ${(data.priceCents / 100).toFixed(2)}</p>
    </div>
    <div className="flex justify-between">
      <button onClick={onBack} className="px-4 py-2 border rounded">Back</button>
      <button onClick={onNext} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Confirm
      </button>
    </div>
  </div>
);
