import "./App.css";

function OrderSuccess({ continueShopping }) {
  return (
    <div className="checkout-container">
      <div className="checkout-form" style={{ textAlign: "center" }}>
        <div style={{ fontSize: "80px", marginBottom: "20px" }}>✅</div>

        <h1 style={{ color: "#16a34a", marginBottom: "15px" }}>
          Order Placed Successfully!
        </h1>

        <p style={{ fontSize: "18px", marginBottom: "10px" }}>
          Thank you for shopping with us.
        </p>

        <p style={{ marginBottom: "10px" }}>
          <strong>Order ID:</strong> #{Math.floor(Math.random() * 90000 + 10000)}
        </p>

        <p style={{ marginBottom: "10px" }}>
          <strong>Status:</strong> Processing
        </p>

        <p style={{ marginBottom: "25px" }}>
          <strong>Estimated Delivery:</strong> 3 - 5 Business Days
        </p>

        <button
          className="buy-btn"
          style={{ maxWidth: "300px", margin: "0 auto" }}
          onClick={continueShopping}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;