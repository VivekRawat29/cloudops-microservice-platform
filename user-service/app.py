from flask import Flask, jsonify

app = Flask(__name__)

users = [
    {"id": 1, "name": "Vivek", "email": "vivek@example.com"},
    {"id": 2, "name": "Rahul", "email": "rahul@example.com"},
    {"id": 3, "name": "Ankit", "email": "ankit@example.com"}
]


@app.route("/")
def home():
    return jsonify({
        "service": "User Service",
        "status": "running"
    })


@app.route("/users", methods=["GET"])
def get_users():
    return jsonify(users)


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy"
    }), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)