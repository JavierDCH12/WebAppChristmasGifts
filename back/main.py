from fastapi import FastAPI
from routes.auth import auth_router
from routes.recommendation import recommendation_router

app = FastAPI()

app.include_router(recommendation_router, prefix="/api", tags=["recommendations"])

app.include_router(auth_router, prefix="/auth", tags=["auth"])

for route in app.routes:
    print(f"Path: {route.path}, Name: {route.name}, Methods: {route.methods}")
@app.get("/")
def root():
    return {"message": "Hello FastAPI!"}
