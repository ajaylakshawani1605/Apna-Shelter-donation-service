# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/5d1c3b13-6c64-4209-8368-757ba73358b0

# ApparelCycle Hub

This repository contains a Vite + React frontend and an Express backend that serves API endpoints for donations.

## Run locally

1. Install dependencies

```powershell
npm install
```

2. Create a `.env` file in the project root (see `.env.example`) and set:

```
MONGODB_URI=mongodb://127.0.0.1:27017/apparelcycle
EMAIL_USER=youremail@example.com
EMAIL_PASS=your-email-password
JWT_SECRET=some-secret
```

3. Start backend and frontend (two terminals):

```powershell
# terminal 1 - backend
npm run start

# terminal 2 - frontend
npm run dev
```

Open the app at `http://localhost:5174` (Vite may choose a different port if 5173 is in use).

## Build and serve production

```powershell
npm run build
NODE_ENV=production npm run start
```

This will build the frontend into `dist` and the backend will serve it when `NODE_ENV=production`.

## Docker

Build and run:

```powershell
docker build -t apparelcycle:latest .
docker run -p 5000:5000 --env-file .env apparelcycle:latest
```

## Deploy

See `.github/workflows/ci-deploy.yml` for a CI example that builds the app on push to `main`. Add deployment steps to the `deploy` job based on your host (Render, DigitalOcean App Platform, VPS, etc.).

### Quick deploy options

- Render: create a Web Service, set build command `npm run build` and start command `NODE_ENV=production node server.cjs`. Add environment variables in Render UI.
- Vercel: typically serves frontend only; to serve backend you can deploy backend separately (e.g., Render) and set API URL in frontend env.
- Docker/VPS: build the Docker image and run as shown above.

If you want, I can initialize a Git repo for you, create a remote GitHub repository, push the code, and (optionally) set up a simple Render or GitHub Actions deployment. Tell me which hosting provider you'd like (Render, Vercel, DigitalOcean App Platform, or a VPS) and whether you want me to create the GitHub repo and push (I'll need a GitHub access token if you want me to create the remote and push automatically).
Yes it is!
