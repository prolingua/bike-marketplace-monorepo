# 🚲 AI-Powered Bicycle Marketplace

This monorepo hosts a full-stack application for browsing and searching bike listings using natural language. It integrates a React + Vite frontend, an Express backend with Swagger documentation, and optional LLM-powered search parsing via OpenAI.

---

## 📁 Folder Structure
.
├── .DS_Store
├── .gitignore
├── .turbo
│   ├── cache
│   ├── cookies
│   │   ├── 1.cookie
│   │   └── 2.cookie
│   └── daemon
│       └── df967e3ab05563f8-turbo.log.2025-09-20
├── apps
│   ├── .DS_Store
│   ├── backend
│   │   ├── .env
│   │   ├── .env_sample
│   │   ├── lib
│   │   │   └── llmSearchParser.ts
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── index.ts
│   │   │   └── routes
│   │   │       └── listings.ts
│   │   ├── swagger.ts
│   │   ├── tsconfig.json
│   │   └── types
│   │       └── swagger-jsdoc.d.ts
│   └── frontend
│       ├── .DS_Store
│       ├── index.html
│       ├── package.json
│       ├── public
│       │   ├── bike1.jpg
│       │   └── vite.svg
│       ├── src
│       │   ├── App.tsx
│       │   ├── components
│       │   │   └── ListingCard.tsx
│       │   ├── main.tsx
│       │   ├── style.css
│       │   ├── typescript.svg
│       │   └── vite-env.d.ts
│       └── tsconfig.json
├── package.json
├── packages
│   └── shared
│       ├── package.json
│       ├── src
│       │   └── types.ts
│       └── tsconfig.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── turbo.json


---

## 🚀 Getting Started

### 1. Install dependencies

```bash
pnpm install

### 2. Set up environment variables
Create a .env file in apps/backend/ based on .env.example:
cp apps/backend/.env.example apps/backend/.env

Then fill in your OpenAI API key and toggle LLM usage:
OPENAI_API_KEY=your-key-here
USE_LLM=true
PORT=3000

Set USE_LLM=false to disable LLM parsing and use mock filters.

### 3. Run the backend
pnpm --filter backend dev
Swagger UI: http://localhost:3000/api-docs

Listings endpoint: /listings?page=1&limit=5&search=...

### 4. Run the frontend
pnpm --filter frontend dev

🧠 LLM Search Parsing
When USE_LLM=true, the backend uses OpenAI to parse natural language queries like:

“Electric bikes under £500 for commuting”

“Trek gravel bikes from 2022”

“Hybrid bikes for weekend trail rides”

Parsed filters are applied server-side for intelligent search.

📚 API Documentation
Swagger is auto-generated from JSDoc comments in apps/backend/src/routes/listings.ts.

Visit: http://localhost:3000/api-docs

🛡 Security & Best Practices
.env is ignored via root .gitignore

.env.example documents required keys

Shared types ensure type safety across the stack

LLM fallback logic prevents crashes if API fails

🧪 Testing & Deployment
Coming soon: CI/CD via Turbo, backend unit tests, and deployment scripts.

👥 Contributors
Built by Iwan Effendi with a focus on intelligent UX, modular architecture, and developer transparency.

📄 License
MIT