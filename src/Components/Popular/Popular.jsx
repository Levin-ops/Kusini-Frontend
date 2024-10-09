import React from "react";
import "./Popular.css";
import data_product from "../Assets/data";
import Items from "../Items/Items";
import { useState, useEffect } from "react";

function Popular() {
  const [popularDrinks, setPopularDrinks] = useState([]);

  useEffect(() => {
    fetch("https://kusini-backend-1.onrender.com/products/populardrinks")
      .then((response) => response.json())
      .then((data) => setPopularDrinks(data));
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR DRINKS</h1>
      <hr />
      <div className="popular_item">
        {popularDrinks.map((item, i) => {
          return (
            <Items
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Popular;
