import httpx

async def search_books_service(title: str = None, author: str = None, category: str = None, limit: int = 10):

    base_url = "https://openlibrary.org/search.json"
    query_params = []

    if title:
        query_params.append(f"title={title}")
    if author:
        query_params.append(f"author={author}")
    if category:
        query_params.append(f"subject={category}")

    query_string = "&".join(query_params)
    url = f"{base_url}?{query_string}&limit={limit}"
    print(f"Requesting URL: {url}")  # Para depuración

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status()
            data = response.json()

            # Procesar y devolver los resultados relevantes
            return [
                {
                    "title": book.get("title", "Unknown Title"),
                    "author": ", ".join(book.get("author_name", ["Unknown"])),
                    "category": book.get("subject", ["Unknown"]),
                    "publish_year": book.get("first_publish_year", "Unknown"),
                }
                for book in data.get("docs", [])
            ]
    except httpx.RequestError as e:
        raise Exception(f"HTTP Request failed: {e}")
