import httpx
from config.config import Config


async def fetch_games(query="action", limit=10):
    """
    Fetches a list of games from the RAWG API based on a query.
    :param query: Genre, theme, or search term (e.g., 'action', 'rpg').
    :param limit: Number of games to return (default: 10).
    :return: List of games with relevant details.
    """
    # Construct the API endpoint URL dynamically based on query and limit
    url = f"https://api.rawg.io/api/games?key={Config.RAWG_API_KEY}&search={query}&page_size={limit}"
    print(f"Requesting URL: {url}")  # Debug log for the requested URL

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)  # Perform GET request
            response.raise_for_status()  # Raise an exception for HTTP errors

            data = response.json()

            # Process and return the relevant fields
            return [
                {
                    "name": game.get("name", "Unknown Name"),
                    "released": game.get("released", "Unknown Release Date"),
                    "rating": game.get("rating", "N/A"),
                    "platforms": [
                        platform["platform"]["name"] for platform in game.get("platforms", [])
                    ],
                    "background_image": game.get("background_image", "")
                }
                for game in data.get("results", [])
            ]

    except httpx.HTTPStatusError as e:
        raise Exception(f"HTTP error {e.response.status_code}: {e.response.text}")

    except httpx.RequestError as e:
        raise Exception(f"Request error: {str(e)}")

    except Exception as e:
        raise Exception(f"Unexpected error: {str(e)}")
