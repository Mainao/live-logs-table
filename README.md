# Live Logs Table

A real-time log monitoring dashboard built with React and Server-Sent Events (SSE). Logs stream from an Express backend and render in a virtualized table on the frontend.

## Tech Stack

**Frontend:** React 19, TypeScript, Tailwind CSS v4, react-virtuoso, Vite

**Backend:** Express 5, Node.js

**Infra:** Docker, GitHub Actions, GHCR

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install dependencies

```sh
cd backend && npm install
cd ../frontend && npm install
```

### Set up environment

**backend/.env**

```
PORT=4000
FRONTEND_URL=http://localhost:3000
```

**frontend/.env.local**

```
VITE_SSE_URL=http://localhost:4000/logs
```

### Run locally

Start the backend:

```sh
cd backend && npm run dev
```

Start the frontend (in a separate terminal):

```sh
cd frontend && npm run dev
```

Backend runs on `http://localhost:4000`, frontend on `http://localhost:5173`.

### Run with Docker

```sh
docker compose up --build
```

Backend on `http://localhost:4000`, frontend on `http://localhost:3000`.

Stop with:

```sh
docker compose down
```

## Project Structure

```
├── backend/
│   ├── server.js          # Express SSE server
│   ├── Dockerfile
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── app/           # App root and layout
│   │   ├── components/    # Shared UI components
│   │   ├── features/
│   │   │   └── logs/
│   │   │       ├── components/LogsTable.tsx
│   │   │       ├── hooks/useSSELogs.ts
│   │   │       └── types/log.types.ts
│   │   └── styles/
│   ├── Dockerfile
│   └── .env.local
├── docker-compose.yml
└── .github/workflows/docker.yml
```

## CI/CD

GitHub Actions workflow (`.github/workflows/docker.yml`):

- **Pull requests:** Runs lint and type-check on the frontend
- **Push to main:** Builds and pushes Docker images to GitHub Container Registry (GHCR)

Set `VITE_SSE_URL` as a repository variable in GitHub Actions settings for the frontend Docker build.
