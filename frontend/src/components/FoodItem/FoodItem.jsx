import React from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import axios from "axios";

const FoodItem = ({ id, name, price, description, image }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { url, token } = useSelector((state) => state.cart);

  const itemQuantity = cartItems[id] || 0;

  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please logIn to add items to the cart🛒");
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/cart/add`,
        { itemId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      dispatch(addToCart(id));
      toast.success(data.message || "Added to Cart🛒");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add item to Cart🛒"
      );
    }
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(id));
    toast.error("Item Successfully Removed 🛒");
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-img" src={image} alt={name} />
        {itemQuantity === 0 ? (
          <img
            className="add"
            onClick={handleAddToCart}
            src={assets.add_icon_white}
            alt="Add to Cart"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={handleRemoveFromCart}
              src={assets.remove_icon_red}
              alt="Remove from Cart"
            />
            <p>{itemQuantity}</p>
            <img
              onClick={handleAddToCart}
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
