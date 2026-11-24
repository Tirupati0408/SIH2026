# SIH2026 - ResiliNER

ResiliNER is a landslide early-warning and disaster-response command platform for India's North Eastern Region.

## Project Structure

- `frontend/` - GIS, AI simulator, field reports, triage, broadcasting, and analytics UI.
- `backend/` - API server and backend source modules.
- `data/` - Sensor, citizen-report, and risk-zone datasets.
- `assets/` - Shared images and static project resources.
- `docs/` - Architecture, API, and deployment documentation.
- `scripts/` - Operational and data-processing utilities.
- `tests/` - End-to-end and integration tests.

## Run the Frontend

Open `frontend/index.html` directly, or serve the project:

```powershell
python -m http.server 8080 --directory frontend
```

Then open `http://localhost:8080`.

## Run the Backend

```powershell
npm start
```

The default API URL is `http://localhost:3000`.

## Deployment

See [deployment guide](docs/deployment.md) for environment variables, hosting
requirements, API endpoints, and the current prototype limitations.
