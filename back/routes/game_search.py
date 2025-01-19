from http.client import HTTPException

from fastapi import APIRouter, Query
from utils.game_search_service import search_games_service

game_search_router = APIRouter()

@game_search_router.get("/game", tags=["Games"])
async def search_games(
    query: str = Query("", description="Search term for games"),
    genre: str = Query(None, description="Genre of the game"),
    platforms: str = Query(None, description="Platform IDs (comma-separated, e.g., '18,1,7')"),
    dates: str = Query(None, description="Date range in format 'YYYY-MM-DD,YYYY-MM-DD'"),
    limit: int = Query(10, ge=1, le=100, description="Number of results to return")
):
    """
    Endpoint para buscar videojuegos en la API RAWG.
    """
    try:
        results = await search_games_service(query=query, genre=genre, platforms=platforms, dates=dates, limit=limit)
        return {"results": results, "limit": limit}
    except HTTPException as e:
        raise e
