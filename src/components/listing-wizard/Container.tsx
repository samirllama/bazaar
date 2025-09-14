import { useState } from "react";
import { StepProductDetails } from "./steps/StepProductDetails";
import { StepPreview } from "./steps/StepPreview";
import { StepConfirmation } from "./steps/StepConfirmation";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { CREATE_PRODUCT_MUTATION } from "../../graphql/products";
import { useAuth } from "../../lib/AuthContext";
import Button from "../ui/Button";

export type ProductFormData = {
  title: string;
  description: string;
  priceCents: number;
};

export const WizardContainer = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    description: "",
    priceCents: 0,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useAuth();

  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION, {
    update(cache, { data: { createProduct } }) {
      cache.modify({
        fields: {
          products(existing = []) {
            const newRef = cache.writeFragment({
              data: createProduct,
              fragment: gql`
                fragment NewProduct on Product {
                  id
                  title
                  description
                  priceCents
                  seller {
                    id
                    name
                    user {
                      email
                    }
                  }
                }
              `,
            });
            return [...existing, newRef];
          },
        },
      });
    },
  });

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    if (!userId) return setError("You must be logged in to sell products.");
    setLoading(true);
    setError(null);
    try {
      await createProduct({
        variables: { input: formData },
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Sell a Product</h1>

      {step === 1 && (
        <StepProductDetails
          data={formData}
          onChange={setFormData}
          onNext={next}
        />
      )}
      {step === 2 && (
        <StepPreview data={formData} onNext={next} onBack={back} />
      )}
      {step === 3 && (
        <StepConfirmation
          data={formData}
          onBack={back}
          onSubmit={handleSubmit}
          loading={loading}
          success={success}
          error={error}
        />
      )}

      <div className="mt-4 text-sm text-gray-500 text-center">
        Step {step} of 3
      </div>
    </div>
  );
};
