from db import products_collection

products = [
    {
        "id": 1,
        "name": "Laptop",
        "price": 65000,
        "stock": 10
    },
    {
        "id": 2,
        "name": "Mechanical Keyboard",
        "price": 3500,
        "stock": 25
    },
    {
        "id": 3,
        "name": "Wireless Mouse",
        "price": 1500,
        "stock": 40
    },
    {
        "id": 4,
        "name": "Monitor",
        "price": 18000,
        "stock": 15
    }
]

products_collection.delete_many({})
products_collection.insert_many(products)

print("✅ Products inserted successfully.")