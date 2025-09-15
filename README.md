# Bazaar 🧙‍♂️

A robust, multi-step form application designed to showcase a modern frontend architecture for an e-commerce seller flow.

---

## 📖 Project Overview

This project was built to solve the real-world challenge of creating an intuitive and seamless item listing experience for sellers on an e-commerce platform. It's a targeted portfolio piece that demonstrates not just the ability to build features, but the architectural thinking required to build scalable and maintainable frontend systems. The core of the application is a multi-step "wizard" that guides the user through the entire listing process, from entering basic details to submitting the final product.

---

## ✨ Key Features

- **Fully Responsive Multi-Step Wizard:** A seamless user experience across all five steps of the listing process.
- **Client-Side State Management:** Centralized state management using **React Context** to handle form data across multiple, distinct components.
- **Image Preview:** Users can select an image and see a preview before submission.
- **GraphQL Integration:** Uses **Apollo Client** to send the final form data to a mock backend via a GraphQL mutation.
- **Reusable Component Library:** Built with a focus on creating generic, reusable UI components for maximum code reuse.

---

## 🛠️ Tech Stack & Tools

| Category     | Technology                               |
| ------------ | ---------------------------------------- |
| **Frontend** | React, Vite, Tailwind CSS, Apollo Client |
| **Backend**  | Node.js, Apollo Server                   |
| **Language** | JavaScript (ES6+), Typescript            |

---

## 🏛️ Architecture

This project is structured as a monorepo with two main packages: `client` and `server`.

### Overall Data Flow

The application follows a predictable, one-way data flow. User input is captured in a component, the state is updated in the central `ListingContext`, and on the final step, the context's state is sent to the GraphQL server via an Apollo Client mutation.

`Component Input` → `React Context (State Update)` → `Final Review Step` → `Apollo Client Mutation` → `GraphQL Server`

### State Management

To manage the form's state across the entire five-step process, we use **React's Context API**. A single `ListingContext` is created to act as a centralized store for all form data.

- **Why Context?** It avoids "prop drilling" (passing props down through many levels of components) and is a lightweight, built-in solution perfect for managing client-side state of this scope without the need for a heavier library like Redux.

### Component Architecture

The `client/src/components` directory is organized to distinguish between generic UI elements and feature-specific components:

- **`/components/ui`**: Contains highly reusable, "dumb" components that are application-agnostic (e.g., `<Button />`, `<StyledInput />`, `<Card />`). These are the building blocks of our interface.
- **`/components/steps`**: Contains the five components that represent each step of the wizard. These components are responsible for the layout and logic of a specific step and consume the `ListingContext`.

---

## 🧩 Reusable Component Documentation

Here are a few of the key reusable components from the `/ui` directory:

| Component             | Props                      | Prop Types                   | Description                                         |
| --------------------- | -------------------------- | ---------------------------- | --------------------------------------------------- |
| **`<Button />`**      | `variant` `children`       | `string` `ReactNode`         | The primary button for form actions and navigation. |
| **`<StyledInput />`** | `label` `value` `onChange` | `string` `string` `function` | A styled text input with an associated label.       |
| **`<Card />`**        | `children`                 | `ReactNode`                  | A container component with padding and a shadow.    |

---

## 🚀 Getting Started

To get a local copy up and running, please follow these simple steps.

### Prerequisites

- Node.js (v20 or later)
- npm or pnpm

### Installation & Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/samirllama/bazaar.git
   cd bazaar
   ```

2. **Install Client Dependencies:**

   ```sh
   pnpm install
   ```

3. **Install Server Dependencies:**

   ```sh
   cd ../server
   pnpm install
   ```

### Running the Application

You will need to run both the client (Vite dev server) and the backend server concurrently.

1. **Run the Backend Server:**

   ```sh
   # From the /server directory
   pnpm run dev
   ```

   Your GraphQL server will be running at `http://localhost:4000`.

2. **Run the Client Application:**

   ```sh
   # From the /client directory
   pnpm run dev
   ```

   Your React application will be available at `http://localhost:5173`.
