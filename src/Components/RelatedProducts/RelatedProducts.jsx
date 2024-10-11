import React, { useState, useEffect } from "react";
import "./RelatedProducts.css";
import Items from "../Items/Items";

function RelatedProducts({ product }) {
  const [loading, setLoading] = useState(true);
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    if (product) {
      // Fetch related products from the backend
      fetch(
        `https://kusini-backend-1.onrender.com/products/relatedproducts?category=${product.category}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Filter out the current product from the related products
          const filteredProducts = data
            .filter((item) => item.id !== product.id)
            .slice(0, 4);
          setRelatedProduct(filteredProducts);
        })
        .catch((error) => {
          console.error("Error fetching related products:", error);
        })
        .finally(() => {
          setLoading(false); // Data processing complete, stop loading
        });
    } else {
      setLoading(false); // If no product, stop loading
    }
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
