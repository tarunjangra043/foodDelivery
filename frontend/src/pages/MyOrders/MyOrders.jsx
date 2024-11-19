import React, { useEffect, useState } from "react";
import "./MyOrders.css";
import { useSelector } from "react-redux";
import axios from "axios";

const MyOrders = () => {
  const url = useSelector((state) => state.cart.url);
  const token = useSelector((state) => state.cart.token);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { Authorization: token } }
      );

      if (response.data && response.data.data) {
        setData(response.data.data);
      } else {
        console.error("Unexpected API response format", response);
        setData([]);
      }
    } catch (e) {
      console.error("Error fetching orders:", e);
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
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span>
                <b>{order.status}</b>
              </p>
              <button>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
