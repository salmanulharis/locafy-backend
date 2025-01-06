import React, { useContext, useEffect, useState } from 'react'
import { api } from '../../services/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState({});
  const loginUser = JSON.parse(localStorage.getItem('locafy-user'));
  const userId = loginUser.userId;
  const navigate = useNavigate();

  const fetchUser = async () => {
    const res = await api.getUserById(parseInt(userId));
    if (res.ok) {
      const data = await res.json();
      setUser(data);
    }
  };

  useEffect(() => {
    fetchUser() 
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome, {user.name}</h2>
      <button onClick={() => navigate('/products')}>Go to Products</button>
      {user.type === 'shop_owner' && (
        <>
        <button onClick={() => navigate('/products/add')}>Add Product</button>
        <button onClick={() => navigate('/shops/add')}>Add Shop</button>
        </>
      )}
    </div>
  )
}

export default Dashboard