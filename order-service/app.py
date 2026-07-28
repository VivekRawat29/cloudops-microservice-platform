from flask import Flask, jsonify, request
from config import PRODUCT_SERVICE_URL
import requests

app = Flask(__name__)

orders = [
    {
        "id": 1,
        "user_id": 1,
        "product_id": 2,
        "quantity": 1,
        "status": "confirmed"
    },
    {
        "id": 2,
        "user_id": 2,
        "product_id": 1,
        "quantity": 1,
        "status": "shipped"
    }
]


@app.route("/")
def home():
    return jsonify({
        "service": "Order Service",
        "status": "running"
    })


@app.route("/orders", methods=["GET"])
def get_orders():
    return jsonify(orders)


@app.route("/orders", methods=["POST"])
def create_order():
    data = request.get_json()

    product_id = data.get("product_id")
    quantity = data.get("quantity", 1)

    # Contact Product Service
    try:
        response = requests.get(
    f"{PRODUCT_SERVICE_URL}/products/{product_id}",
    timeout=5
         )
        
    except requests.RequestException:
        return jsonify({
            "error": "Product Service is unavailable"
        }), 503

    # Check whether product exists
    if response.status_code == 404:
        return jsonify({
            "error": "Product not found"
        }), 404

    if response.status_code != 200:
        return jsonify({
            "error": "Unable to verify product"
        }), 502

    product = response.json()

    # Check available stock
    if quantity > product["stock"]:
        return jsonify({
            "error": "Insufficient stock"
        }), 400

    # Create order
    new_order = {
        "id": len(orders) + 1,
        "user_id": data.get("user_id"),
        "product_id": product_id,
        "product_name": product["name"],
        "quantity": quantity,
        "total_price": product["price"] * quantity,
        "status": "confirmed"
    }

    orders.append(new_order)

    return jsonify(new_order), 201


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy"
    }), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5003, debug=True)