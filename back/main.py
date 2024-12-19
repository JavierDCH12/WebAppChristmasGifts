from fastapi import FastAPI
from routes.auth import router as auth_router
from routes.recommendation import recommendation_router


app = FastAPI()

app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(recommendation_router, prefix="/api", tags=["recommendations"])

print([route.path for route in app.routes])

@app.get("/")
def root():
    return {"message": "Hello FastAPI!"}
