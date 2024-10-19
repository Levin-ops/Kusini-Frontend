import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import shop_logo from "../Assets/Images/Kusini_logo.jpeg";
import { BsCart } from "react-icons/bs";
import { BsJustify } from "react-icons/bs";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getActiveMenu = (path) => {
    if (path.startsWith("/beers")) return "beers";
    if (path.startsWith("/brandy")) return "brandy";
    if (path.startsWith("/gin")) return "gin";
    if (path.startsWith("/sodas")) return "sodas";
    if (path.startsWith("/spirits")) return "spirits";
    if (path.startsWith("/vodka")) return "vodka";
    if (path.startsWith("/whisky")) return "whisky";
    if (path.startsWith("/wine")) return "wine";
    if (path.startsWith("/others")) return "others";
    return "shop";
  };

  const [menu, setMenu] = useState("");

  useEffect(() => {
    setMenu(getActiveMenu(location.pathname));
  }, [location.pathname]);

  return (
    <div className="navbar">
      <div className="nav_logo">
        <img onClick={handleLogoClick} src={shop_logo} alt="" />{" "}
      </div>
      <ul className={`nav_menu ${isMenuOpen ? "open" : ""}`}>
        <li
          onClick={() => {
            setMenu("shop");
            setIsMenuOpen(false);
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            Shop
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>

        <li
          onClick={() => {
            setMenu("beers");
            setIsMenuOpen(false);
          }}
        >
          <Link to="/beers" style={{ textDecoration: "none", color: "black" }}>
            Beers
          </Link>
          {menu === "beers" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("brandy");
            setIsMenuOpen(false);
          }}
        >
          <Link to="/brandy" style={{ textDecoration: "none", color: "black" }}>
            Brandy
          </Link>
          {menu === "brandy" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("gin");
            setIsMenuOpen(false);
          }}
        >
          <Link to="/gin" style={{ textDecoration: "none", color: "black" }}>
            Gin
          </Link>
          {menu === "gin" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("sodas");
            setIsMenuOpen(false);
          }}
        >
          <Link to="/sodas" style={{ textDecoration: "none", color: "black" }}>
            Soft Drinks
          </Link>
          {menu === "sodas" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("spirits");
            setIsMenuOpen(false);
          }}
        >
          <Link
            to="/spirits"
            style={{ textDecoration: "none", color: "black" }}
          >
            Spirits
          </Link>
          {menu === "spirits" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("vodka");
            setIsMenuOpen(false);
          }}
        >
          <Link to="/vodka" style={{ textDecoration: "none", color: "black" }}>
            Vodka
          </Link>
          {menu === "vodka" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("whisky");
            setIsMenuOpen(false);
          }}
        >
          <Link to="/whisky" style={{ textDecoration: "none", color: "black" }}>
            Whisky
          </Link>
          {menu === "whisky" ? <hr /> : <></>}
        </li>

        <li
          onClick={() => {
            setMenu("wine");
            setIsMenuOpen(false);
          }}
        >
          <Link to="/wine" style={{ textDecoration: "none", color: "black" }}>
            Wine
          </Link>
          {menu === "wine" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("others");
            setIsMenuOpen(false);
          }}
        >
          <Link to="/others" style={{ textDecoration: "none", color: "black" }}>
            Others
          </Link>
          {menu === "others" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav_login_cart">
        <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
          <BsCart className="icon" />
        </Link>
        <div className="nav_cart_count">{getTotalCartItems()}</div>

        <div className="hamburger" onClick={toggleMenu}>
          <BsJustify />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
