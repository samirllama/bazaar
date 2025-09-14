import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepProductDetails } from "./steps/StepProductDetails";
import { StepPreview } from "./steps/StepPreview";
import { StepConfirmation } from "./steps/StepConfirmation";
import { useMutation } from "@apollo/client/react";
import { CREATE_PRODUCT_MUTATION } from "../../graphql/products";
import { useAuth } from "../../lib/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

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

  const { userId, token } = useAuth();
  const navigate = useNavigate();

  // Redirect if user not logged in
  useEffect(() => {
    if (!userId) navigate("/login");
  }, [userId, navigate]);

  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION);

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    if (!token) {
      setError("You must be logged in to sell products.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createProduct({
        variables: {
          input: {
            title: formData.title,
            description: formData.description,
            priceCents: formData.priceCents,
          },
        },
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startNewListing = () => {
    setFormData({ title: "", description: "", priceCents: 0 });
    setSuccess(false);
    setStep(1);
  };

  const variants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Sell a Product</h1>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            {...variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <StepProductDetails
              data={formData}
              onChange={setFormData}
              onNext={next}
            />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="step2"
            {...variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <StepPreview data={formData} onNext={next} onBack={back} />
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="step3"
            {...variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <StepConfirmation
              data={formData}
              onBack={back}
              onSubmit={handleSubmit}
              loading={loading}
              success={success}
              error={error}
              onNewListing={startNewListing}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 text-sm text-gray-500 text-center">
        Step {step} of 3
      </div>
    </div>
  );
};
