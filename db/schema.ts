// db/schema.ts
import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { randomUUID } from 'crypto'

const id = () =>
    text('id')
        .primaryKey()
        .$default(() => randomUUID())

const createdAt = () =>
    text('created_at')
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull()

export const users = sqliteTable('users', {
    id: id(),
    createdAt: createdAt(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
})

//  Sellers Table
export const sellers = sqliteTable('sellers', {
    id: text('id').primaryKey().$default(() => randomUUID()),
    userId: text('user_id').notNull(), // FK to users
    name: text('name').notNull(),
    email: text('email').unique().notNull(),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
})

//  Products Table ---
export const products = sqliteTable('products', {
    id: id(),
    title: text('title').notNull(),
    description: text('description'),
    priceCents: integer('price_cents').notNull(),
    createdAt: createdAt(),
    sellerId: text('seller_id').notNull(),
})

export const userRelations = relations(users, ({ many }) => ({
    products: many(products),
}))

/* ---------- Types for Insert/Select ---------- */
export type InsertUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect
export type InsertSeller = typeof sellers.$inferInsert
export type SelectSeller = typeof sellers.$inferSelect
export type InsertProduct = typeof products.$inferInsert
export type SelectProduct = typeof products.$inferSelect
