// server/dev-server.ts
import "dotenv/config"; // server-only: load .env
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt from "jsonwebtoken";

import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

import { db } from "../db/db";
import { db as DbInstance } from "../db/db";
import { users, sellers } from "../db/schema";
import { eq } from "drizzle-orm";

type ContextValue = {
    userId: string | null;
    user: { id: string; email: string } | null;
    db: typeof DbInstance
};

const PORT = Number(process.env.PORT ?? 4000);
const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) {
    console.error("⚠️  JWT_SECRET is not set. Set JWT_SECRET in your .env file.");
    process.exit(1);
}

const server = new ApolloServer<ContextValue>({
    typeDefs,
    resolvers,
    // Optional: enable introspection in dev, you can turn off in prod
    introspection: true,
});

async function start() {
    const { url, port } = await startStandaloneServer(server, {
        listen: { port: PORT },
        async context({ req }): Promise<ContextValue> {
            const authHeader = (req.headers.authorization ?? "") as string;
            const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

            let user: ContextValue["user"] = null;
            let userId: string | null = null;


            if (token) {
                try {
                    const payload = jwt.verify(token, JWT_SECRET) as { userId?: string };
                    if (payload?.userId) {
                        userId = payload.userId;

                        // Load user and seller eagerly so resolvers can use them directly.
                        try {
                            const [dbUser] = await db
                                .select()
                                .from(users)
                                .where(eq(users.id, userId))
                                .limit(1);
                            if (dbUser) {
                                user = { id: dbUser.id, email: dbUser.email };
                            }

                            // Load seller profile associated with this user (if any)
                            const [dbSeller] = await db
                                .select()
                                .from(sellers)
                                .where(eq(sellers.userId, userId))
                                .limit(1);
                            if (dbSeller) {
                                seller = { id: dbSeller.id, name: dbSeller.name, userId: dbSeller.userId };
                            }
                        } catch (dbErr) {
                            console.warn("Failed to load user/seller from DB:", dbErr);
                        }
                    }
                } catch (err) {
                    // token invalid/expired -> continue without user context (resolvers should check)
                    console.warn("Invalid token:", err instanceof Error ? err.message : err);
                }
            }

            return { userId, user, db };
        },
    });

    console.log(`🚀 GraphQL server ready at ${url}`);
    console.log(`   - NODE_ENV=${process.env.NODE_ENV ?? "development"}`);
    console.log(`   - Using DB: ${process.env.TURSO_CONNECTION_URL ? "Turso (libSQL)" : "unknown"}`);
    console.log(`   - JWT provided: ${!!JWT_SECRET}`);
}

start().catch((err) => {
    console.error("Failed to start Apollo server:", err);
    process.exit(1);
});
