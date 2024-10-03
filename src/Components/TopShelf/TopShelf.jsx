import React, { useEffect, useState } from "react";
import "./TopShelf.css";
import Items from "../Items/Items";
// import all_product from "../Assets/all_product";

function TopShelf() {
  const [topShelfDrinks, setTopShelfDrinks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/topshelf")
      .then((response) => response.json())
      .then((data) => setTopShelfDrinks(data));
  }, []);

  return (
    <div className="top_shelf">
      <h1>TOP SHELF</h1>
      <hr />
      <div className="topshelfdrinks">
        {topShelfDrinks.map((item, i) => {
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

export default TopShelf;
