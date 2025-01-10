from fastapi import APIRouter, HTTPException, Query
from services.book_search_service import search_books_service

# Crear un enrutador para la búsqueda de libros
book_search_router = APIRouter()

@book_search_router.get("/search/book", tags=["Search"])
async def search_books(
    title: str = Query(None, description="Search for books by title"),
    author: str = Query(None, description="Search for books by author"),
    category: str = Query(None, description="Search for books by category"),
    limit: int = Query(10, ge=1, le=100, description="Maximum number of results to return")
):

    try:
        query_params = []
        if title:
            query_params.append(f"title={title}")
        if author:
            query_params.append(f"author={author}")
        if category:
            query_params.append(f"subject={category}")

        query_string = "&".join(query_params)
        recommendations = await search_books_service(title=title, author=author, category=category, limit=limit)
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
