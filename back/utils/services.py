
import httpx

async def fetch_books():
    """
   It obtains a list of books from Google Books API
    """

    url = "https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=10"
    print("https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=10")

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status() #It raises exception
            data = response.json() #transforms data to json

            return [
                {
                    "title": item["volumeInfo"]["title"],
                    "author": item["volumeInfo"].get("authors", ["Unknown"])[0],
                    "description": item["volumeInfo"].get("description", "No description available."),
                    "image_url": item["volumeInfo"].get("imageLinks", {}).get("thumbnail", "")
                }

                for item in data.get("items", [])
            ]

    except httpx.ConnectError as e:
        raise Exception(f"Could not connect to Google Books API: {e}")
    except httpx.RequestError as e:
        raise Exception(f"Request error {e}")
    except KeyError as e:
        raise Exception(f"Invalid forma from Google Books API: {e}")

