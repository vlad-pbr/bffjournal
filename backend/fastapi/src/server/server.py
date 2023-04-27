from fastapi import FastAPI
from uvicorn import run
from bffmodels import render
from bffmodels.languages import TypeScript

from .models import *

app = FastAPI()


@app.get("/models")
def models():
    return render(TypeScript)


def serve():
    run(app)