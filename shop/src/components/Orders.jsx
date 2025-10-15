import React, { useEffect, useState } from "react";
import api from "../api";
import { getCsrfToken } from "../getCsrfToken";
import "../css/order.css"
import { Link } from "react-router-dom";

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const CsrfToken = await getCsrfToken();
        const res = await api.get("store/order/", { withCredentials: true });
        setOrders(res.data);
      } catch (err) {
        alert('something wrong')
      }
    };
    fetchOrders();
  }, []);

  return (
    <>
      <div className="orders-container">
      <h1>My Orders</h1>

      {orders.map((order) =>
        order.items.map((item) => (
          <div key={item.id} className="order-card">
            {/* Header */}
            <div className="order-header">
              
              <span>
                Date: {new Date(order.created_at).toLocaleDateString()}
              </span>
              <span>Status:{item.status}</span>
            </div>

            {/* Single Item */}
            <div className="order-body">
              <img
                src={
                  item.product_image && item.product_image.length > 0
                    ? item.product_image[0].image
                    : "https://via.placeholder.com/100"
                }
                alt={item.product_name}
              />
              <div className="order-info">
                <h3>{item.product_name}</h3>
                <p>Price: ₹{order.total_price}</p>
                <p>{item.variation_type}:{item.variation_value}</p>
                <p>Qty: {item.quantity}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="order-footer">
              <button className="btn btn-primary"><Link to={`/products/${item.product_slug}`}>Buy Again</Link></button>
              <Link className="btn btn-outline" to={`/order-details/${order.id}`}>View Details</Link>
              {/* <button className="btn btn-outline">View Details</button> */}
            </div>
          </div>
        ))
      )}
    </div>
      
    </>
  );
};
