// src/components/Customer/ShopDetails.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import './ShopDetails.css';

const ShopDetails = () => {
  const loginUser = JSON.parse(localStorage.getItem('locafy-user'));
  const userId = loginUser.userId;
  const [shops, setShops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShopDetails = async () => {
      // Fetch shop details using the user ID
      const shopRes = await api.getShopByUserId(userId);
      if (shopRes.ok) {
        const shopData = await shopRes.json();
        if (shopData.length > 0) {
          setShops(shopData);
        } else {
          navigate('/shops/add');
        }
      } else {
        navigate('/shops/add');
      }
    };
    fetchShopDetails();
  }, [userId, navigate]);

  const handleEdit = (shopId) => {
    navigate(`/shops/edit/${shopId}`);
  };

  const handleDelete = async (shopId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this shop?');
    if (confirmDelete) {
      const deleteRes = await api.deleteShopById(shopId);
      if (deleteRes.ok) {
        setShops(shops.filter(shop => shop.id !== shopId));
      } else {
        alert('Failed to delete the shop. Please try again.');
      }
    }
  };

  const handleView = (shopId) => {
    navigate(`/shops/view/${shopId}`);
  };

  return (
    <div className="shop-details-container">
      {shops.length > 0 ? (
        shops.map((shop) => (
          <div key={shop.id} className="shop-details">
            <h2>{shop.name}</h2>
            <p>Address: {shop.address}</p>
            <p>Place: {shop.place}</p>
            <p>Phone: {shop.phone}</p>
            <div>Pincode: {shop.pincode}</div>
            <div className="shop-actions">
              <button onClick={() => handleView(shop.id)}>View</button>
              <button onClick={() => handleEdit(shop.id)}>Edit</button>
              <button onClick={() => handleDelete(shop.id)}>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p>Loading shop details...</p>
      )}
    </div>
  );
};

export default ShopDetails;
