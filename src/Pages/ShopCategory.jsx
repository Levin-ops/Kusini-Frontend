import React, { useContext, useState } from "react";
import "../Pages/CSS/ShopCategory.css";
import all_product from "../Components/Assets/all_product";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import { ShopContext } from "../Context/ShopContext";
import Items from "../Components/Items/Items";

function ShopCategory(props) {
  const { all_product } = useContext(ShopContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [sortCriteria, setSortCriteria] = useState("name");

  const filteredAndSortedProducts = all_product
    .filter(
      (item) =>
        props.category === item.category &&
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
  const handleSortCriteriaChange = () => {
    setSortCriteria(event.target.value);
  };
  const handleSortChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="shop_category">
      <div className="shopcategory_indexSort">
        <div className="shopcategory_search">
          <input
            type="text"
            placeholder="Search Drinks..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="shopcategory_sort">
          <select value={sortCriteria} onChange={handleSortCriteriaChange}>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
          <button onClick={handleSortChange}>
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </button>
        </div>
      </div>
      <div className="shopcategory_products">
        {filteredAndSortedProducts.map((item, i) => (
          <Items
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default ShopCategory;
