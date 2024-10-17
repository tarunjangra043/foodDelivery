import React from "react";
import "./FoodDisplay.css";
import { useSelector } from "react-redux";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const food_list = useSelector((state) => state.cart.food_list);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list && food_list.length > 0 ? (
          food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
            return null;
          })
        ) : (
          <p>No food items available</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
