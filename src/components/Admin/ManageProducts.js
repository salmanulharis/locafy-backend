import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.getProductsByShop(1); // Replace 1 with dynamic shop ID.
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Manage Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;