from typing import List

from ..models import User, Log
from .. import db


def validate_log_request(log: Log, user: User) -> bool:
    return user.username == log.username


def list_logs(user: User) -> List[Log]:
    return [l for l in db.list(Log) if l.username == user.username]


def create_log(log: Log) -> None:
    db.create(log)


def delete_log(log: Log) -> bool:
    return db.delete(log)


def delete_user_logs(user: User) -> None:
    for log in list_logs(user):
        db.delete(log)