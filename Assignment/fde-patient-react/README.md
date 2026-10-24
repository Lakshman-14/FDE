# CareQueue React patient app

A React + TypeScript client for the Diabetes Readmission Intervention FastAPI project.
It searches encounters by patient number and risk level and displays encounter risk,
intervention status, and historical readmission outcome.

## Run locally

Start the FastAPI backend from `diabetes-readmission-intervention`:

```bash
../.venv/bin/uvicorn app.main:app --reload
```

Then start this app in another terminal:

```bash
cd Assignment/fde-patient-react
npm install --legacy-peer-deps
npm run dev
```

Open <http://localhost:5173>. The frontend calls
`http://127.0.0.1:8000/patients/search` by default. Set
`VITE_API_BASE_URL` in a local `.env` file to use a different API origin.
The backend must allow the frontend origin through `CORS_ORIGINS`.

Run `npm run build` to type-check and create a production build, and `npm run lint`
to lint the source.
