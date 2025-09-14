// src/pages/Home.tsx
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-8 p-4">
      <h1 className="text-4xl font-bold">Welcome to Bazaar</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="highlight" className="flex flex-col items-center p-8">
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          <p className="text-gray-600 mb-6 text-center">
            Browse all available products listed by sellers.
          </p>
          <Link to="/products">
            <Button variant="primary" size="lg">
              View Products
            </Button>
          </Link>
        </Card>

        <Card variant="highlight" className="flex flex-col items-center p-8">
          <h2 className="text-2xl font-semibold mb-4">Sell Products</h2>
          <p className="text-gray-600 mb-6 text-center">
            Create new listings and manage your products.
          </p>
          <Link to="/sell">
            <Button variant="success" size="lg">
              Sell Now
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
