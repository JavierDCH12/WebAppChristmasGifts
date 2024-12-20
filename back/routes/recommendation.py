from fastapi import APIRouter, HTTPException
from utils.services import fetch_books

recommendation_router = APIRouter()

@recommendation_router.get("/recommendations/books", tags=["Recommendations"])
async def get_books_recommendations():
    """
    Devuelve recomendaciones de libros desde la Google Books API.
    """
    try:
        recommendations = await fetch_books()
        return {"category": "book", "recommendations": recommendations}
    except Exception as e:
        return {"error": str(e)}

        #raise HTTPException(status_code=500, detail=str(e))
