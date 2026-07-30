import { useState } from "react";

function ProductCard({ product, buyProduct }) {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="card">
      <h3>{product.name}</h3>

      <p>
        <strong>Price:</strong> ₹{product.price}
      </p>

      <p>
        <strong>Stock:</strong> {product.stock}
      </p>

      {product.stock === 0 ? (
        <p className="out-of-stock">🔴 Out of Stock</p>
      ) : product.stock <= 5 ? (
        <p className="low-stock">⚠️ Low Stock</p>
      ) : null}

      <div className="quantity-container">
        <button onClick={decreaseQuantity}>-</button>

        <span>{quantity}</span>

        <button onClick={increaseQuantity}>+</button>
      </div>

      <button
        className="buy-btn"
        disabled={product.stock === 0}
        onClick={() => buyProduct(product, quantity)}
      >
        {product.stock === 0 ? "Out of Stock" : "🛒 Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;