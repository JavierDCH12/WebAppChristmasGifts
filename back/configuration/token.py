from datetime import timedelta, datetime
from jose import jwt
from configuration.config import Config


def create_access_token(data:dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=Config.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, Config.SECRET_JWT_KEY, algorithm=Config.ALGORITHM)