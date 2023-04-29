from dataclasses import dataclass
from bffmodels import bffmodel

from .model import Model

@bffmodel
@dataclass
class Token(Model):
    value: str
    expiration: int