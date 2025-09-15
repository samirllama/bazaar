// src/pages/Landing.tsx
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useAuth } from "../lib/AuthContext";

export default function LandingPage() {
  const navigate = useNavigate();
  const { userId } = useAuth();

  return (
    <div className="flex flex-col items-center pt-12 text-center sm:pt-18">
      <h2 className="font-bold tracking-tight sm:text-5xl lg:text-6xl">
        Welcome to Bazaar
      </h2>
      <p className="text-center text-gray-600 py-8 max-w-xl">
        Buy and sell products seamlessly. Experience a magical flow for sellers
        and a clean shopping experience for buyers.
      </p>

      <div className="mt-10 flex items-center justify-center gap-4">
        <Card className="p-6 flex flex-col basis-1/2 justify-between hover:shadow-xl transition-shadow cursor-pointer">
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          <p className="text-gray-700 mb-6">Browse all available products.</p>
          <Button
            variant="primary"
            onClick={() => navigate("/products")}
            className="self-center"
          >
            View Products
          </Button>
        </Card>

        <Card className="p-6 flex flex-col basis-1/2 justify-between hover:shadow-xl transition-shadow cursor-pointer">
          <h2 className="text-2xl font-semibold mb-4">Sell Products</h2>
          <p className="text-gray-700 mb-6">
            List your products quickly and easily.
          </p>
          <Button
            variant="secondary"
            onClick={() => (userId ? navigate("/sell") : navigate("/login"))}
            className="self-center"
          >
            {userId ? "Start Selling" : "Login to Sell"}
          </Button>
        </Card>
      </div>
    </div>
  );
}
