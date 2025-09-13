import { ProductFormData } from "../WizardContainer";

type Props = {
  data: ProductFormData;
  onChange: (data: ProductFormData) => void;
  onNext: () => void;
};

export const StepProductDetails = ({ data, onChange, onNext }: Props) => {
  const updateField = (
    field: keyof ProductFormData,
    value: string | number
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={data.title}
          onChange={(e) => updateField("title", e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          className="w-full border rounded p-2"
          value={data.description}
          onChange={(e) => updateField("description", e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Price (USD)</label>
        <input
          type="number"
          className="w-full border rounded p-2"
          value={data.priceCents / 100 || ""}
          onChange={(e) =>
            updateField("priceCents", parseFloat(e.target.value) * 100)
          }
        />
      </div>
      <button
        onClick={onNext}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
};
