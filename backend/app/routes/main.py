from fastapi import FastAPI
from app.routes import tasks, users

app = FastAPI(title="SimpleToDoList API")

app.include_router(tasks.router, prefix="/api/v1/tasks", tags=["tasks"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])

@app.get("/")
def root():
    return {"message": "Welcome to SimpleToDo API!"}
