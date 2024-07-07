import React from "react";

const ProductDetail = ({ product }) => {
  return (
    <div className="flex">
      <div className="w-1/2">
        <img src={product.imageURL} alt={product.itemName} className="h-auto w-full" />
      </div>
      <div className="w-1/2">
        <h2 className="text-2xl font-bold">{product.itemName}</h2>
        <p className="text-gray-600">{product.color}</p>
        <div className="flex items-center gap-1">
          <FaStar className="text-yellow-400" />
          <span>{product.rating}</span>
        </div>
        {/* Add more details here as needed */}
      </div>
    </div>
  );
};

export default ProductDetail;
