import { db } from '../db/db'
import { users } from '../db/schema'

async function test() {
    // Insert a test user
    await db.insert(users).values({
        email: 'first@example.com',
        password: 'secret',
    })

    // Fetch all users
    const all = await db.select().from(users)
    console.log('✅ Users in DB:', all)
}

test().catch((err) => {
    console.error('❌ DB Test Failed:', err)
    process.exit(1)
})
