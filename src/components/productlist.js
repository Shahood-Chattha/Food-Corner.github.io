import React from "react";
import { useSelector } from "react-redux";
import CategoryCard from "./common/categorycard";

function ProductsList() {
  const products = useSelector((state) => state.product.products);
  const status = useSelector((state) => state.product.status);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="d-flex justify-content-evenly">
      {products.map((item) => {
        return (
          <div className="col mb-4" key={item.id}>
            <CategoryCard
              item={item}
              name={item.attributes.name}
              image={`http://localhost:1337${item.attributes.image.data[0].attributes?.url}`}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ProductsList;
