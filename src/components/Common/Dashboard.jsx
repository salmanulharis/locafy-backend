import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
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
    fetchUser();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome, {user.name}</h2>
      {user.type === 'shop_owner' && (
        <button onClick={() => navigate('/shops')}>Go to Shops</button>
      )}
    </div>
  );
};

export default Dashboard;
