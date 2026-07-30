function Navbar({ cartCount, openCart }) {
  return (
    <nav className="navbar">
      <h1>CloudOps Microservice Platform</h1>

      <button className="cart-btn" onClick={openCart}>
        🛒 Cart ({cartCount})
      </button>
    </nav>
  );
}

export default Navbar;