from fastapi import APIRouter, HTTPException
from models.user import User
from utils.memoryDb import users_db
from utils.validation import validate_existing_userRegister, validate_existing_emailRegister, validate_passwordRegister, \
    validate_existing_userLogin, validate_existing_passwordLogin
from utils.security import hash_password



router = APIRouter()


@router.post("/register")
async def register_user(user: User):
    validate_existing_userRegister(user)
    validate_existing_emailRegister(user)
    validate_passwordRegister(user)

    user.password = hash_password(user.password)

    users_db[user.username] = user
    return {"message": f"User '{user.username}' registered successfully"}


@router.post("/login")
async def login_user(username: str, passwd: str):
    validate_existing_userLogin(username)
    validate_existing_passwordLogin(username, passwd)

    return {"message": f"Welcome back, {username}!"}


@router.get("/debug/users")
async def get_all_users():
    return users_db


