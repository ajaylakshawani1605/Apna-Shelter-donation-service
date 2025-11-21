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

## Automation scripts

Two helper scripts are included in `scripts/` to automate creating a GitHub repo and creating a Render service. They are intended to be run locally and read API keys from environment variables (so you don't paste secrets into chat).

1) Create GitHub repo and push (PowerShell)

Set `GITHUB_TOKEN` in your environment (PAT with repo scope) and run:

```powershell
cd <project-root>
$env:GITHUB_TOKEN = "ghp_..." # set temporarily in the terminal
.
\scripts\create-github-repo.ps1 -RepoName "apparelcycle-hub" -Visibility "private" -Description "ApparelCycle Hub"
```

This script will create the repo under your account, add the `origin` remote and push `main`.

2) Create Render service (PowerShell)

Set `RENDER_API_KEY` in your environment and run:

```powershell
$env:RENDER_API_KEY = "render_..."
.
\scripts\deploy-to-render.ps1 -ServiceName "apparelcycle-hub" -RepoFullName "<owner>/<repo>" -Branch "main"
```

Note: Render's API can require additional fields depending on your account. If the script fails, use the Render Dashboard UI to connect GitHub and create a Web Service with the build and start commands below.

Add required environment variables to Render:

- MONGODB_URI
- EMAIL_USER
- EMAIL_PASS
- JWT_SECRET

Yes it is!
