from typing import List, Dict, TypeVar, Type
from dataclasses import asdict

from ..models import Model

M = TypeVar('M', bound=Model)
_db: Dict[Type[M], List[Dict]] = {}


def get(type: Type[M]) -> List[M]:
    return [type(**item) for item in _db.get(type, [])]


def set(data: M) -> None:
    _db[data.__class__] = get(data.__class__) + [asdict(data)]


def delete(data: M) -> bool:
    db_data = get(data.__class__)

    try:
        db_data.remove(data)
    except ValueError:
        return False

    _db[data.__class__] = db_data

    return True