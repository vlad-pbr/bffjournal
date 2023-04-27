from dataclasses import dataclass
from bffmodels import bffmodel

@bffmodel
@dataclass
class User:
    username: str
    password: str