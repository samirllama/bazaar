// src/components/SignupForm.tsx
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { SIGNUP_MUTATION } from "../graphql/auth";
import { useAuth } from "../lib/AuthContext";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUp] = useMutation(SIGNUP_MUTATION);
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await signUp({ variables: { email, password } });
      login(data.signUp.token, data.signUp.user.id);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={loading}>
        Sign Up
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
