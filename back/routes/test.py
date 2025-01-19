import httpx

from configuration.config import Config

api_key = Config.RAWG_API_KEY
url = f"https://api.rawg.io/api/games?key={api_key}&search=action&page_size=10"

response = httpx.get(url)
print(response.status_code, response.json())