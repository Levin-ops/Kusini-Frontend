import React, { useContext, useState } from "react";
import "./Checkout.css";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { getTotalCartAmount, all_product, cartItems, resetCart } =
    useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    paymentMethod: "",
  });
  const [shippingFee, setShippingFee] = useState(100); // Default to Kilifi
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShippingChange = (e) => {
    const selectedFee = parseInt(e.target.value);
    setShippingFee(selectedFee);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/; // Adjust regex for your region's phone number format
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!validatePhoneNumber(formData.phoneNumber)) {
      setErrorMessage("Please enter a valid phone number.");
      setLoading(false);
      return;
    }

    const orderData = {
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
      },
      items: all_product
        .filter((product) => cartItems[product.id] > 0)
        .map((product) => ({
          productId: product.id,
          name: product.name,
          quantity: cartItems[product.id],
          price: product.price,
          total: product.price * cartItems[product.id],
        })),
      paymentMethod: formData.paymentMethod,
      shippingFee: shippingFee,
      totalAmount: getTotalCartAmount() + shippingFee,
      status: "Pending",
    };

    if (formData.paymentMethod === "paynow") {
      await initiateSTKPush(
        formData.phoneNumber,
        orderData.totalAmount,
        orderData
      );
    } else {
      await completeOrder(orderData);
    }
  };

  const initiateSTKPush = async (phone, amount, orderData) => {
    try {
      const response = await fetch(
        "https://kusini-backend-1.onrender.com/stk",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone, amount }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("STK Push sent! Please complete payment on your phone.");
        await completeOrder(orderData);
      } else {
        throw new Error("Error initiating STK Push");
      }
    } catch (error) {
      setErrorMessage("Payment initiation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const completeOrder = async (orderData) => {
    try {
      const response = await fetch(
        "https://kusini-backend-1.onrender.com/createOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (response.ok) {
        alert(
          "Order placed successfully! You will receive your delivery soon."
        );
        resetCart();
        navigate("/");
      } else {
        throw new Error("Error placing order");
      }
    } catch (error) {
      setErrorMessage("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout">
      <div className="checkout_left">
        <h2>Your cart</h2>
        <div className="checkout_cartitems">
          {all_product.every((e) => cartItems[e.id] === 0) ? (
            <p>Your cart is empty.</p>
          ) : (
            all_product.map((e) => {
              if (cartItems[e.id] > 0) {
                return (
                  <div key={e.id} className="checkout_cartitem">
                    <img
                      src={e.image}
                      alt=""
                      className="checkout_product_icon"
                    />
                    <div>
                      <p>{e.name}</p>
                      <p>Quantity: {cartItems[e.id]}</p>
                      <p>Total: Ksh.{e.price * cartItems[e.id]}</p>
                    </div>
                  </div>
                );
              }
              return null;
            })
          )}
        </div>
        <div className="checkout_totals">
          <h3>Cart Totals</h3>
          <p>Sub-Total: Ksh.{getTotalCartAmount()}</p>

          {/* Shipping Fee selection */}
          <hr />
          <div className="checkout_shipping">
            <h4>Delivery Locations</h4>
            <label>
              <input
                type="radio"
                name="shipping"
                value="100"
                onChange={handleShippingChange}
                defaultChecked
              />
              Within Kilifi Town (Ksh. 100)
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="shipping"
                value="200"
                onChange={handleShippingChange}
              />
              Outside Kilifi Town (Ksh. 200)
            </label>
          </div>
          <hr />
          <h3>Total: Ksh.{getTotalCartAmount() + shippingFee}</h3>
        </div>
      </div>

      <div className="checkout_right">
        <h2>Billing address</h2>
        <form className="checkout_billing" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />

          <h3>Payment</h3>
          <div className="checkout_payment_options">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                onChange={handleInputChange}
                required
              />{" "}
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="mpesa"
                onChange={handleInputChange}
                required
              />{" "}
              M-pesa on Delivery
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="paynow"
                onChange={handleInputChange}
                required
              />{" "}
              Pay Now
            </label>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button
            type="submit"
            className="checkout_place_order"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place your Order"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
