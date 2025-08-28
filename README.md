# Simple ToDo List

A full-stack ToDo application built with FastAPI (Python) for the backend and React (JSX) for the frontend.

---

## Backend

### Features

- User registration and login with JWT authentication
- Unique email and username validation
- Secure password hashing (bcrypt)
- CRUD operations for tasks
- PostgreSQL database with SQLAlchemy ORM
- Alembic migrations for schema changes

### Project Structure

```
backend/
  app/
    core/         # Database, config, and initialization
    models/       # SQLAlchemy ORM models (User, Task)
    routes/       # FastAPI routes (users, tasks)
    schemas/      # Pydantic schemas for validation/serialization
    services/     # Business logic (user/task services)
    utils/        # Security utilities (hashing, JWT)
  alembic/        # Database migrations
  requirements.txt
  alembic.ini
```

### Running the Backend

1. **Install dependencies:**
    ```bash
    python3.11 -m venv .venv
    source .venv/bin/activate
    cd backend
    pip install -r requirements.txt
    ```

2. **Configure environment:**
    - Copy `.env` and set your DB credentials and secret key.

3. **Initialize the database:**
    ```bash
    python -m app.core.init_db
    ```

4. **Run the API server:**
    ```bash
    uvicorn app.routes.main:app --reload
    ```

### API Endpoints

- `POST /api/v1/users/register` — Register a new user (unique email & username required)
- `POST /api/v1/users/login` — Login and receive JWT token
- `GET /api/v1/tasks/` — List all tasks (expand for user-specific logic)
- `POST /api/v1/tasks/` — Create a new task
- `PUT /api/v1/tasks/{task_id}` — Update a task
- `DELETE /api/v1/tasks/{task_id}` — Delete a task

---

## Next Steps

- Frontend development with React/JSX
- Connect frontend to backend API
- Add authentication and task management UI

---

## Notes

- See [`notes.txt`](notes.txt) for quick backend commands.
- Use pgAdmin or psql to inspect your PostgreSQL database.

---