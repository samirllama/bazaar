interface Step2Props {
  formState: { priceCents?: number };
  updateForm: (data: { priceCents?: number }) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step2 = ({ formState, updateForm, nextStep, prevStep }: Step2Props) => {
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.priceCents) return;
    nextStep();
  };

  return (
    <form onSubmit={handleNext} className="flex flex-col gap-4 text-gray-600">
      <h2 className="text-xl font-bold">Step 2: Listing Details</h2>

      <input
        type="number"
        min="0"
        placeholder="Price USD"
        value={formState.priceCents ? formState.priceCents / 100 : ""}
        onChange={(e) =>
          updateForm({
            priceCents: Math.round(parseFloat(e.target.value) * 100),
          })
        }
        className="border rounded p-2"
        required
      />

      <div className="flex gap-2">
        <button type="button" onClick={prevStep} className="border rounded p-2">
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step2;
