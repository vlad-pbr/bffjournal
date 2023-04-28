from json import loads, dumps
from typing import Dict, List

from .consts import DB_FILE


def _read_db() -> Dict:

    with open(DB_FILE, "r") as db:
        return loads(db.read())


def _write_db(db_data: Dict) -> None:

    with open(DB_FILE, "w") as db:
        db.write(dumps(db_data))


def get(prefix: str) -> List:
    return _read_db().get(prefix, [])


def set(prefix: str, data: Dict):

    db: Dict = _read_db()

    prefix_data = db.get(prefix, [])

    prefix_data.append(data)

    db[prefix] = prefix_data

    _write_db(db)


