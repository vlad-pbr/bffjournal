from typing import List

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


def delete_user(username: str) -> bool:

    # find full user object by username
    user_in_list: List[User] = [u for u in db.list(User) if u.username == username]
    if not user_in_list:
        return False

    return db.delete(user_in_list.pop())