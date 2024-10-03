import React from "react";
import "./Offers.css";
import exclusive_image from "../Assets/Images/Johnnie_Walker_Double_Black_Label.jpeg";
import { useNavigate } from "react-router-dom";

function Offers() {
  const navigate = useNavigate();

  const handleOrderNowClick = () => {
    navigate("/catalog");
  };
  return (
    <div className="offers">
      <div className="offers_left">
        <h1>CATALOG</h1>
        <h1> View Our Wide Collection</h1>
        <p>ALL IN ONE PLACE </p>
        <button onClick={handleOrderNowClick}>Order Now</button>
      </div>
      <div className="offers_right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  );
}

export default Offers;
