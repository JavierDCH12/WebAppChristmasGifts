from dotenv import load_dotenv

import os
import secrets
def generate_secret_key():
    return secrets.token_hex(32)

load_dotenv(

)

class Config:
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    RAWG_API_KEY = os.getenv("RAWG_API_KEY")
    SECRET_JWT_KEY=generate_secret_key()
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 15
