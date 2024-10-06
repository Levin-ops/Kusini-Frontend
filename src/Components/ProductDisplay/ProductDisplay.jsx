import React, { useContext, useState, useEffect } from "react";
import "./ProductDisplay.css";
import star_bright from "../Assets/star_icon.png";
import star_dull from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

function ProductDisplay(props) {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  const [softDrinks, setSoftDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://kusini-backend-1.onrender.com/softdrinks")
      .then((response) => response.json())
      .then((data) => {
        setSoftDrinks(data);
        setLoading(false); // Stop loading once data is fetched
      })
      .catch(() => {
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  return (
    <div className="product_display">
      <div className="product_display_left">
        <div className="product_display_image">
          <img
            src={product.image}
            className="product_image"
            alt={product.name}
          />
        </div>
      </div>
      <div className="product_display_right">
        <h1>{product.name}</h1>
        <div className="product_display_right_star">
          <img src={star_bright} alt="Star" />
          <img src={star_bright} alt="Star" />
          <img src={star_bright} alt="Star" />
          <img src={star_bright} alt="Star" />
          <img src={star_dull} alt="Dull Star" />
          <p>(145)</p>
        </div>
        <div className="product_display_right_price">Ksh{product.price}</div>
        <div className="product_display_right_desc">{product.description}</div>
        <div className="product_display_right_accompaniments">
          <h1>Select Accompaniments</h1>
          <div className="product_display_right_condiments">
            {loading ? (
              <div className="loading-animation">Loading accompaniments...</div> // Display loading animation
            ) : (
              softDrinks.map((drink, i) => (
                <div key={i}>
                  <img src={drink.image} alt={drink.name} />
                </div>
              ))
            )}
          </div>
        </div>
        <button
          onClick={() => {
            addToCart(product.id);
          }}
        >
          Add To Cart
        </button>
        <p className="product_display_right_category">
          Category: <span>{product.category}</span>
        </p>
        <p className="product_display_right_category">
          Tag: <span>{product.level}</span>
        </p>
      </div>
    </div>
  );
}

export default ProductDisplay;
