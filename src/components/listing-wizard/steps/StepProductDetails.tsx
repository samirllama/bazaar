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
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
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
        <label className="block mb-1 font-medium">Price (in cents)</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={data.priceCents}
          onChange={(e) =>
            onChange({ ...data, priceCents: Number(e.target.value) })
          }
          required
        />
      </div>

      <Button variant="primary" type="submit">
        Next
      </Button>
    </form>
  );
};
