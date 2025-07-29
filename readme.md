# Image Microservice Challenge

This application can be run in two ways: **containerized** or **non-containerized**.

### Prerequisites

#### For Containerized Setup

- Docker
- Docker Compose

#### For Non-Containerized Setup

- Node.js v22.17.1 (use `nvm use` if you have nvm installed to use the nvmrc file)
- npm v10.9.2

### Quickstart

Clone repo:

```bash
git clone https://github.com/jonasnoll/image-challenge.git
cd image-challenge
```

## Containerized Setup

1. Start the application:

   ```bash
   docker compose up --build
   ```

2. Access the application:
   - Frontend: http://localhost:5100
   - Backend API: http://localhost:3030

Database is mounted via volume. To stop and remove all data (including the database):

```bash
docker compose down -v
```

## Non-Containerized Setup

1. Install dependencies and start the application from project root:

   ```bash
   npm install            # installs both image service and ui
   npm run build          # compiles whole monorepo
   npm run start          # starts image service and ui
   ```

2. Access the application:
   - Frontend: http://localhost:4173 (Vite preview server)
   - Backend API: http://localhost:3030

Press `Ctrl+C` in the terminal where you ran `npm run start` to stop both services.

## Automated Testing

Use Vitest for automated tests on the backend service.

```bash
cd appbackend
npm run test
```

## Stack

- **Backend**: Node.js + TypeScript API with Express
- **Database**: SQLite database with persistent storage
- **UI**: React + TypeScript + Vite application
