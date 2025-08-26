from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List
from uuid import UUID, uuid4

router = APIRouter()

class Task(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    title: str
    description: str = ""
    completed: bool = False

tasks_db: List[Task] = []

@router.get("/", response_model=List[Task])
def get_tasks():
    return tasks_db

@router.post("/", response_model=Task)
def create_task(task: Task):
    tasks_db.append(task)
    return task

@router.put("/{task_id}", response_model=Task)
def update_task(task_id: UUID, task: Task):
    for i, t in enumerate(tasks_db):
        if t.id == task_id:
            tasks_db[i] = task
            return task
    raise HTTPException(status_code=404, detail= "Task not found")

@router.delete("/{task_id}")
def delete_task(task_id: UUID):
    global tasks_db
    for t in tasks_db:
        if t.id == task_id:
            tasks_db = [x for x in tasks_db if x.id != task_id]
            return {"message": "Task deleted!"}
    raise HTTPException(status_code=404, detail="Task not found")

