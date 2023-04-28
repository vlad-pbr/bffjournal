from .consts import USERS_DB_PREFIX
from ..models import User
from ..db import db

def user_exists(user: User) -> bool:
    pass


def validate_user(user: User, username: str = None) -> bool:

    # if username is provided - validate
    if username is not None and username != user.username:
        return False

    # TODO validate username <-> password match

    return True