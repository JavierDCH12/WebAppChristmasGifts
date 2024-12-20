from fastapi import APIRouter, HTTPException, Query
from utils.book_services import fetch_books

# Create an APIRouter instance for book recommendations
book_recommendation_router = APIRouter()

@book_recommendation_router.get("/recommendations/books", tags=["Recommendations"])
async def get_books_recommendations(
    query: str = Query("python", description="Search query for Open Library API"),  # Default query is 'python'
    limit: int = Query(10, ge=1, le=100, description="Maximum number of results to return (1-100)")  # Limit results
):
    """
    Fetches book recommendations from the Open Library API based on a search query.
    :param query: Search term for book recommendations (e.g., 'history').
    :param limit: Maximum number of books to retrieve (default: 10).
    :return: A JSON response with a list of book recommendations.
    """
    try:
        # Call the fetch_books service to get recommendations
        recommendations = await fetch_books(query=query, limit=limit)
        return {
            "category": "book",  # Specify the category of recommendations
            "recommendations": recommendations  # Return the list of recommended books
        }
    except Exception as e:
        # Handle errors and return a 500 HTTP response with error details
        raise HTTPException(status_code=500, detail=str(e))
