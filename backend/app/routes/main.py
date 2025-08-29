from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import tasks, users

app = FastAPI(title="SimpleToDoList API")

# Add CORS middleware here
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router, prefix="/api/v1/tasks", tags=["tasks"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])

@app.get("/")
def root():
    return {"message": "Welcome to SimpleToDo API!"}
