from flask import Flask, jsonify, request
from flask_cors import CORS
from config import PRODUCT_SERVICE_URL
from db import orders_collection
import requests

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({
        "service": "Order Service",
        "status": "running"
    })


@app.route("/orders", methods=["GET"])
def get_orders():

    orders = []

    for order in orders_collection.find():
        order["_id"] = str(order["_id"])
        orders.append(order)

    return jsonify(orders)


@app.route("/orders", methods=["POST"])
def create_order():

    data = request.get_json()

    product_id = data.get("product_id")
    quantity = data.get("quantity", 1)
    user_id = data.get("user_id")

    # Step 1 - Get Product Details
    try:
        response = requests.get(
            f"{PRODUCT_SERVICE_URL}/products/{product_id}",
            timeout=5
        )

    except requests.RequestException:
        return jsonify({
            "error": "Product Service is unavailable"
        }), 503

    if response.status_code == 404:
        return jsonify({
            "error": "Product not found"
        }), 404

    if response.status_code != 200:
        return jsonify({
            "error": "Unable to verify product"
        }), 502

    product = response.json()

    # Step 2 - Check Stock
    if quantity > product["stock"]:
        return jsonify({
            "error": "Insufficient stock"
        }), 400

    # Step 3 - Reduce Stock
    try:

        stock_response = requests.put(
            f"{PRODUCT_SERVICE_URL}/products/{product_id}/stock",
            json={
                "quantity": quantity
            },
            timeout=5
        )

    except requests.RequestException:
        return jsonify({
            "error": "Unable to update stock"
        }), 503

    if stock_response.status_code != 200:
        return jsonify({
            "error": "Stock update failed"
        }), 400

    # Step 4 - Generate Order ID
    last_order = orders_collection.find_one(sort=[("id", -1)])

    if last_order:
        order_id = last_order["id"] + 1
    else:
        order_id = 1

    # Step 5 - Create Order
    new_order = {
        "id": order_id,
        "user_id": user_id,
        "product_id": product_id,
        "product_name": product["name"],
        "quantity": quantity,
        "total_price": product["price"] * quantity,
        "status": "confirmed"
    }

    orders_collection.insert_one(new_order)

    saved_order = orders_collection.find_one({"id": order_id})
    saved_order["_id"] = str(saved_order["_id"])

    return jsonify(saved_order), 201


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy"
    }), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5003, debug=True)