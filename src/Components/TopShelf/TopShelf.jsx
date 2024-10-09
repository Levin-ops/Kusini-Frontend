import React, { useEffect, useState } from "react";
import "./TopShelf.css";
import Items from "../Items/Items";

function TopShelf() {
  const [topShelfDrinks, setTopShelfDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://kusini-backend-1.onrender.com/products/topshelf")
      .then((response) => response.json())
      .then((data) => {
        setTopShelfDrinks(data);
        setLoading(false); // Data is loaded, stop showing the loader
      })
      .catch(() => {
        setLoading(false); // In case of an error, also stop showing the loader
      });
  }, []);

  return (
    <div className="top_shelf">
      <h1>TOP SHELF</h1>
      <hr />
      <div className="topshelfdrinks">
        {loading ? (
          <div className="loading-animation">Loading...</div> // Display a loading animation
        ) : (
          topShelfDrinks.map((item, i) => (
            <Items
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TopShelf;
