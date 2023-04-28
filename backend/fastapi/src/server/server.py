from fastapi import FastAPI, HTTPException
from uvicorn import run
from bffmodels import render
from bffmodels.languages import TypeScript

from .users import validate_user, create_user, delete_user
from .logs import validate_log_request, list_logs, create_log, delete_log, delete_user_logs
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

    delete_user_logs(user)
    delete_user(user)


# Log API


@app.put("/logs")
def _list_logs(user: User):
    
    if not validate_user(user):
        raise HTTPException(401, detail="Invalid credentials.")

    return list_logs(user)


@app.post("/logs")
def _create_log(log_request: LogRequest):
    
    if not validate_user(log_request.user):
        raise HTTPException(401, detail="Invalid credentials.")

    if not validate_log_request(log_request):
        raise HTTPException(400, detail=f"Log request username mismatch: '{log_request.user.username}' != '{log_request.log.username}'.")

    create_log(log_request.log)


@app.delete("/logs")
def _delete_log(log_request: LogRequest):
    
    if not validate_user(log_request.user):
        raise HTTPException(401, detail="Invalid credentials.")

    if not validate_log_request(log_request):
        raise HTTPException(400, detail=f"Log request username mismatch: '{log_request.user.username}' != '{log_request.log.username}'.")

    delete_log(log_request.log)


def serve():
    run(app, host="0.0.0.0", port=8000)