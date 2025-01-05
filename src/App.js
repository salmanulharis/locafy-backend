import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import ManageProducts from './components/Admin/ManageProducts';
import ProductList from './components/Customer/ProductList';
import ManageShops from './components/Admin/ManageShops';
import ShopDetails from './components/Customer/ShopDetails';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/manage-products" element={<ManageProducts />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/admin/manage-shops" element={<ManageShops />} />
          <Route path="/shops/:id" element={<ShopDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
