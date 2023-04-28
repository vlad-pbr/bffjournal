from fastapi import FastAPI, HTTPException
from uvicorn import run
from bffmodels import render
from bffmodels.languages import TypeScript

from .users import validate_user, create_user, delete_user
from .models import *

app = FastAPI()


# Models API


@app.get("/models")
def _list_models():
    return render(TypeScript)


# User API


@app.post("/users")
def _create_user(user: User):
    
    if not create_user(user):
        raise HTTPException(400, detail=f"Username '{user.username}' is already taken.")


@app.delete("/users")
def _delete_user(user: User):
    
    if not validate_user(user):
        raise HTTPException(401, detail="Invalid credentials.")

    delete_user(user)


# Log API


@app.get("/users/{username}/logs")
def list_logs(username: str, user: User):
    raise HTTPException(501)


@app.post("/users/{username}/logs")
def create_log(username: str, log_request: LogRequest):
    raise HTTPException(501)


@app.delete("/users/{username}/logs")
def delete_log(username: str, log_request: LogRequest):
    raise HTTPException(501)


def serve():
    run(app, host="0.0.0.0", port=8000)