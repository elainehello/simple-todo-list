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

## Frontend

### Features

- React + Vite for fast development
- Authentication with JWT (login/register)
- Protected routes with React Router
- Task CRUD (create, read, update, delete)
- Responsive UI with Tailwind CSS
- Modular components (`Navbar`, `Terminal`, `TaskItem`, etc.)
- WebTUI terminal integration

### Project Structure

```
frontend/
  src/
    components/      # Reusable UI components (Navbar, Terminal, TaskItem, etc.)
    context/         # Auth context/provider
    pages/           # Page components (Login, Register, Dashboard)
    services/        # API calls (api.js)
    App.jsx          # Main app and routes
    main.jsx         # Entry point
    index.css        # Global styles (Tailwind)
  index.html         # HTML template (includes WebTUI)
  package.json
  tailwind.config.js
  ...
```

### Running the Frontend

1. **Install dependencies:**

   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open [http://localhost:5173](http://localhost:5173) in your browser.**

### Notes

- The frontend expects the backend API to be running at `http://127.0.0.1:8000/api/v1` (see `src/services/api.js`).
- The WebTUI terminal is included via CDN in `index.html` and mounted in the `Terminal` component.
- See [`notes.txt`](frontend/notes.txt) for useful scripts and tips.

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
