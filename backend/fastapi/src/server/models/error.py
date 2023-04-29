from dataclasses import dataclass
from bffmodels import bffmodel

from .model import Model


@bffmodel
@dataclass
class Error(Model):
    detail: str