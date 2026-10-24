# FDE Coursework

This repository contains the FDE exercises and the Diabetes Readmission Intervention Queue project.

## Projects

- [Python fundamentals](./python-fundamentals_day1/)
- [Python data processing](./python-data-processing_day3/)
- [PostgreSQL database exercises](./postgresql-database_day4/)
- [FastAPI in-memory exercises](./fastapi_in_memory_day2/)
- [TypeScript fundamentals](./typescript-fundamentals_day5/)
- [SQL scripts](./sql/)
- [Diabetes Readmission Intervention Queue](./diabetes-readmission-intervention/)

## Python environment

Create a local environment and install the shared dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Keep machine-specific settings in `.env`; it is intentionally excluded from Git. Use `.env.example` as a safe starting point.
