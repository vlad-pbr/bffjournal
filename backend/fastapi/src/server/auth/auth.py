from typing import Dict
from random import choice
from string import ascii_letters
from datetime import datetime, timedelta
from dataclasses import asdict

from ..models import User, Token

_tokens: Dict[str, Dict] = {}


def _generate_token() -> str:
    return ''.join([choice(ascii_letters) for _ in range(255)])


def renew_token(user: User) -> Token:

    _tokens[user.username] = asdict(Token(
        value=_generate_token(),
        expiration=int((datetime.now() + timedelta(minutes=10)).timestamp())
    ))

    return Token(**_tokens[user.username])


