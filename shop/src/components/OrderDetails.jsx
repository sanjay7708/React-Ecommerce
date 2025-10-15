import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
import "../css/OrderDetails.css";
import { getCsrfToken } from "../getCsrfToken";

export const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const res = await api.get(`store/order/${id}/`, {
          withCredentials: true,
        });
        setOrder(res.data);
      } catch (err) {
        setError("Failed to fetch order details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [id]);

  // === Cancel Order Function ===
  const handleCancelOrder = async (itemId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this item?");
    if (!confirmCancel) return;

    try {
      setUpdating(true);
      const CsrfToken=await getCsrfToken();
      await api.patch(
        `store/orderitem/${itemId}/`,
        { status: "CANCELLED" },
        {
            headers:{
                "X-CSRFToken":CsrfToken
            },
            withCredentials: true
        }
        
      );

      // Update local state after successful cancel
      setOrder((prevOrder) => ({
        ...prevOrder,
        items: prevOrder.items.map((item) =>
          item.id === itemId ? { ...item, status: "CANCELLED" } : item
        ),
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to cancel the order item. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="order-loading">
        <div className="spinner"></div>
        <p>Loading order details...</p>
      </div>
    );

  if (error) return <p className="error">{error}</p>;

  if (!order) return <p className="no-order">No order found for this ID.</p>;

  return (
    <div className="order-details-container">
      {/* === Header === */}
      <div className="order-header">
        <h2>Order #{order.id}</h2>
        <p className="order-date">
          Placed on: {new Date(order.created_at).toLocaleString()}
        </p>
      </div>

      {/* === Summary === */}
      <div className="order-summary">
        <h3>Summary</h3>
        <p>
          <strong>Total Price:</strong> ₹{order.total_price}
        </p>
        <p>
          <strong>Overall Status:</strong>{" "}
          {order.items.every(
            (i) => i.status === "DELIVERED"
          )
            ? "Delivered"
            : order.items.some(
                (i) => i.status === "CANCELLED"
              )
            ? "Partially Cancelled"
            : "Active"}
        </p>

        {order.address && (
          <div className="address-block">
            <h4>Delivery Address</h4>
            <p>
              <strong>Type:</strong> {order.address.address_type}
            </p>
            <p>
              <strong>Name:</strong> {order.address.user}
            </p>
          </div>
        )}
      </div>

      {/* === Items === */}
      <div className="order-items">
        <h3>Ordered Items</h3>
        {order.items.length > 0 ? (
          <ul>
            {order.items.map((item) => (
              <li key={item.id} className="order-item">
                {/* Product Image */}
                <div className="item-image">
                  <img
                    src={item.product_image?.[0]?.image || "/placeholder.png"}
                    alt={item.product_slug}
                  />
                </div>

                {/* Info */}
                <div className="item-info">
                  <h4 className="product-name">
                    {item.product_slug.replace(/-/g, " ")}
                  </h4>

                  <p>
                    <strong>{item.variation_type}:</strong>{" "}
                    {item.variation_value}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.price}</p>
                  <p>
                    <strong>Status:</strong> {item.status}
                  </p>

                  <p className="subtotal">
                    Subtotal: ₹{Number(item.price) * item.quantity}
                  </p>

                  {/* === Cancel Button === */}
                  {item.status !== "DELIVERED" &&
                    item.status !== "CANCELLED" && (
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancelOrder(item.id)}
                        disabled={updating}
                      >
                        {updating ? "Cancelling..." : "Cancel Order"}
                      </button>
                    )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items found in this order.</p>
        )}
      </div>

      <div className="order-footer">
        <Link to="/orders" className="back-btn">
          ← Back to Orders
        </Link>
      </div>
    </div>
  );
};
