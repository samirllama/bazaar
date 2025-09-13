import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "../graphql/queries";
import { CreateListingForm } from "./CreateListingForm";

export const ProductList = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { limit: 10 },
  });

  if (loading) return <p>Loading products…</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.products.map((product: any) => (
        <div key={product.id} className="border rounded p-4 shadow">
          <h2 className="text-lg font-bold">{product.title}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="font-semibold">
            {(product.priceCents / 100).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <p className="text-sm text-gray-500">
            Seller: {product.seller?.name}
          </p>

          <CreateListingForm productId={product.id} />
        </div>
      ))}
    </div>
  );
};
