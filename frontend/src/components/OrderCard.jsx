function OrderCard({ order }) {
  return (
    <div className="card">
      <h3>Order #{order.id}</h3>

      <p>
        <strong>Product:</strong> {order.product_name}
      </p>

      <p>
        <strong>Quantity:</strong> {order.quantity}
      </p>

      <p>
        <strong>Total:</strong> ₹{order.total_price}
      </p>

      <p>
        <strong>Status:</strong> {order.status}
      </p>
    </div>
  );
}

export default OrderCard;