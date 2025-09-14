import type { ProductFormData } from "../Container";
import Button from "../../ui/Button";

interface StepProductDetailsProps {
  data: ProductFormData;
  onChange: (data: ProductFormData) => void;
  onNext: () => void;
}

export const StepProductDetails = ({
  data,
  onChange,
  onNext,
}: StepProductDetailsProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.title || data.priceCents <= 0) return; // basic validation
    onNext();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1 font-medium">Product Name</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={data.title}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          className="w-full border p-2 rounded"
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Price</label>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-500">$</span>
          <input
            type="number"
            step="0.01"
            min="0"
            className="w-full border p-2 pl-7 rounded"
            value={data.priceCents ? (data.priceCents / 100).toString() : ""}
            onChange={(e) => {
              const dollars = parseFloat(e.target.value);
              onChange({
                ...data,
                priceCents: isNaN(dollars) ? 0 : Math.round(dollars * 100),
              });
            }}
            required
            placeholder="0.00"
          />
        </div>
      </div>
      <Button variant="primary" type="submit">
        Next
      </Button>
    </form>
  );
};
