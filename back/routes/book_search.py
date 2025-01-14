from fastapi import APIRouter, HTTPException, Query
from utils.book_search_services import search_books_service

book_search_router = APIRouter()


@book_search_router.get("/book", tags=["Search"])
async def search_books(
        title: str = Query(None, description="Search by title"),
        author: str = Query(None, description="Search by author"),
        category: str = Query(None, description="Search by category"),
        limit: int = Query(10, ge=1, le=100, description="Number of results to return")
):
    if not any([title, author, category]):
        raise HTTPException(
            status_code=400,
            detail="At least one search parameter (title, author, or category) must be provided."
        )

    try:
        print(f"Received parameters: title={title}, author={author}, category={category}, limit={limit}")
        results = await search_books_service(title=title, author=author, category=category, limit=limit)
        """ return {
                    "query": {
                        "title": title,
                        "author": author,
                        "category": category,
                        "limit": limit,
                    },
                    "results": results,
                }"""
        return {"results": results}


    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
