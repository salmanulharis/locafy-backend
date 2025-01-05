import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <Link to="/admin/manage-products">Manage Products</Link>
        <Link to="/admin/manage-shops">Manage Shops</Link>
      </nav>
    </div>
  );
};

export default AdminDashboard;