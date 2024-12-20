from fastapi import HTTPException
from models.user import User
from utils.security import *


from utils.memoryDb import users_db



def validate_existing_user_register(user:User):
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="Username already registered")


def validate_existing_email_register(user:User):
    for existing_user in users_db.values():
        if existing_user.email == user.email:
            raise HTTPException(status_code=400, detail="Email already registered")

def validate_password_register(user:User):
    if len(user.password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters")




###############
def validate_existing_user_login(username: str):
    if username not in users_db:
        raise HTTPException(status_code=404, detail="User not found")


def validate_existing_password_login(username: str, password: str):
    user = users_db[username]
    if not verify_password(password, user.password):
        raise HTTPException(status_code=400, detail="Password does not match")
