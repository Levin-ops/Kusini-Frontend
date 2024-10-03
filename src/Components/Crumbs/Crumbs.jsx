import React from "react";
import "./Crumbs.css";
import arrow_icon from "../Assets/crumb_arrow.png";

function Crumbs(props) {
  const { product } = props;

  if (!product) {
    return <div>Loading breadcrumbs...</div>;
  }

  return (
    <div className="crumbs">
      Home <img src={arrow_icon} alt="" /> Shop <img src={arrow_icon} alt="" />
      {product.category} <img src={arrow_icon} alt="" /> {product.name}
    </div>
  );
}

export default Crumbs;
