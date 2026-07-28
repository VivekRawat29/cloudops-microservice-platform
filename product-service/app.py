from flask import Flask, jsonify

app = Flask(__name__)

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


@app.route("/")
def home():
    return jsonify({
        "service": "Product Service",
        "status": "running"
    })


@app.route("/products", methods=["GET"])
def get_products():
    return jsonify(products)

@app.route("/products/<int:product_id>", methods=["GET"])
def get_product(product_id):
    product = next(
        (product for product in products if product["id"] == product_id),
        None
    )

    if product is None:
        return jsonify({
            "error": "Product not found"
        }), 404

    return jsonify(product)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy"
    }), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True)