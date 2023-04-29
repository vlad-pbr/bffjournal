from ..models import User
from .. import db


def validate_user(user: User) -> bool:
    return user in db.list(User)


def create_user(user: User) -> bool:

    # make sure no duplicate usernames
    if user.username in [u.username for u in db.list(User)]:
        return False

    db.create(user)
    return True


def delete_user(user: User) -> bool:
    return db.delete(user)