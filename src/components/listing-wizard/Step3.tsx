import { useMutation } from "@apollo/client/react";
import { CREATE_LISTING } from "../../graphql/mutations";
import { GET_PRODUCTS } from "../../graphql/queries";

interface Step3Props {
  formState: { title: string; description: string; priceCents?: number };
  prevStep: () => void;
}

const Step3 = ({ formState, prevStep }: Step3Props) => {
  const [createListing, { loading, error }] = useMutation(CREATE_LISTING, {
    update(cache, { data }) {
      if (!data) return;
      const existing: any = cache.readQuery({
        query: GET_PRODUCTS,
        variables: { limit: 50 },
      });
      if (existing) {
        cache.writeQuery({
          query: GET_PRODUCTS,
          variables: { limit: 50 },
          data: {
            products: [
              ...existing.products,
              {
                id: Math.random().toString(),
                title: formState.title,
                description: formState.description,
                priceCents: formState.priceCents,
                seller: {
                  id: "1",
                  name: "Demo Seller",
                  email: "demo@example.com",
                },
                createdAt: new Date().toISOString(),
                __typename: "Product",
              },
            ],
          },
        });
      }
    },
  });

  const handleSubmit = async () => {
    if (!formState.priceCents) return;
    await createListing({
      variables: {
        input: { productId: "temp", priceCents: formState.priceCents },
      },
    });
    alert("Listing created! It now appears in your ProductList.");
  };

  return (
    <div className="flex flex-col gap-4 text-gray-600">
      <h2 className="text-xl font-bold">Step 3: Review & Submit</h2>
      <p>
        <strong>Title:</strong> {formState.title}
      </p>
      <p>
        <strong>Description:</strong> {formState.description}
      </p>
      <p>
        <strong>Price:</strong>{" "}
        {(formState.priceCents! / 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </p>

      <div className="flex gap-2">
        <button onClick={prevStep} className="border rounded p-2">
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600 text-white rounded p-2 hover:bg-green-700"
        >
          {loading ? "Submitting..." : "Submit Listing"}
        </button>
      </div>
      {error && <p className="text-red-600">Error: {error.message}</p>}
    </div>
  );
};

export default Step3;
