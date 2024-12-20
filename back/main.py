from fastapi import FastAPI
from routes.auth import auth_router
from routes.book_recommendation import book_recommendation_router
from routes.game_recommendations import game_recommendation_router

app = FastAPI()

app.include_router(game_recommendation_router, prefix="/api", )
app.include_router(book_recommendation_router, prefix="/api")
app.include_router(auth_router, prefix="/auth")

for route in app.routes:
    print(f"Path: {route.path}, Name: {route.name}, Methods: {route.methods}")
@app.get("/")
def root():
    return {"message": "Hello FastAPI!"}
