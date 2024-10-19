import React from "react";
import "./Footer.css";
// import footer_logo from "../Assets/Lev.jpg";
import instagram_icon from "../Assets/instagram_icon.png";
import facebook_icon from "../Assets/facebook.png";
import whatsapp_icon from "../Assets/whatsapp_icon.png";
import footer_logo from "../Assets/Images/Kusini_logo.jpeg";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const handleLocationClick = () => {
    navigate("/location");
  };
  const handleFAQsClick = () => {
    navigate("/faqs");
  };
  const handleContactClick = () => {
    navigate("/contacts");
  };
  return (
    <div className="footer">
      <div className="footer_logo">
        <img src={footer_logo} alt="" />
      </div>
      <ul className="footer_links">
        <li onClick={handleContactClick}>Contact</li>
        <li onClick={handleFAQsClick}>FAQs</li>
      </ul>
      <div className="footer_social_icon">
        <div className="footer_icon_container">
          <a
            target="_blank"
            href="https://www.instagram.com/kusini_liquor_store/?hl=en"
          >
            <img src={instagram_icon} alt="" />
          </a>
        </div>
        <div className="footer_icon_container">
          <a href="https://web.facebook.com/kusiniliquorstore" target="_blank">
            <img src={facebook_icon} alt="" />
          </a>
        </div>
        <div className="footer_icon_container">
          <a href="https://wa.link/91bxk4">
            <img src={whatsapp_icon} alt="" />
          </a>
        </div>
      </div>
      <div className="footer_copyright">
        <hr />
        <p>Kusini Liquor Store 2024 | All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
