import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const loginUser = JSON.parse(localStorage.getItem('locafy-user'));

  useEffect(() => {
    if (!loginUser) {
      navigate('/login');
    } else {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    const userId = loginUser.userId;
    const res = await api.getUserById(parseInt(userId));
    if (res.ok) {
      const data = await res.json();
      setUser(data);
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <h2>Welcome, {user.name}</h2>
      {user.type === 'shop_owner' && (
        <div className='shop-owner-actions'>
          <button className='primary-btn' onClick={() => navigate('/shops')}>Go to Shops</button>
          <button className='primary-btn' onClick={() => navigate('/shops/add')}>Add Shop</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
