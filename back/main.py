from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from routes.auth import auth_router
from routes.book_search import book_search_router
from routes.game_search import game_search_router

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"], #ALLOW CONNNECTION FROM FRONTEND
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(auth_router, prefix="/auth")

app.include_router(book_search_router, prefix="/api/search")
app.include_router(game_search_router, prefix="/api/search")


for route in app.routes:
    print(f"Path: {route.path}, Name: {route.name}, Methods: {route.methods}")
@app.get("/")
def root():
    return {"message": "Hello FastAPI!"}
