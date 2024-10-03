import React from "react";
import "./Newsletter.css";
function Newsletter() {
  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers Straight to your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div>
        <input type="email" placeholder="your email address" />
        <button>Subscribe</button>
      </div>
    </div>
  );
}

export default Newsletter;
