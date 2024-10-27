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
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [selectedAccompaniments, setSelectedAccompaniments] = useState([]);

  useEffect(() => {
    if (product.category !== "soft-drink") {
      fetch("https://kusini-backend-1.onrender.com/products/softdrinks")
        .then((response) => response.json())
        .then((data) => {
          setSoftDrinks(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [product.category]);

  const handleAddToCart = (event, id, name) => {
    event.preventDefault();
    addToCart(id);
    setConfirmationMessage(`${name} added to cart`);

    // Update selected accompaniments
    if (!selectedAccompaniments.includes(id)) {
      setSelectedAccompaniments((prev) => [...prev, id]);
    }

    setTimeout(() => {
      setConfirmationMessage("");
    }, 3000);
  };

  return (
    <div className="product_display">
      <div className="product_display_left">
        {confirmationMessage && (
          <div className="confirmation-message">{confirmationMessage}</div>
        )}
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

        {product.category !== "soft-drink" && (
          <div className="product_display_right_accompaniments">
            <h1>Select Accompaniments</h1>
            <div className="product_display_right_condiments">
              {loading ? (
                <div className="loading-animation">
                  Loading accompaniments...
                </div>
              ) : (
                softDrinks.map((drink, i) => (
                  <div key={i} className="accompaniment">
                    <img
                      src={drink.image}
                      alt={drink.name}
                      onClick={(event) =>
                        handleAddToCart(event, drink.id, drink.name)
                      }
                      className={
                        selectedAccompaniments.includes(drink.id)
                          ? "highlighted"
                          : ""
                      }
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        <button
          onClick={(event) => handleAddToCart(event, product.id, product.name)}
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
