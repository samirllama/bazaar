import 'dotenv/config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '../../db/db'
import { users, sellers, products } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { randomUUID } from 'crypto'


const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret' // replace in prod


export const resolvers = {
  Query: {
    products: async (_: any, { limit }: { limit: number }) => {
      return db.select().from(products).limit(limit)
    },
    product: async (_: any, { id }: { id: string }) => {
      const [product] = await db.select().from(products).where(eq(products.id, id))
      return product
    },
    sellers: async () => db.select().from(sellers),
    seller: async (_: any, { id }: { id: string }) => {
      const [seller] = await db.select().from(sellers).where(eq(sellers.id, id))
      return seller
    },
  },

  Mutation: {
    signUp: async (_: any, { email, password }: { email: string, password: string }) => {
      const hashedPassword = await bcrypt.hash(password, 10)
      const id = randomUUID()
      await db.insert(users).values({ id, email, password: hashedPassword }).run()

      const token = jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: '7d' })
      return { token, user: { id, email } }
    },

    login: async (_: any, { email, password }: { email: string, password: string }) => {
      const [user] = await db.select().from(users).where(eq(users.email, email))
      if (!user) throw new Error('User not found')

      const valid = await bcrypt.compare(password, user.password)
      if (!valid) throw new Error('Incorrect password')

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
      return { token, user: { id: user.id, email: user.email } }
    },

    createProduct: async (
      _: any,
      { input }: { input: { title: string; description?: string; priceCents: number } },
      context: any
    ) => {
      if (!context.user) throw new Error('Not authenticated')
      const userId = context.user.id

      // 2. Find or create Seller for this user
      let [seller] = await db.select().from(sellers).where(eq(sellers.userId, userId))
      if (!seller) {
        const [user] = await db.select().from(users).where(eq(users.id, userId))
        await db.insert(sellers).values({
          id: randomUUID(),
          userId,
          name: user.email.split('@')[0], // Example: default name from email prefix
          email: user.email,
        })
          ;[seller] = await db.select().from(sellers).where(eq(sellers.userId, userId))
      }

      const newProductId = randomUUID()
      await db.insert(products).values({
        id: newProductId,
        sellerId: seller.id,
        title: input.title,
        description: input.description || '',
        priceCents: input.priceCents,
      }).run()

      const [newProduct] = await db.select().from(products).where(eq(products.id, newProductId))
      return newProduct
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
