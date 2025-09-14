// src/lib/AuthContext.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
// src/lib/AuthContext.tsx
import apolloClient from "./apolloClient";
import { gql } from "@apollo/client";

type AuthContextType = {
  userId: string | null;
  token: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// GraphQL mutations
const SIGNUP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

const SIGNIN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const saveAuth = (userId: string, token: string) => {
    setUserId(userId);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const clearAuth = () => {
    setUserId(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const signUp = async (email: string, password: string) => {
    const { data } = await apolloClient.mutate({
      mutation: SIGNUP_MUTATION,
      variables: { email, password },
    });
    if (!data?.signUp?.token) throw new Error("Signup failed");

    saveAuth(data.signUp.user.id, data.signUp.token);
  };

  const signIn = async (email: string, password: string) => {
    const { data } = await apolloClient.mutate({
      mutation: SIGNIN_MUTATION,
      variables: { email, password },
    });
    if (!data?.signIn?.token) throw new Error("Signin failed");

    saveAuth(data.signIn.user.id, data.signIn.token);
  };

  const signOut = () => {
    clearAuth();
  };

  return (
    <AuthContext.Provider value={{ userId, token, signUp, signIn, signOut }}>
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
