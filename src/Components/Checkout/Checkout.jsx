import React, { useContext, useState } from "react";
import "./Checkout.css";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { getTotalCartAmount, all_product, cartItems, resetCart } =
    useContext(ShopContext);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shippingFee, setShippingFee] = useState(100); // Default to within Kilifi
  const navigate = useNavigate();

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  // Handle shipping fee change
  const handleShippingChange = (e) => {
    const selectedFee = parseInt(e.target.value);
    setShippingFee(selectedFee);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      customer: {
        firstName: e.target[0].value,
        lastName: e.target[1].value,
        phoneNumber: phoneNumber,
      },
      items: all_product
        .map((product) => {
          if (cartItems[product.id] > 0) {
            return {
              productId: product.id,
              name: product.name,
              quantity: cartItems[product.id],
              price: product.price,
              total: product.price * cartItems[product.id],
            };
          }
          return null;
        })
        .filter(Boolean), // Filter out null values
      paymentMethod: paymentMethod,
      shippingFee: shippingFee,
      totalAmount: getTotalCartAmount() + shippingFee,
      status: "Pending", // Set initial status to Pending
    };

    // If payment method is Pay Now, initiate STK Push
    if (paymentMethod === "paynow") {
      initiateSTKPush(phoneNumber, orderData.totalAmount, orderData);
    } else {
      completeOrder(orderData);
    }
  };

  const initiateSTKPush = async (phone, amount, orderData) => {
    try {
      const response = await fetch("http://localhost:4000/stk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phone,
          amount: amount,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`STK Push initiated: ${data}`);
        alert("STK Push sent! Please complete payment on your phone.");
        completeOrder(orderData);
      } else {
        console.error("Error initiating STK Push:", response.statusText);
        alert("Payment initiation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error initiating STK Push:", error);
      alert("Payment initiation failed. Please try again.");
    }
  };

  const completeOrder = async () => {
    const orderData = {
      customer: {
        firstName: document.querySelector('input[placeholder="First name"]')
          .value,
        lastName: document.querySelector('input[placeholder="Last name"]')
          .value,
        phoneNumber: phoneNumber,
      },
      items: all_product
        .filter((e) => cartItems[e.id] > 0)
        .map((e) => ({
          productId: e.id,
          name: e.name,
          quantity: cartItems[e.id],
          price: e.price,
          total: e.price * cartItems[e.id],
        })),
      paymentMethod: paymentMethod,
      shippingFee: shippingFee,
      totalAmount: getTotalCartAmount() + shippingFee,
    };

    try {
      const response = await fetch("http://localhost:4000/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Order created:", data);
        alert(
          "Order placed successfully! You will receive your delivery soon."
        );
        resetCart();
        navigate("/");
      } else {
        console.error("Error placing order:", response.statusText);
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="checkout">
      <div className="checkout_left">
        <h2>Your cart</h2>
        <div className="checkout_cartitems">
          {all_product.map((e) => {
            if (cartItems[e.id] > 0) {
              return (
                <div key={e.id} className="checkout_cartitem">
                  <img src={e.image} alt="" className="checkout_product_icon" />
                  <div>
                    <p>{e.name}</p>
                    <p>Quantity: {cartItems[e.id]}</p>
                    <p>Total: Ksh.{e.price * cartItems[e.id]}</p>
                  </div>
                </div>
              );
            }
            return null;
          })}
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
          <input type="text" placeholder="First name" required />
          <input type="text" placeholder="Last name" required />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            required
          />

          <h3>Payment</h3>
          <div className="checkout_payment_options">
            <label>
              <input
                type="radio"
                name="payment"
                value="cod"
                onChange={handlePaymentChange}
                required
              />{" "}
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="mpesa"
                onChange={handlePaymentChange}
                required
              />{" "}
              M-pesa on Delivery
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="paynow"
                onChange={handlePaymentChange}
                required
              />{" "}
              Pay Now
            </label>
          </div>
          <button type="submit" className="checkout_place_order">
            Place your Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
