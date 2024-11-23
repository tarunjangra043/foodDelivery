import React from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/cartSlice.js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const food_list = useSelector((state) => state.cart.food_list);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          const quantity = cartItems[item._id];
          if (quantity > 0) {
            return (
              <div key={item._id} className="cart-items-title cart-items-item">
                <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>{quantity}</p>
                <p>₹{item.price * quantity}</p>
                <p
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="cross"
                >
                  X
                </p>
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{totalPrice.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{totalPrice.toFixed(2)}</b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
