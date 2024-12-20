from dotenv import load_dotenv

import os
load_dotenv(

)

class Config:
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    RAWG_API_KEY = os.getenv("RAWG_API_KEY")