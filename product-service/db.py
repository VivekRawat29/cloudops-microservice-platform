from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")

try:
    client = MongoClient(MONGO_URI)

    db = client[DATABASE_NAME]

    products_collection = db[COLLECTION_NAME]

    print("✅ MongoDB Connected Successfully")

except Exception as e:
    print(f"❌ MongoDB Connection Failed: {e}")