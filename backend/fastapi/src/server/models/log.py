from dataclasses import dataclass
from bffmodels import bffmodel

from .model import Model


@bffmodel
@dataclass
class Log(Model):
    username: str
    date: int
    message: str