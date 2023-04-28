from fastapi import FastAPI, HTTPException
from uvicorn import run
from typing import Dict

from . import db

app = FastAPI()


# Data API


@app.get("/{prefix}")
def get_data(prefix: str):
    return db.get(prefix)


@app.post("/{prefix}")
def set_data(prefix: str, data: Dict):
    db.set(prefix, data)


def serve():
    run(app, host="0.0.0.0", port=9000)