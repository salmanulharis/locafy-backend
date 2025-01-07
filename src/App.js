import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Provider } from 'react-redux';  // Import Provider
import store from './redux/store';  // Import your store
import Login from './components/Auth/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import ManageProducts from './components/Admin/ManageProducts';
import ProductList from './components/Customer/ProductList';
import ManageShops from './components/Admin/ManageShops';
import ShopDetails from './components/Customer/ShopDetails';
import Dashboard from './components/Common/Dashboard';
import AddProduct from './components/Common/AddProduct';
import AddShop from './components/Common/AddShop';
import ViewShop from './components/Common/ViewShop';
import ViewProduct from './components/Common/ViewProduct';
import NavBar from './components/Common/NavBar';  // Import NavBar

const App = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Router>
          <NavBar />  {/* Include NavBar here */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/manage-products" element={<ManageProducts />} />
            <Route path="/products/:id" element={<ProductList />} />
            <Route path="/products/add/:id" element={<AddProduct />} />
            <Route path="/product/:id" element={<ViewProduct />} />
            <Route path="/admin/manage-shops" element={<ManageShops />} />
            <Route path="/shops/add" element={<AddShop />} />
            <Route path="/shops/edit/:id" element={<AddShop />} />
            <Route path="/shops/view/:id" element={<ViewShop />} />
            <Route path="/shops" element={<ShopDetails />} />
          </Routes>
        </Router>
      </Provider>
    </AuthProvider>
  );
};

export default App;
