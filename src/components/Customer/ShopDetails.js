// src/components/Customer/ShopDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';

const ShopDetails = () => {
  const { id } = useParams(); // Shop ID from URL
  const [shop, setShop] = useState(null);

  useEffect(() => {
    const fetchShopDetails = async () => {
      const res = await api.getShopDetails(id);
      if (res.ok) {
        const data = await res.json();
        setShop(data);
      }
    };
    fetchShopDetails();
  }, [id]);

  return (
    <div>
      {shop ? (
        <>
          <h2>{shop.name}</h2>
          <p>Address: {shop.address}</p>
          <p>Place: {shop.place}</p>
          <p>Phone: {shop.phone}</p>
        </>
      ) : (
        <p>Loading shop details...</p>
      )}
    </div>
  );
};

export default ShopDetails;
