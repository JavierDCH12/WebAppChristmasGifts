import httpx

async def search_books_service(title: str = None, author: str = None, category: str = None, limit: int = 20):
    base_url = "https://openlibrary.org/search.json"

    params = {}
    if title:
        params["title"] = title
    if author:
        params["author"] = author
    if category:
        params["subject"] = category
    params["limit"] = limit

    if not params:
        raise Exception("At least one search parameter must be provided.")

    print(f"Requesting URL with params: {params}")

    try:
        async with httpx.AsyncClient() as client:
            # Pasar los parámetros correctamente
            response = await client.get(base_url, params=params)
            response.raise_for_status()
            print(f"Response status: {response.status_code}")

            data = response.json()
            print(f"Response data: {data}")

            if not isinstance(data.get("docs"), list):
                raise Exception(f"Invalid 'docs' format in response: {data}")

            results = [
                {
                    "title": book.get("title", "Unknown Title"),
                    "author": ", ".join(book.get("author_name", ["Unknown"])),
                    "category": book.get("subject", ["Unknown"])[:5],                    "publish_year": book.get("first_publish_year", "Unknown"),
                }
                for book in data["docs"]
            ]

            return results[:limit]
    except httpx.RequestError as e:
        raise Exception(f"HTTP Request failed: {e}")
    except ValueError as e:
        raise Exception(f"Error parsing response: {e}")
