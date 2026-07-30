function CartSidebar({
  isOpen,
  cart,
  closeCart,
  removeFromCart,
  goToCheckout,
}) {
  if (!isOpen) return null;

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-overlay">
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>🛒 My Cart</h2>

          <button onClick={closeCart}>✖</button>
        </div>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <h4>{item.name}</h4>

                <p>₹{item.price}</p>

                <p>Quantity: {item.quantity}</p>

                <button onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))}

            <hr />

            <h3>Total: ₹{total}</h3>

            <button className="buy-btn" onClick={goToCheckout}>
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CartSidebar;