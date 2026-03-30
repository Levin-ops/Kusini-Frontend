import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import shop_logo from "../Assets/Images/Kusini_logo.jpeg";
import { BsCart } from "react-icons/bs";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();

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

  const navLinks = [
    { label: "Shop", to: "/", key: "shop", icon: "🛍️" },
    { label: "Beers", to: "/beers", key: "beers", icon: "🍺" },
    { label: "Brandy", to: "/brandy", key: "brandy", icon: "🥃" },
    { label: "Gin", to: "/gin", key: "gin", icon: "🍸" },
    { label: "Soft Drinks", to: "/sodas", key: "sodas", icon: "🥤" },
    { label: "Spirits", to: "/spirits", key: "spirits", icon: "🍾" },
    { label: "Vodka", to: "/vodka", key: "vodka", icon: "🍸" },
    { label: "Whisky", to: "/whisky", key: "whisky", icon: "🥃" },
    { label: "Wine", to: "/wine", key: "wine", icon: "🍷" },
    { label: "Others", to: "/others", key: "others", icon: "✨" },
  ];

  const mobileGroup1 = navLinks.slice(0, 5);
  const mobileGroup2 = navLinks.slice(5);

  return (
    <nav className="sticky top-0 z-50 bg-[#0d0d0d]/90 backdrop-blur-md border-b border-[#b07506]/25 relative w-full">
      {/* Gold top line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#b07506] to-transparent" />

      {/* Main navbar row */}
      <div className="flex items-center justify-between px-8 h-[68px] max-w-[1400px] mx-auto">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer flex-shrink-0"
          onClick={() => navigate("/")}
        >
          <div className="w-full h-[42px] rounded-lg  border-[#b07506]/50 overflow-hidden flex-shrink-1">
            <img
              src={shop_logo}
              alt="Kusini Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center list-none gap-4">
          {navLinks.map(({ label, to, key }) => (
            <li key={key}>
              <Link
                to={to}
                onClick={() => setMenu(key)}
                className={`
                  flex flex-col items-center px-3 py-1.5 rounded-md text-[20px] font-medium 
                  tracking-wide transition-all duration-200 no-underline
                  ${
                    menu === key
                      ? "text-[#e8a820] bg-[#b07506]/12"
                      : "text-[#f5f0e8]/65 hover:text-[#f5f0e8] hover:bg-white/6"
                  }
                `}
              >
                {label}
                {menu === key && (
                  <span className="block w-4 h-[2px] bg-[#b07506] rounded-full mt-1" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side — Cart + Hamburger */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-lg 
                       border border-[#b07506]/30 bg-[#b07506]/8 text-[#f5f0e8] 
                       hover:bg-[#b07506]/16 hover:border-[#b07506]/60 
                       transition-all duration-200 no-underline"
          >
            <BsCart className="text-[#e8a820] text-lg" />
            {getTotalCartItems() > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] 
                               bg-[#b07506] rounded-full text-[10px] font-medium text-white 
                               flex items-center justify-center px-1 
                               border-2 border-[#0d0d0d]"
              >
                {getTotalCartItems()}
              </span>
            )}
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col gap-[5px] p-2 rounded-md cursor-pointer 
                       bg-white/5 transition-all"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[1.5px] bg-[#f5f0e8] rounded transition-transform duration-250
                              ${isMenuOpen ? "translate-y-[6.5px] rotate-45" : ""}`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-[#f5f0e8] rounded transition-opacity duration-250
                              ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-[#f5f0e8] rounded transition-transform duration-250
                              ${isMenuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#0f0f0f] border-t border-[#b07506]/20">
          {/* Header label */}
          <div
            className="px-4 pt-3 pb-2 text-[16px] font-medium tracking-[1.5px] 
                    uppercase text-[#b07506]/70 border-b border-[#b07506]/10"
          >
            Browse Categories
          </div>

          {/* 2-column tile grid */}
          <div className="grid grid-cols-2 gap-3 p-3">
            {navLinks.map(({ label, to, key, icon }) => (
              <Link
                key={key}
                to={to}
                onClick={() => {
                  setMenu(key);
                  setIsMenuOpen(false);
                }}
                className={`relative flex flex-col items-center justify-center gap-4 
                      py-4 px-2 rounded-xl no-underline transition-all duration-200
                      overflow-hidden
                      ${
                        menu === key
                          ? "bg-[#b07506]/14 border border-[#b07506]/45"
                          : "bg-white/4 border border-white/8"
                      }`}
              >
                {/* Gold top bar on active */}
                {menu === key && (
                  <span
                    className="absolute top-0 left-0 right-0 h-[2px] 
                             bg-gradient-to-r from-[#b07506] to-[#e8a820]"
                  />
                )}

                <span className="text-2xl">{icon}</span>

                <span
                  className={`text-xs font-medium text-center
                            ${menu === key ? "text-[#e8a820]" : "text-[#f5f0e8]/65"}`}
                >
                  {label}
                </span>

                {/* Active dot */}
                {menu === key && (
                  <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-[#b07506]" />
                )}
              </Link>
            ))}
          </div>

          {/* Cart footer strip */}
          <div
            className="mx-3 mb-3 px-4 py-3 bg-[#b07506]/6 
                    border border-[#b07506]/20 flex items-center justify-between"
          >
            <div className="">
              <p className="text-[11px] text-[#f5f0e8]/50">Your cart has:</p>
              <p className="text-[13px] font-medium text-[#f5f0e8]">
                {getTotalCartItems()} item/s
              </p>
            </div>
            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="bg-[#b07506] text-white text-xs font-medium 
                   px-4 py-2 rounded-sm no-underline hover:bg-[#e8a820] 
                   transition-colors duration-200"
            >
              View Cart→
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
