import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';

const AddProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    shopId: parseInt(id)
  });
  const [notice, setNotice] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === 'price' ? parseFloat(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.addProduct(product);
      if (response.ok) {
        // Handle successful response
        setNotice('Product added successfully');
        setProduct({
          name: '',
          description: '',
          price: '',
          image: '',
          shopId: parseInt(id)
        });
        setTimeout(() => setNotice(''), 2000);
      } else {
        // Handle error response
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      {notice && <div>{notice}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={product.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" name="image" value={product.image} onChange={handleChange} required />
        </div>
        <button className="primary-btn" type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
