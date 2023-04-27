from dataclasses import dataclass
from bffmodels import bffmodel

@bffmodel
@dataclass
class Log:
    username: str
    date: int
    message: str