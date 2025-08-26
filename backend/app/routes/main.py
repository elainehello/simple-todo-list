from fastapi import FastAPI
from app.routes import tasks

app = FastAPI(title="SimpleToDoList API")

app.include_router(tasks.router, prefix="/api/v1/tasks", tags=["tasks"])

@app.get("/")
def root():
    return {"message": "Welcome to SimpleToDo API!"}
