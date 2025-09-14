// src/lib/AuthContext.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import bcrypt from "bcrypt";
import type { users, InsertUser, SelectUser } from "../../db/schema";
import { db } from "../../db/db";
import jwt from "jsonwebtoken";

interface AuthContextType {
  userId: string | null;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);

  const signup = async (email: string, password: string) => {
    // Check if user exists
    const existing = await db
      .select()
      .from(users)
      .where(users.email.eq(email))
      .limit(1);
    if (existing.length) throw new Error("User already exists");
    const hashed = await bcrypt.hash(password, 10);
    const newUser: InsertUser = { email, password: hashed };
    const result = await db.insert(users).values(newUser).returning();
    setUserId(result[0].id);
  };

  const signin = async (email: string, password: string) => {
    const [user] = await db
      .select()
      .from(users)
      .where(users.email.eq(email))
      .limit(1);
    if (!user) throw new Error("Invalid credentials");
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");
    setUserId(user.id);
  };

  const signout = () => {
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userId, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
