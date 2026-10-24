# FDE Projects

This repository contains hands-on projects and exercises from my TestLeaf
Full-Stack Data Engineering (FDE) learning track. The main project is a
Diabetes Readmission Intervention Queue: a FastAPI and PostgreSQL application
that turns historical diabetes encounters into an explainable care-management
review queue.

> **Educational prototype only.** The risk rules are illustrative, have not
> been clinically validated, and must not be used to make patient-care
> decisions.

## Featured project: Diabetes Readmission Intervention Queue

The project explores how a care-management team could prioritize diabetes
encounters for follow-up when review capacity is limited. It provides a small
web application and REST API to add and search encounters, review risk groups,
track interventions, and compare risk groups with historical readmission
outcomes.

### Features

- Rule-based, explainable risk scores with LOW, MEDIUM, and HIGH categories.
- Automatic `PENDING_REVIEW` intervention creation for MEDIUM- and HIGH-risk
  encounters.
- Patient search by patient number, risk score, and risk level.
- Care queue, intervention assignment and status updates, and status-change
  history.
- Operational summary, management dashboard, and retrospective readmission
  analysis.
- FastAPI Swagger documentation and a single-page HTML interface.

The historical `readmitted` outcome is deliberately excluded from risk
scoring. It is only used after scoring for retrospective comparisons; different
readmission rates do not demonstrate clinical predictive validity.

### Illustrative risk rules

| Signal | Points |
|---|---:|
| 3 or more prior inpatient visits | +3 |
| 2 or more emergency visits | +2 |
| 3 or more outpatient visits | +1 |
| Hospital stay of 7 or more days | +1 |
| 20 or more medications | +1 |

Scores 0-2 are LOW, 3-4 MEDIUM, and 5 or more HIGH. MEDIUM and HIGH encounters
enter the care queue.

### Technology and architecture

- **Backend:** Python, FastAPI, Pydantic
- **Database:** PostgreSQL with parameterized SQL via Psycopg
- **Frontend:** HTML, CSS, and JavaScript
- **Testing:** pytest and FastAPI TestClient

```text
diabetic_data.csv -> importer -> PostgreSQL
                         FastAPI <- repository <- PostgreSQL
                            |
                     HTML app / REST API
```

See the [project README](./diabetes-readmission-intervention/README.md) for
the full API reference, risk-rule notes, architecture, and setup details.

### Run locally

Prerequisites: Python 3.10+ and a running PostgreSQL instance. The dataset CSV
is not included in this repository; obtain the assignment dataset and place it
at `diabetes-readmission-intervention/data/diabetic_data.csv`.

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

cp .env.example diabetes-readmission-intervention/.env
createdb fde_db
cd diabetes-readmission-intervention
psql -d fde_db -f sql/01_create_schema.sql
psql -d fde_db -f sql/02_seed_intervention_statuses.sql
psql -d fde_db -f sql/04_create_intervention_history.sql
. ../.venv/bin/activate
python scripts/verify_setup.py
python scripts/import_diabetes_data.py
uvicorn app.main:app --reload
```

Open the app at <http://127.0.0.1:8000/> or the interactive API docs at
<http://127.0.0.1:8000/docs>. To run the tests:

```bash
python -m pytest
```

Machine-specific `.env` files, virtual environments, caches, and dataset CSV
files are excluded from Git. Adjust `DATABASE_URL` in your local `.env` if your
PostgreSQL authentication differs from the local defaults.

## Other coursework

- [Python fundamentals](./python-fundamentals_day1/)
- [Python data processing](./python-data-processing_day3/)
- [PostgreSQL database exercises](./postgresql-database_day4/)
- [FastAPI in-memory exercises](./fastapi_in_memory_day2/)
- [TypeScript fundamentals](./typescript-fundamentals_day5/)
- [SQL scripts](./sql/)
