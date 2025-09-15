# Bazaar 🧙‍♂️

A modern, full-stack e-commerce demo showcasing a **GraphQL + React** workflow with authentication, database persistence, and a seller flow with a multi-step form.

---

## 📖 Project Overview

Bazaar simulates a simplified marketplace where **users can sign up, log in, and list products** for sale. It demonstrates:

- Secure authentication using **JWT**.
- Database persistence with **Drizzle ORM** and **Turso (SQLite)**.
- A **multi-step product listing wizard** for a smooth seller experience.
- **Apollo Client/Server** integration following Apollo’s **latest best practices**.
- **Type-safe GraphQL hooks** generated automatically with **GraphQL Code Generator**.

---

## ✨ Key Features

- 🔐 **Authentication**: JWT-based sign-up, login, and protected routes.
- 🧭 **Seller Flow**: Multi-step wizard for creating products.
- **Image Preview:** Users can select an image and see a preview before submission.
- 🗄 **Database Integration**: Drizzle ORM with Turso (SQLite) for persistence.
- 🔗 **GraphQL**: Apollo Client/Server with context-based auth.
- 🧰 **Code Generation**: Automatic TypeScript types and hooks from GraphQL operations.
- 🎨 **Reusable UI Library**: Clean, Tailwind-powered components.
- 🌗 **Theme Handling**: Automatic dark/light mode support.

---

## 🛠️ Tech Stack & Tools

| Category     | Technology                               |
| ------------ | ---------------------------------------- |
| **Frontend** | React, Vite, Tailwind CSS, Apollo Client |
| **Backend**  | Node.js, Apollo Server                   |
| **Language** | JavaScript (ES6+), Typescript            |

---

## 🏛️ Architecture

The repository is structured as a monorepo with `client` and `server`.

### **Database**

We simplified our schema to **two tables**:

- `users` – stores user accounts.
- `products` – stores product listings (linked by `sellerId` = `users.id`).

Drizzle handles migrations and querying.

### **GraphQL Schema**

```graphql
type User {
  id: ID!
  email: String!
  createdAt: String!
}

type Product {
  id: ID!
  title: String!
  description: String
  priceCents: Int!
  seller: User!
  createdAt: String!
}

type AuthPayload {
  token: String!
  user: User!
}

type Query {
  products: [Product!]!
}

type Mutation {
  signUp(email: String!, password: String!): AuthPayload!
  signIn(email: String!, password: String!): AuthPayload!
  createProduct(input: CreateProductInput!): Product!
}

input CreateProductInput {
  title: String!
  description: String
  priceCents: Int!
}
```

### Overall Data Flow

The application follows a predictable, one-way data flow. User input is captured in a component, the state is updated in the central `ListingContext`, and on the final step, the context's state is sent to the GraphQL server via an Apollo Client mutation.

`Component Input` → `React Context (State Update)` → `Final Review Step` → `Apollo Client Mutation` → `GraphQL Server`

### **Server Context**

The Apollo Server attaches the database and authenticated user to the context:

```ts
export interface ContextValue {
  db: typeof db;
  userId: string | null;
  user: { id: string; email: string } | null;
}
```

### **Authentication**

- On **sign up** or **sign in**, the server generates a JWT.
- Apollo Client stores this token in `localStorage`.
- Every request sends the token as a **Bearer** header via `SetContextLink`.
- Resolvers use `context.userId` for authorization.

### **Code Generation**

GraphQL Codegen is configured to generate:

- Typed query/mutation hooks (`useSignUpMutation`, `useCreateProductMutation`).
- Strongly-typed schema types for resolvers.

Run:

```bash
pnpm codegen
```

---

## 🧩 Reusable Component Library

| Component    | Props                        | Prop Types               | Description                                |
| ------------ | ---------------------------- | ------------------------ | ------------------------------------------ |
| `<Button />` | `variant`, `children`        | `string`, `ReactNode`    | Primary button for actions.                |
| `<Card />`   | `children`                   | `ReactNode`              | Styled container for sections or previews. |
| `<Input />`  | `label`, `value`, `onChange` | `string`, `string`, `fn` | Styled text input with a label.            |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v20+
- pnpm
- Turso CLI (if you’re running a fresh database)

### Installation

1. **Clone & Install:**

   ```bash
   git clone https://github.com/samirllama/bazaar.git
   cd bazaar
   pnpm install
   ```

2. **Database Setup:**

   ```bash
   # Create and migrate the Turso database
   pnpm drizzle:generate
   pnpm drizzle:migrate
   ```

3. **Generate Types:**

   ```bash
   pnpm codegen
   ```

### Running the App

1. **Start the GraphQL Server:**

   ```bash
   pnpm dev:server
   ```

   Available at: `http://localhost:4000`

2. **Start the Client:**

   ```bash
   pnpm dev:client
   ```

   Available at: `http://localhost:5173`

---

## ✅ Testing Flows

1. **Sign Up / Sign In** via Apollo Studio or UI.
2. **Create Products** using the multi-step wizard.
3. **Browse Products** on the Products page (unauthenticated access works).
4. **Sell Flow Protection**: Unauthenticated users are redirected to login/signup.

---

## 📚 Future Improvements

- Add image uploads for products.
- Pagination and filtering for product listings.
- Seller dashboards and analytics.

---
