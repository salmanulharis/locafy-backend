// src/components/Admin/ManageShops.js
import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

const ManageShops = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      const res = await api.getShops();
      if (res.ok) {
        const data = await res.json();
        setShops(data);
      }
    };
    fetchShops();
  }, []);

  return (
    <div>
      <h2>Manage Shops</h2>
      <ul>
        {shops.map((shop) => (
          <li key={shop.id}>
            <h3>{shop.name}</h3>
            <p>Place: {shop.place}</p>
            <p>Pincode: {shop.pincode}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageShops;
