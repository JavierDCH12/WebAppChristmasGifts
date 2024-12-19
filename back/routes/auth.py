
from fastapi import Depends, FastAPI, HTTPException, APIRouter
from models.user import User
from utils.memoryDb import users_db
router = APIRouter()

@router.post("/register")
async def register_user(user:User):
    if user.username in users_db:
        users_db[user.username] = user
        return {"message": "User registered successfully"}
    raise HTTPException(status_code=400, detail="Username already registered")



@router.post("/login")
async def login_user(username:str, passwd:str):
    user = users_db.get(username)
    if not user or user.password != passwd:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    return {"message": "Login successful"}
