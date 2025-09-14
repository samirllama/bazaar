// src/pages/Landing.tsx
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useAuth } from "../lib/AuthContext";

export default function LandingPage() {
  const navigate = useNavigate();
  const { userId } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Bazaar</h1>
      <p className="text-center text-gray-600 mb-12 max-w-xl">
        Buy and sell products seamlessly. Experience a magical flow for sellers
        and a clean shopping experience for buyers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card className="p-6 flex flex-col justify-between hover:shadow-xl transition-shadow cursor-pointer">
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          <p className="text-gray-700 mb-6">
            Browse all products available in the marketplace. See new listings
            instantly.
          </p>
          <Button
            variant="primary"
            onClick={() => navigate("/products")}
            className="self-start"
          >
            View Products
          </Button>
        </Card>

        <Card className="p-6 flex flex-col justify-between hover:shadow-xl transition-shadow cursor-pointer">
          <h2 className="text-2xl font-semibold mb-4">Sell Products</h2>
          <p className="text-gray-700 mb-6">
            List your products quickly and easily. Guide through a magical
            selling flow.
          </p>
          <Button
            variant="secondary"
            onClick={() => (userId ? navigate("/sell") : navigate("/login"))}
            className="self-start"
          >
            {userId ? "Start Selling" : "Login to Sell"}
          </Button>
        </Card>
      </div>
    </div>
  );
}
