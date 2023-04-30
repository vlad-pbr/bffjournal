from typing import List

from ..models import User, Log
from .. import db


def validate_log_request(log: Log, username: str) -> bool:
    return username == log.username


def list_logs(username: str) -> List[Log]:
    return [l for l in db.list(Log) if l.username == username]


def create_log(log: Log) -> None:
    db.create(log)


def delete_log(log: Log) -> bool:
    return db.delete(log)


def delete_user_logs(username: str) -> None:
    for log in list_logs(username):
        db.delete(log)