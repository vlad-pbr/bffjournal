from dataclasses import dataclass
from bffmodels import bffmodel

from .user import User
from .log import Log

@bffmodel
@dataclass
class LogRequest:
    user: User
    log: Log