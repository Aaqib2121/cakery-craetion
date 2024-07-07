// ProductDetail.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://reactpage-ca865-default-rtdb.firebaseio.com/ezybackers/${productId}.json`
        );

        // Assuming the response data is the product details
        setProductDetails(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <div>
      {productDetails ? (
        <div>
          <h2>Product Details for Product ID: {productId}</h2>
          <h3>{productDetails.itemName}</h3>
          <p>Quantity: {productDetails.quantity}</p>
          <p>Price: {productDetails.price}</p>
          {/* Display other product details here */}
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetail;
