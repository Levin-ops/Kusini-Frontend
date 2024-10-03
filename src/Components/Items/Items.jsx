import "./Items.css";
import React from "react";
import { Link } from "react-router-dom";

function Items(props) {
  return (
    <div className="items">
      <Link
        to={`/product/${props.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <img onClick={window.scrollTo(0, 0)} src={props.image} alt="" />
      </Link>
      <p>{props.name}</p>
      <div className="item_prices">
        <p>Ksh.{props.price}</p>
      </div>
    </div>
  );
}

export default Items;
