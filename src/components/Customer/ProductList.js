import React, { useState } from 'react';
import { api } from '../../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [pincode, setPincode] = useState('');

  const fetchProducts = async () => {
    const res = await api.getProductsByPincode(pincode);
    if (res.ok) {
      const data = await res.json();
      setProducts(data);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <input
        type="text"
        placeholder="Enter Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />
      <button onClick={fetchProducts}>Search</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <a href={`/shops/${product.shopId}`}>Shop Details</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;