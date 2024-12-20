
import httpx

url = "https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=10"

print(f"Requesting URL: {url}")


async def fetch_books():
    """
    Obtiene una lista de libros desde la Google Books API.
    """
    #url = "https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=10"
    print(f"Requesting URL: {url}")

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            print(f"Response status: {response.status_code}")
            response.raise_for_status()
            data = response.json()
            print(f"Response data: {data}")

            return [
                {
                    "title": item["volumeInfo"].get("title", "Unknown Title"),
                    "author": item["volumeInfo"].get("authors", ["Unknown"])[0],
                    "description": item["volumeInfo"].get("description", "No description available."),
                    "image_url": item["volumeInfo"].get("imageLinks", {}).get("thumbnail", "")
                }
                for item in data.get("items", [])
            ]

    except httpx.HTTPStatusError as e:
        raise Exception(f"HTTP error: {e.response.status_code} - {e.response.text}")
    except httpx.RequestError as e:
        raise Exception(f"Error while making the request: {e}")
    except KeyError as e:
        raise Exception(f"Invalid response format from Google Books API: Missing key {e}")