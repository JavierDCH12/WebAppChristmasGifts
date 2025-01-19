from fastapi import FastAPI, Query, HTTPException, APIRouter

from utils.game_search_service import fetch_games


game_recommendation_router = APIRouter()


# Endpoint for game recommendations
@game_recommendation_router.get("/recommendations/games", tags=["Recommendations"])
async def get_games_recommendations(
    query: str = Query("action", description="Search query for RAWG API"),  # Default query is 'action'
    limit: int = Query(10, ge=1, le=100, description="Maximum number of results to return (1-100)")  # Limit results
):
    """
    Fetches game recommendations from the RAWG API based on a search query.
    :param query: Search term for game recommendations (e.g., 'rpg').
    :param limit: Maximum number of games to retrieve (default: 10).
    :return: A JSON response with a list of game recommendations.
    """
    try:
        # Call the fetch_games service to get recommendations
        recommendationsGAME = await fetch_games(query=query, limit=limit)
        return {
            "category": "game",  # Specify the category of recommendations
            "recommendationsGAME": recommendationsGAME  # Return the list of recommended games
        }
    except Exception as e:
        # Handle errors and return a 500 HTTP response with error details
        raise HTTPException(status_code=500, detail=str(e))