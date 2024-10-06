import React, { useContext, useState, useEffect } from "react";
import "../Pages/CSS/ShopAllProducts.css";
import { ShopContext } from "../Context/ShopContext";
import Items from "../Components/Items/Items";

function ShopAllProducts() {
  const { all_product } = useContext(ShopContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortCriteria, setSortCriteria] = useState("name");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (all_product.length > 0) {
      setLoading(false); // Stop loading once products are available
    }
  }, [all_product]);

  const filteredAndSortedProducts = all_product
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      } else if (sortCriteria === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
    });

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortCriteriaChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="shop_all_products">
      <div className="shopallproducts_indexSort">
        <div className="shopallproducts_search">
          <input
            type="text"
            placeholder="Search Drinks..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="shopallproducts_sort">
          <select value={sortCriteria} onChange={handleSortCriteriaChange}>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
          <button onClick={handleSortChange}>
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </button>
        </div>
      </div>
      <div className="shopallproducts_products">
        {loading ? (
          <div className="loading-animation">Loading products...</div> // Display loading animation
        ) : (
          filteredAndSortedProducts.map((item, i) => (
            <Items
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ShopAllProducts;
