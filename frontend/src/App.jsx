import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const buyProduct = async (productId) => {
    try {
      const response = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          product_id: productId,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ Order #${data.id} created successfully.`);
        fetchProducts();
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Unable to connect to server.");
    }
  };

  return (
    <div className="container">
      <h1>CloudOps Microservice Platform</h1>

      {message && <p className="message">{message}</p>}

      <h2>Products</h2>

      {products.map((product) => (
        <div className="card" key={product.id}>
          <h3>{product.name}</h3>

          <p>
            <strong>Price:</strong> ₹{product.price}
          </p>

          <p>
            <strong>Stock:</strong> {product.stock}
          </p>

          <button onClick={() => buyProduct(product.id)}>
            Buy
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;