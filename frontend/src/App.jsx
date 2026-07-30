import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import SummaryCard from "./components/SummaryCard";
import ProductCard from "./components/ProductCard";
import OrderCard from "./components/OrderCard";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/orders`);
      const data = await response.json();
      setOrders(data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const buyProduct = async (productId, quantity) => {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          product_id: productId,
          quantity: quantity,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ Order #${data.id} created successfully.`);
        fetchProducts();
        fetchOrders();
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Unable to connect to server.");
    }
  };

  const totalStock = products.reduce(
    (sum, product) => sum + product.stock,
    0
  );

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="container">
        {message && <p className="message">{message}</p>}

        <div className="summary-container">
          <SummaryCard title="Products" value={products.length} />
          <SummaryCard title="Orders" value={orders.length} />
          <SummaryCard title="Total Stock" value={totalStock} />
        </div>

        <h2>Products</h2>

        <input
          type="text"
          className="search-box"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              buyProduct={buyProduct}
            />
          ))
        )}

        <h2 style={{ marginTop: "50px" }}>Recent Orders</h2>

        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;