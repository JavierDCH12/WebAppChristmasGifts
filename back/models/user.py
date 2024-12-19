from pydantic import BaseModel, Field

class User(BaseModel):
    username: str =Field(..., min_length=5, max_length=50)
    password: str =Field(..., min_length=5, max_length=50)
    email: str =Field(..., min_length=12, max_length=50)
