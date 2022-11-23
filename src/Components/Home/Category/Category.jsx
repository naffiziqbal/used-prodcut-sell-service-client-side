import React from "react";
import { Link } from "react-router-dom";

const Category = ({ category }) => {
    const {title, decription, img,_id} = category
    // console.log(_id);
  // console.log(category);
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={img} alt="Bike" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {title}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>{decription}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">
            <Link to={`/products/category/${_id}`}>
            See Category
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
