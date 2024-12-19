from fastapi import APIRouter, HTTPException
from utils.services import fetch_books

router = APIRouter()

@router.get("/recommendations/books")
async def get_books_recommendations():
    """
    Devuelve recomendaciones de libros desde la Google Books API.
    """
    try:
        recommendations = await fetch_books()
        return {"category": "book", "recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
