from flask import Flask, jsonify, request
from flask_cors import CORS
from db import products_collection

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return jsonify({
        "service": "Product Service",
        "status": "running"
    })


@app.route("/products", methods=["GET"])
def get_products():

    products = []

    for product in products_collection.find():
        product["_id"] = str(product["_id"])
        products.append(product)

    return jsonify(products)


@app.route("/products/<int:product_id>", methods=["GET"])
def get_product(product_id):

    product = products_collection.find_one({"id": product_id})

    if product is None:
        return jsonify({
            "error": "Product not found"
        }), 404

    product["_id"] = str(product["_id"])

    return jsonify(product)


@app.route("/products/<int:product_id>/stock", methods=["PUT"])
def update_stock(product_id):

    data = request.get_json()

    quantity = data.get("quantity")

    product = products_collection.find_one({"id": product_id})

    if product is None:
        return jsonify({
            "error": "Product not found"
        }), 404

    if quantity is None:
        return jsonify({
            "error": "Quantity is required"
        }), 400

    if quantity <= 0:
        return jsonify({
            "error": "Quantity must be greater than zero"
        }), 400

    if product["stock"] < quantity:
        return jsonify({
            "error": "Insufficient stock"
        }), 400

    new_stock = product["stock"] - quantity

    products_collection.update_one(
        {"id": product_id},
        {
            "$set": {
                "stock": new_stock
            }
        }
    )

    updated_product = products_collection.find_one({"id": product_id})
    updated_product["_id"] = str(updated_product["_id"])

    return jsonify(updated_product), 200


@app.route("/health")
def health():
    return jsonify({
        "status": "healthy"
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True)