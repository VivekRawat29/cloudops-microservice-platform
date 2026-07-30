import { useState } from "react";
import "./App.css";

function Checkout({ cart, total, placeOrder, back }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    payment: "Cash on Delivery",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !form.fullName ||
      !form.phone ||
      !form.email ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pin
    ) {
      alert("Please fill all fields.");
      return;
    }

    await placeOrder();
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-form">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Address"
          rows="3"
          value={form.address}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
        />

        <input
          type="text"
          name="pin"
          placeholder="PIN Code"
          value={form.pin}
          onChange={handleChange}
        />

        <select
          name="payment"
          value={form.payment}
          onChange={handleChange}
        >
          <option>Cash on Delivery</option>
          <option>UPI</option>
          <option>Credit Card</option>
          <option>Debit Card</option>
        </select>

        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div key={item.id} className="summary-item">
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <hr />

          <h2>Total: ₹{total}</h2>
        </div>

        <div className="checkout-buttons">
          <button className="back-btn" onClick={back}>
            Back
          </button>

          <button className="buy-btn" onClick={handleSubmit}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;