// server/dev-server.ts
import 'dotenv/config'
import jwt from "jsonwebtoken"
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './graphql/typeDefs'
import { resolvers } from './graphql/resolvers'
import { db } from '../db/db'

const server = new ApolloServer({ typeDefs, resolvers })

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) return { db }

        try {
            const payload: any = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret')
            return { db, user: { id: payload.userId } }
        } catch {
            return { db }
        }
        // Example: decode user ID from an auth header (stubbed for now)
        const userId = req.headers['x-user-id'] || 'fdb8c49f-cefb-4766-baba-d8e0db115d8b'
        return { db, user: userId ? { id: userId } : null }
    },
})

console.log(`🚀 Apollo server running at ${url}`)
