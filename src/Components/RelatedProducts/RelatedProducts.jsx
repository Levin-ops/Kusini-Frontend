import React, { useContext, useState, useEffect } from "react";
import "./RelatedProducts.css";
import Items from "../Items/Items";
import { ShopContext } from "../../Context/ShopContext";

function RelatedProducts({ product }) {
  const { all_product } = useContext(ShopContext);
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    if (product && all_product.length > 0) {
      const filteredProducts = all_product.filter(
        (item) => item.category === product.category && item.id !== product.id
      );

      const shuffledProducts = filteredProducts.sort(() => 0.5 - Math.random());

      const randomProducts = shuffledProducts.slice(0, 4);

      setRelatedProduct(randomProducts);
    }
  }, [product, all_product]);

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
        {relatedProduct.length > 0 ? (
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
