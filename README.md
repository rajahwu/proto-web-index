# Proto Web Index App

A prototype web application built to test and validate a modern, high-performance React stack before integration into the `systems/_index/web` monorepo.

## 🚀 Tech Stack

This project leverages a bleeding-edge, highly optimized stack:
- **Framework:** React 19 + Vite + SWC
- **Routing:** React Router 7 (utilizing the Data Loader pattern)
- **Server State:** React Query (v5)
- **Client State:** Redux Toolkit
- **Styling:** Tailwind CSS 4 + Shadcn UI
- **Backend/BaaS:** Supabase
- **Custom Packages:** `@clearline7` ecosystem
- **Testing & Docs:** Storybook 10, Vitest, Playwright, TypeDoc

## 🏗️ Architecture & Folder Structure

The project is structured to seamlessly drop into the `systems` monorepo structure:

```text
src/
├── app/                  # App-wide configuration (Providers, Router, Store, Supabase clients)
├── features/             # Feature-based modules (e.g., Index, Auth)
│   └── index/            # Contains components, loaders, slices, and routes for a specific feature
├── shared/               # Shared UI (Shadcn), Utils, and Hooks
└── main.tsx              # Application entry point