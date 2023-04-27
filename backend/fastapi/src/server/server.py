from fastapi import FastAPI
from uvicorn import run
from bffmodels import render
from bffmodels.translators.languages import TypeScriptTranslator

from .models import *

app = FastAPI()


@app.get("/models")
def models():
    return render(TypeScriptTranslator)


def serve():
    run(app)