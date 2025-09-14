import 'dotenv/config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '../../db/db'
import { users, sellers, products } from '../../db/schema'
import { eq, SQLWrapper } from 'drizzle-orm'
import { randomUUID } from 'crypto'


const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret' // replace in prod


export const resolvers = {
  Query: {
    products: async (_parent, args: { limit?: number }) => {
      const limit = args.limit ?? 50;
      return await db.select().from(products).limit(limit);
    },
    product: async (_parent, args: { id: string }) => {
      const [product] = await db.select().from(products).where(eq(products.id, args.id));
      return product;
    },
    sellers: async () => {
      return await db.select().from(sellers);
    },
    seller: async (_parent, args: { id: string }) => {
      const [seller] = await db.select().from(sellers).where(eq(sellers.id, args.id));
      return seller;
    },
  },

  Mutation: {
    signUp: async (_: any, { email, password }: { email: string; password: string }) => {
      const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
      if (existing.length) throw new Error("User already exists");

      const hashed = await bcrypt.hash(password, 10);
      const [newUser] = await db.insert(users).values({ email, password: hashed }).returning();
      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });

      return { token, user: { id: newUser.id, email: newUser.email } };

    },

    signIn: async (_: any, { email, password }: { email: string; password: string }) => {
      const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
      if (!user) throw new Error("Invalid credentials");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid credentials");


      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });

      return { token, user: { id: user.id, email: user.email } };
    },


    createProduct: async (_parent: any, args: { input: { title: string; description?: string; priceCents: number } }, context: { userId: string | SQLWrapper }) => {
      if (!context.userId) throw new Error('Not authenticated');
      const seller = await db.select().from(sellers).where(eq(sellers.userId, context.userId)).then(r => r[0]);
      if (!seller) throw new Error('Seller not found');

      const [newProduct] = await db.insert(products).values({
        title: args.input.title,
        description: args.input.description,
        priceCents: args.input.priceCents,
        sellerId: seller.id,
      }).returning();

      return newProduct;
    },
  },

  Product: {
    seller: async (parent) => {
      const [seller] = await db.select().from(sellers).where(eq(sellers.id, parent.sellerId))
      return seller
    },
  },

  Seller: {
    user: async (parent) => {
      const [user] = await db.select().from(users).where(eq(users.id, parent.userId))
      return user
    },
  },
}
