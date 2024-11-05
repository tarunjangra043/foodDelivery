import React, { useEffect } from "react";
import "./FoodDisplay.css";
import { useDispatch, useSelector } from "react-redux";
import FoodItem from "../FoodItem/FoodItem";
import axios from "axios";
import { setFoodList } from "../../redux/cartSlice";

const FoodDisplay = ({ category }) => {
  const food_list = useSelector((state) => state.cart.food_list);
  const url = useSelector((state) => state.cart.url);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFoodList = async () => {
      const response = await axios.get(url + "/api/food/list");
      dispatch(setFoodList(response.data.data));
    };

    fetchFoodList();
  }, []);

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
