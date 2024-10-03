import React from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers";
import Newsletter from "../Components/Newsletter/Newsletter";
import TopShelf from "../Components/TopShelf/TopShelf";

function Shop() {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <TopShelf />
      <Newsletter />
    </div>
  );
}

export default Shop;
