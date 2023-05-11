import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ item, image, name }) => {
  return (
    <Link to={`/item/${item.id}`} className="text-decoration-none m-4 icon-link icon-link-hover" style={{ transform: 'var(--bs-icon-link-transform)' }}>
      <div className="card bg-transparent" style={{ Width: "18rem", Height: "18rem" }}>
        <div className="position-relative">
          <img
            src={image}
            className="card-img-top"
            alt={name}
            style={{ height: "12rem", objectFit: "cover" }}
          />
          <div className="position-absolute top-50 start-50 translate-middle">
            <h5 className="card-title text-uppercase text-black fw-bold">
              {name}
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
