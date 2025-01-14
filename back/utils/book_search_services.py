import httpx
from httpx import QueryParams

async def search_books_service(title: str = None, author: str = None, category: str = None, limit: int = 10):
    base_url = "https://openlibrary.org/search.json"

    # Construcción de parámetros
    params = QueryParams({
        "title": title,
        "author": author,
        "subject": category
    }).remove_empty()

    if not params:
        raise Exception("At least one search parameter must be provided.")

    url = f"{base_url}?{params}"
    print(f"Requesting URL: {url}")

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status()  # Lanza una excepción si no es 200 OK
            print(f"Response status: {response.status_code}")

            data = response.json()
            print(f"Response data: {data}")

            if not isinstance(data.get("docs"), list):
                raise Exception(f"Invalid 'docs' format in response: {data}")

            results = [
                {
                    "title": book.get("title", "Unknown Title"),
                    "author": ", ".join(book.get("author_name", ["Unknown"])),
                    "category": book.get("subject", ["Unknown"]),
                    "publish_year": book.get("first_publish_year", "Unknown"),
                }
                for book in data["docs"]
            ]

            return results[:limit]
    except httpx.RequestError as e:
        raise Exception(f"HTTP Request failed: {e}")
    except ValueError as e:
        raise Exception(f"Error parsing response: {e}")

