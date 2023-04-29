from fastapi import FastAPI, HTTPException, Header
from fastapi.responses import PlainTextResponse
from uvicorn import run
from bffmodels import render
from bffmodels.languages import TypeScript

from .auth import renew_token
from .users import validate_user, create_user, delete_user
from .logs import validate_log_request, list_logs, create_log, delete_log, delete_user_logs
from .models import *

app = FastAPI()


# Models API


@app.get("/models", response_class=PlainTextResponse)
def _list_models():
    return render(TypeScript)


# Authentication API


@app.post("/auth")
def _authenticate_user(user: User):

    if not validate_user(user):
        raise HTTPException(401, detail="Invalid credentials.")

    return renew_token(user)


# User API


@app.post("/users")
def _create_user(user: User):
    
    if not create_user(user):
        raise HTTPException(400, detail="Username is already taken.")


@app.delete("/users")
def _delete_user(username: str = Header(), password: str = Header()):
    
    user: User = User(username, password)

    if not validate_user(user):
        raise HTTPException(401, detail="Invalid credentials.")

    delete_user_logs(user)
    delete_user(user)


# Log API


@app.get("/logs")
def _list_logs(username: str = Header(), password: str = Header()):
    
    user: User = User(username, password)

    if not validate_user(user):
        raise HTTPException(401, detail="Invalid credentials.")

    return list_logs(user)


@app.post("/logs")
def _create_log(log: Log, username: str = Header(), password: str = Header()):
    
    user: User = User(username, password)

    if not validate_user(user):
        raise HTTPException(401, detail="Invalid credentials.")

    if not validate_log_request(log, user):
        raise HTTPException(400, detail="Log request username mismatch.")

    create_log(log)


@app.delete("/logs")
def _delete_log(log: Log, username: str = Header(), password: str = Header()):

    user: User = User(username, password)
    
    if not validate_user(user):
        raise HTTPException(401, detail="Invalid credentials.")

    if not validate_log_request(log, user):
        raise HTTPException(400, detail="Log request username mismatch.")

    delete_log(log)


def serve():
    run(app, host="0.0.0.0", port=8000)