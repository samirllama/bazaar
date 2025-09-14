import 'dotenv/config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { users, sellers, products } from '../../db/schema'
import { eq } from 'drizzle-orm'


export const resolvers = {
  Query: {
    products: async (_parent, args: { limit?: number }, { db }) => {
      const limit = args.limit ?? 50;
      return await db.select().from(products).limit(limit);
    },
    product: async (_parent, args: { id: string }, { db }) => {
      const [product] = await db.select().from(products).where(eq(products.id, args.id));
      return product;
    },
    sellers: async (_, _args, { db }) => {
      return await db.select().from(sellers);
    },
    seller: async (_parent, args: { id: string }, { db }) => {
      const [seller] = await db.select().from(sellers).where(eq(sellers.id, args.id));
      return seller;
    },
  },

  Mutation: {
    signUp: async (_, { email, password }: { email: string; password: string }, { db }) => {
      const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
      if (existing.length) throw new Error("User already exists");

      const hashed = await bcrypt.hash(password, 10);
      const [newUser] = await db.insert(users).values({ email, password: hashed }).returning();
      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });

      return { token, user: { id: newUser.id, email: newUser.email } };

    },

    signIn: async (_, { email, password }: { email: string; password: string }, { db }) => {
      const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
      if (!user) throw new Error("Invalid credentials");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid credentials");


      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });

      return { token, user: { id: user.id, email: user.email } };
    },


    createProduct: async (_parent, { input }, { db, userId }) => {
      if (!userId) throw new Error('Not authenticated');

      const [newProduct] = await db
        .insert(products)
        .values({
          title: input.title,
          description: input.description,
          priceCents: input.priceCents,
          sellerId: userId,
        })
        .returning();

      return newProduct;
    },

  },

  Product: {
    seller: async (parent, _args, { db }) =>
      db.select().from(users).where(eq(users.id, parent.sellerId)).then(r => r[0]),
  },

  Seller: {
    user: async (parent, _args, { db }) => {
      const [user] = await db.select().from(users).where(eq(users.id, parent.userId))
      return user
    },
  },
}
