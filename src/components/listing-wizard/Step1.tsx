import { WizardLayout } from "./Layout";

interface Step1Props {
  formState: { title: string; description: string };
  updateForm: (data: { title?: string; description?: string }) => void;
  nextStep: () => void;
}

const Step1 = ({ formState, updateForm, nextStep }: Step1Props) => {
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title || !formState.description) return;
    nextStep();
  };

  return (
    <WizardLayout title="Product Info" step={1} totalSteps={3}>
      <form onSubmit={handleNext} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Product Title"
          value={formState.title}
          onChange={(e) => updateForm({ title: e.target.value })}
          className="border rounded p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />

        <textarea
          placeholder="Product Description"
          value={formState.description}
          onChange={(e) => updateForm({ description: e.target.value })}
          className="border rounded p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          rows={4}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition"
        >
          Next
        </button>
      </form>
    </WizardLayout>
  );
};

export default Step1;
