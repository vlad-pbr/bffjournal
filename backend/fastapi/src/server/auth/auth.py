from typing import Dict, Optional
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


def token_to_username(token_value: str) -> Optional[str]: 

    # find token which matches the value
    token_in_list = [Token(**t) for t in list(_tokens.values()) if Token(**t).value == token_value]
    if not token_in_list:
        return None

    # check token expiration
    token = token_in_list.pop()
    if token.expiration < int(datetime.now().timestamp()):
        return None
    
    return list(_tokens.keys())[list(_tokens.values()).index(asdict(token))]


def revoke_token(username: str) -> None:
    if username in _tokens:
        del _tokens[username]
