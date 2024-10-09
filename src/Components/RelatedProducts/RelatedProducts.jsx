import React, { useState, useEffect } from "react";
import "./RelatedProducts.css";
import all_product from "../Assets/all_product";
import Items from "../Items/Items";

function RelatedProducts({ product }) {
  const [loading, setLoading] = useState(true);
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    if (product) {
      const filteredProducts = all_product
        .filter(
          (item) => item.category === product.category && item.id !== product.id
        )
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

      setRelatedProduct(filteredProducts);
    }
    setLoading(false); // Data processing complete, stop loading
  }, [product]);

  if (!product) {
    return (
      <div className="related_products">No related products available.</div>
    );
  }

  return (
    <div className="related_products">
      <h1>Related Products</h1>
      <hr />
      <div className="related_products_item">
        {loading ? (
          <div className="loading-animation">Loading related products...</div> // Display a loading animation
        ) : relatedProduct.length > 0 ? (
          relatedProduct.map((item) => (
            <Items
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </div>
  );
}

export default RelatedProducts;
