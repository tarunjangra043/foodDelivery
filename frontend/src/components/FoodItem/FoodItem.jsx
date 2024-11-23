import React from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync, removeFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";

const FoodItem = ({ id, name, price, description, image }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const itemQuantity = cartItems[id] || 0;

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-img" src={image} alt="" />
        {itemQuantity === 0 ? (
          <img
            className="add"
            onClick={() => {
              dispatch(addToCartAsync(id));
              toast.success("Item Added Successfully 🛒");
            }}
            src={assets.add_icon_white}
            alt="Add to Cart"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => {
                dispatch(removeFromCart(id));
                toast.error("Item Successfully Removed 🛒");
              }}
              src={assets.remove_icon_red}
              alt="Remove from Cart"
            />
            <p>{itemQuantity}</p>
            <img
              onClick={() => {
                dispatch(addToCartAsync(id));
                toast.success("Item Added Successfully 🛒");
              }}
              src={assets.add_icon_green}
              alt="Increase quantity"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <div className="food-item-price">₹ {price}</div>
      </div>
    </div>
  );
};

export default FoodItem;
