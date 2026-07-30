import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import SummaryCard from "./components/SummaryCard";
import ProductCard from "./components/ProductCard";
import OrderCard from "./components/OrderCard";
import CartSidebar from "./components/CartSidebar";
import Checkout from "./Checkout";
import OrderSuccess from "./OrderSuccess";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  const addToCart = (product, quantity) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity,
        },
      ]);
    }

    setMessage(`🛒 ${product.name} added to cart.`);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const checkout = async () => {
    if (cart.length === 0) return;

    try {
      for (const item of cart) {
        await fetch(`${API_URL}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: 1,
            product_id: item.id,
            quantity: item.quantity,
          }),
        });
      }

      setCart([]);
      setIsCartOpen(false);
      setShowCheckout(false);
      setShowSuccess(true);

      setMessage("✅ Order placed successfully.");

      fetchProducts();
      fetchOrders();
    } catch (error) {
      console.error(error);
      setMessage("❌ Checkout failed.");
    }
  };

  const totalStock = products.reduce(
    (sum, product) => sum + product.stock,
    0
  );

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (showSuccess) {
    return (
      <OrderSuccess
        continueShopping={() => {
          setShowSuccess(false);
        }}
      />
    );
  }

  if (showCheckout) {
    return (
      <Checkout
        cart={cart}
        total={totalAmount}
        placeOrder={checkout}
        back={() => setShowCheckout(false)}
      />
    );
  }

  return (
    <>
      <Navbar
        cartCount={cartCount}
        openCart={() => setIsCartOpen(true)}
      />

      <CartSidebar
        isOpen={isCartOpen}
        cart={cart}
        closeCart={() => setIsCartOpen(false)}
        removeFromCart={removeFromCart}
        goToCheckout={() => {
          setIsCartOpen(false);
          setShowCheckout(true);
        }}
      />

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
              buyProduct={addToCart}
            />
          ))
        )}

        <h2 style={{ marginTop: "50px" }}>Recent Orders</h2>

        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>
    </>
  );
}

export default App;