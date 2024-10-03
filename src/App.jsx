import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Shop from "./Pages/Shop";
import ShopAllProducts from "./Pages/ShopAllProducts";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer/Footer";
import Checkout from "./Components/Checkout/Checkout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/catalog" element={<ShopAllProducts />} />
          <Route path="/whisky" element={<ShopCategory category="whisky" />} />
          <Route path="/vodka" element={<ShopCategory category="vodka" />} />
          <Route path="/wine" element={<ShopCategory category="wine" />} />
          <Route path="/beers" element={<ShopCategory category="beer" />} />
          <Route
            path="/sodas"
            element={<ShopCategory category="soft_drink" />}
          />
          <Route path="/brandy" element={<ShopCategory category="brandy" />} />
          <Route path="/gin" element={<ShopCategory category="gin" />} />
          <Route
            path="/spirits"
            element={<ShopCategory category="spirits" />}
          />
          <Route path="others" element={<ShopCategory category="others" />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
