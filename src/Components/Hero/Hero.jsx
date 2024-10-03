import React from "react";
import "./Hero.css";
import hero_image from "../Assets/Images/Kusini.jpeg";

function Hero() {
  return (
    <div className="hero">
      <div className="hero_left">
        <img src={hero_image} alt="" />
      </div>
      <div className="hero_right">
        <h2>KUSINI LIQUOR</h2>
        <hr />
        <div className="hero_right_desc">
          <p>Welcome to</p>
        </div>
        <p>
          Kilifi's finest shopping spot for all your alcoholic and nonalcoholic
          beverages.
        </p>
      </div>
    </div>
  );
}

export default Hero;
