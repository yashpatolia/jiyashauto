# Jiyash Auto

Full-stack car dealership website for [Jiyash Auto](https://jiyashauto.com), Cambridge, ON.

Built with SvelteKit 5, Tailwind CSS v4, and SQLite — containerized with Docker and deployed to a VPS via GitHub Actions.

## Tech Stack

- **SvelteKit 2** + Svelte 5 (runes mode)
- **Tailwind CSS v4**
- **better-sqlite3** — SQLite database
- **adapter-node** — Node.js production server
- **Docker** + Docker Compose
- **GitHub Actions** — CI/CD to VPS on push to `master`

## Features

- Public inventory listing with filters (make, price, year, body type)
- Vehicle detail pages with image lightbox gallery
- Contact form with inquiry tracking
- Admin panel — add/edit/delete vehicles, manage submissions, toggle visibility/sold status
- Image uploads (admin-only)
- HMAC-signed session auth

## Local Development

```bash
cp .env.example .env   # fill in ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_SECRET
npm install
npm run dev
```

## Running with Docker

```bash
cp .env.example .env   # fill in credentials
docker compose up --build
```

App runs at `http://localhost:3000`. The SQLite database and uploaded images are persisted in named Docker volumes across restarts.

## Deployment

Pushing to `master` triggers a GitHub Actions workflow that SSHes into the VPS and runs `deploy.sh`, which pulls the latest code and rebuilds the Docker container.

**One-time VPS setup:**
1. Install Docker (`curl -fsSL https://get.docker.com | sh`)
2. Copy `.env` to the server (`scp .env user@host:~/jiyashauto/.env`)
3. Add GitHub secrets: `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`, `VPS_PORT`

## Environment Variables

| Variable | Description |
|---|---|
| `ADMIN_USERNAME` | Admin login username |
| `ADMIN_PASSWORD` | Admin login password |
| `ADMIN_SECRET` | Secret key for HMAC session signing |
