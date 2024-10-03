import React, { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import { useNavigate } from "react-router-dom";

function CartItems() {
  const { all_product, cartItems, removeFromCart, getTotalCartAmount } =
    useContext(ShopContext);
  const [deliveryFee, setDeliveryFee] = useState(100); // Default to within Kilifi
  const navigate = useNavigate();

  if (!all_product.length) {
    return <div>Loading...</div>;
  }

  const isCartEmpty = Object.values(cartItems).every((item) => item === 0);

  // Handle delivery fee change
  const handleDeliveryChange = (e) => {
    const selectedFee = parseInt(e.target.value);
    setDeliveryFee(selectedFee);
  };

  return (
    <div className="cart_items">
      <div className="cart_item_format_main">
        <p>Products</p>
        <p>Name</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cart_items_format cart_item_format_main">
                <img src={e.image} className="cart_icon_product_icon" alt="" />
                <p>{e.name}</p>
                <p>Ksh.{e.price}</p>
                <button className="cart_item_quantity">
                  {cartItems[e.id]}
                </button>
                <p>Ksh.{e.price * cartItems[e.id]}</p>
                <img
                  src={remove_icon}
                  className="cart_items_remove_icon"
                  alt=""
                  onClick={() => removeFromCart(e.id)}
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cart_items_down">
        <div className="cart_items_total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cart_items_total_items">
              <p>Sub-Total</p>
              <p>Ksh.{getTotalCartAmount()}</p>
            </div>
            <hr />

            {/* Delivery Fee Selection */}
            {/* <div className="cart_items_total_items">
              <label htmlFor="delivery">
                Delivery Fee:{" "}
                <select id="delivery" onChange={handleDeliveryChange}>
                  <option value="100">Within Kilifi Township - Ksh. 100</option>
                  <option value="200">
                    Outside Kilifi Township - Ksh. 200
                  </option>
                </select>
              </label>
              <p>Ksh. {deliveryFee}</p>
            </div>
            <hr /> */}

            {/* Total calculation */}
            <div className="cart_items_total_items">
              <h3>Total</h3>
              <h3>Ksh.{getTotalCartAmount()}</h3>
            </div>
          </div>

          {isCartEmpty ? (
            <p className="cart_empty_message">
              Your cart is empty. Please add items before proceeding to checkout
            </p>
          ) : (
            <button onClick={() => navigate("/checkout")}>
              PROCEED TO CHECKOUT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartItems;
