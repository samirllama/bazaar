import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_LISTING } from "../graphql/mutations";
import { GET_PRODUCTS } from "../graphql/queries";

interface Props {
  productId: string;
}

export const CreateListingForm = ({ productId }: Props) => {
  const [price, setPrice] = useState("");
  const [createListing, { loading, error }] = useMutation(CREATE_LISTING, {
    update(cache, { data }) {
      if (!data) return;

      // Optionally add the new listing to the products cache
      const existingProducts: any = cache.readQuery({
        query: GET_PRODUCTS,
        variables: { limit: 50 },
      });

      if (existingProducts) {
        cache.writeQuery({
          query: GET_PRODUCTS,
          variables: { limit: 50 },
          data: {
            products: existingProducts.products.map((p: any) =>
              p.id === productId
                ? {
                    ...p,
                    listings: [...(p.listings || []), data.createListing],
                  }
                : p
            ),
          },
        });
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!price) return;

    await createListing({
      variables: {
        input: {
          productId,
          priceCents: Math.round(parseFloat(price) * 100),
        },
      },
    });

    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
      <input
        type="number"
        min="0"
        placeholder="Price USD"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border rounded p-2"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
      >
        {loading ? "Creating..." : "Create Listing"}
      </button>
      {error && <p className="text-red-600">Error: {error.message}</p>}
    </form>
  );
};
