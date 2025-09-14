import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "../graphql/products";
import Card from "./ui/Card";
import Button from "./ui/Button";

export default function ProductList() {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { limit: 50 },
  });

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Error: {error.message}</p>
    );

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.products.map((product: any) => (
        <Card key={product.id} className="flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg mb-2">{product.title}</h3>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-gray-500 text-sm mb-1">
              Price: ${(product.priceCents / 100).toFixed(2)}
            </p>
            <p className="text-gray-400 text-sm">
              Seller: {product.seller.name} ({product.seller.user.email})
            </p>
          </div>
          <Button variant="primary" size="sm" className="mt-4">
            Buy
          </Button>
        </Card>
      ))}
    </div>
  );
}
