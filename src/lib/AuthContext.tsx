// src/lib/AuthContext.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import client from "./apolloClient";
import { SIGN_IN_MUTATION, SIGN_UP_MUTATION } from "../graphql/auth";

type AuthContextType = {
  userId: string | null;
  token: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId")
  );

  const saveSession = (token: string, userId: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    setToken(token);
    setUserId(userId);
  };

  const signUp = async (email: string, password: string) => {
    const { data } = await client.mutate({
      mutation: SIGN_UP_MUTATION,
      variables: { email, password },
    });
    saveSession(data.signUp.token, data.signUp.user.id);
  };

  const signIn = async (email: string, password: string) => {
    const { data } = await client.mutate({
      mutation: SIGN_IN_MUTATION,
      variables: { email, password },
    });
    saveSession(data.signIn.token, data.signIn.user.id);
  };

  const signOut = () => {
    localStorage.clear();
    setToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, userId, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
// Hook to consume auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");

  return context;
};
