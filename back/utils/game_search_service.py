import httpx
from fastapi import HTTPException

from configuration.config import Config

API_KEY = Config.RAWG_API_KEY

async def search_games_service(
    query: str = "",
    genre: str = None,
    platforms: str = None,
    dates: str = None,
    limit: int = 10
):
    """
    Busca videojuegos en la API RAWG.
    :param query: Término de búsqueda principal.
    :param genre: Género del videojuego.
    :param platforms: Plataformas (IDs separadas por comas, e.g., "18,1,7").
    :param dates: Rango de fechas en formato "YYYY-MM-DD,YYYY-MM-DD".
    :param limit: Número de resultados a devolver.
    :return: Lista de videojuegos con detalles relevantes.
    """
    base_url = "https://api.rawg.io/api/games"

    # Construcción de los parámetros
    params = {
        "key": API_KEY,
        "search": query,
        "page_size": limit
    }
    if platforms:
        params["platforms"] = platforms
    if dates:
        params["dates"] = dates

    try:
        async with httpx.AsyncClient() as client:
            # Realiza la solicitud a la API
            response = await client.get(base_url, params=params)
            response.raise_for_status()  # Genera excepción en caso de error HTTP

            # Procesa los datos devueltos por la API
            data = response.json()
            processed_results = []

            for game in data.get("results", []):
                platforms_list = [
                    platform["platform"]["name"]
                    for platform in game.get("platforms", [])
                ]
                genres_list = [
                    genre["name"]
                    for genre in game.get("genres", [])
                ]

                processed_results.append({
                    "name": game.get("name", "Unknown Name"),
                    "released": game.get("released", "Unknown Release Date"),
                    "rating": game.get("rating", "N/A"),
                    "platforms": platforms_list,
                    "genres": genres_list,
                    "background_image": game.get("background_image", ""),
                })

            return processed_results[:limit]
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=f"HTTP error: {e.response.text}")
    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail=f"Request error: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")
