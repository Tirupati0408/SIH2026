# Deployment

## Current scope

This repository is a demo, not an operational emergency-warning system. The
backend serves sample health and risk-zone data; the frontend does not consume
those API endpoints. Sensor readings, predictions, reports, analytics, and
dispatch actions are demo data or local simulations. There is no authentication,
database, image-analysis service, SMS gateway, or responder integration. Do not
use it to make real evacuation or emergency-response decisions.

## Hosting

- Host `frontend/` as a static site. Configure the static host's publish/root
  directory as `frontend`.
- Host the backend as a separate Node.js service. Use Node.js 18 or newer, set
  the working directory to the project root, and use `npm start` as the start
  command. The server listens on `0.0.0.0` and uses the `PORT` provided by the
  hosting service.
- The backend uses only Node.js built-in modules; no dependency installation
  or build step is required.
- Serve the frontend over HTTPS. Browser geolocation requires a secure context.
- The frontend loads Leaflet, Chart.js, Font Awesome, fonts, map tiles, sample
  images, and weather data from external services; those features require
  internet access and may be unavailable if a provider is down.

## Deploy the backend to Render

The repository includes a Render Blueprint in `render.yaml`. In Render, create
a new Blueprint from this repository and use the repository root as the service
root. The Blueprint installs the project dependencies, starts the API with
`npm start`, and checks `/api/health`.

Set `FRONTEND_ORIGIN` to the exact HTTPS origin of the deployed frontend (for
example, `https://your-site.example.com`) in the Blueprint setup or the
service's environment settings. Render supplies `PORT` automatically. After
deployment, check `https://<your-render-service>.onrender.com/api/health`.

## Deploy the frontend to Vercel

The root `vercel.json` configures Vercel to publish `frontend/`, where
`index.html` is located. Import the repository into Vercel and keep the project
Root Directory set to the repository root, then redeploy. The Node.js backend
is a separate service and is not deployed by this static frontend config.

## Backend environment

`backend/.env.example` documents the variables, but the application does not
load `.env` files itself. Set variables in the hosting provider's environment
configuration:

| Variable | Required | Description |
|---|---|---|
| `PORT` | Usually provided by the host | Integer port from 0 to 65535; defaults to `3000` for local use. |
| `FRONTEND_ORIGIN` | Recommended | Exact deployed frontend origin, such as `https://example.com`; defaults to `*` when unset. |

Do not commit production `.env` files or secrets. The API currently exposes:

- `GET /api/health`
- `GET /api/risk-zones`

The health endpoint is suitable for a basic hosting health check. This setup
only makes the existing demo deployable; real deployment requires implementing
and validating the missing storage, authentication, alerting, and data services.
