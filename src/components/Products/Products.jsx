import React, { useEffect, useState } from "react";
import { FaStar, FaWhatsapp } from "react-icons/fa";

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://reactpage-ca865-default-rtdb.firebaseio.com/ezybackers.json"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        // Assuming the data structure matches the ProductsData array structure
        const updatedData = Object.values(data).map((item, index) => ({
          ...item,
          id: index + 1,
        }));

        setProductsData(updatedData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleWhatsAppClick = (whatsappNumber) => {
    // You can implement the logic to open the WhatsApp chat with the provided number
    // This could involve using a library like 'react-whatsapp-widget' or directly linking to WhatsApp
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <div className="container mt-10 mb-10">
      <div className="text-center mb-5">
        <h1 className="text-3xl font-bold">Top Selling Products</h1>
        <p className="text-gray-600">Discover our latest products</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {productsData.map((data) => (
          <div key={data.id} className="bg-white shadow-md rounded-md overflow-hidden">
            <img
              src={data.imageURL}
              alt=""
              className="h-[220px] w-[150px] w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{data.itemName}</h3>
              <p className="text-sm text-gray-600 mb-2">{data.color}</p>
              <div className="flex items-center mb-2">
                <FaStar className="text-yellow-400" />
                <span className="ml-1">{data.rating}</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Price: ${data.price}</p>
                  <p className="text-sm font-semibold text-gray-700">Quantity: {data.quantity}</p>
                </div>
                <button 
                  className="p-2 bg-green-500 text-white rounded-full hover:bg-green-500 flex items-center"
                  onClick={() => handleWhatsAppClick(data.whatsappNumber)}
                >
                  <FaWhatsapp size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
