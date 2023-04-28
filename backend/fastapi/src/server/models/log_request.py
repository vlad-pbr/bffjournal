from dataclasses import dataclass
from bffmodels import bffmodel

from .model import Model
from .user import User
from .log import Log


@bffmodel
@dataclass
class LogRequest(Model):
    user: User
    log: Log