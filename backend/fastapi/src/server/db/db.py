import requests
from typing import List, Dict

from .consts import DB_HOST


def _format_db_url(prefix: str) -> str:
    return f"{DB_HOST}/{prefix}"


def get(prefix: str) -> List:
    return requests.get(_format_db_url(prefix)).json()


def set(prefix: str, data: Dict) -> None:
    requests.post(_format_db_url(prefix), data=data)