import React, { useEffect, useState } from "react";
import "./MyOrders.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const url = useSelector((state) => state.cart.url);
  const token = useSelector((state) => state.cart.token);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data?.success) {
        setData(response.data.data);
      } else {
        console.error("API Error:", response.data?.message || "Unknown error");
        setData([]);
      }
    } catch (e) {
      console.error("Network or Server Error:", e);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {loading ? (
          <p>Loading your orders...</p>
        ) : data.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Order Parcel Icon" />
              <p>
                {order.items?.map(
                  (item, idx) =>
                    `${item.name} x ${item.quantity}${
                      idx < order.items.length - 1 ? ", " : ""
                    }`
                ) || "No items found"}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button>Track Order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
