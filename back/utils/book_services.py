import httpx

async def fetch_books(query="python", limit=10):
    """
    Fetches a list of books from the Open Library API.
    :param query: Search query string (e.g., 'python').
    :param limit: Maximum number of results to fetch.
    :return: List of books with title, author, and other details.
    """
    # Construct the API endpoint URL dynamically based on query and limit
    url = f"https://openlibrary.org/search.json?q={query}&limit={limit}"
    print(f"Requesting URL: {url}")  # Debug log for the requested URL

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)  #
            response.raise_for_status()

            data = response.json()

            return [
                {
                    "title": book.get("title", "Unknown Title"),  # Get the book title or default to 'Unknown Title'
                    "author": ", ".join(book.get("author_name", ["Unknown"])),  # Join author names if available
                    "publish_year": book.get("first_publish_year", "Unknown Year"),  # Get the first publish year
                    "isbn": book.get("isbn", ["Unknown ISBN"])[0] if book.get("isbn") else None  # Get the first ISBN if available
                }
                for book in data.get("docs", [])  # Iterate through the 'docs' key in the response
            ]

    except httpx.HTTPStatusError as e:
        # Handle HTTP errors (e.g., 404, 500) and log details
        print(f"HTTP Error: {e.response.status_code} - {e.response.text}")
        raise Exception(f"HTTP error {e.response.status_code}: {e.response.text}")

    except httpx.RequestError as e:
        # Handle request-related errors (e.g., connection issues) and log details
        print(f"Request Error: {str(e)}")
        raise Exception(f"Request error: {str(e)}")

    except Exception as e:
        # Handle any unexpected errors and log details
        print(f"Unexpected Error: {str(e)}")
        raise Exception(f"Unexpected error: {str(e)}")
