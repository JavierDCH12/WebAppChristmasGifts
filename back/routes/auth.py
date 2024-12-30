from fastapi import APIRouter
from models.user import User
from utils.memoryDb import users_db
from utils.validation import validate_existing_user_register, validate_existing_email_register, validate_password_register, \
    validate_existing_user_login, validate_existing_password_login
from utils.security import hash_password
from models.schemas import LoginRequest



auth_router = APIRouter()



@auth_router.post("/register")
async def register_user(user: User):
    validate_existing_user_register(user)
    validate_existing_email_register(user)
    validate_password_register(user)

    user.password = hash_password(user.password)

    users_db[user.username] = user
    return {"message": f"User '{user.username}' registered successfully"}


@auth_router.post("/login")
async def login_user(request: LoginRequest):
    validate_existing_user_login(request.username)
    validate_existing_password_login(request.username, request.passwd)

    return {"message": f"Welcome back, {request.username}!"}



@auth_router.get("/debug/users")
async def get_all_users():
    return users_db


