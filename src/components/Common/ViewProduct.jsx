import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import './ViewProduct.css'; 

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    shopId: parseInt(id)
  });
  const [shopName, setShopName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.getProduct(id);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
        const shopRes = await api.getShopById(data.shopId);
        if (shopRes.ok) {
          const shopData = await shopRes.json();
          setShopName(shopData.name);
        }
      }
    };
    fetchProduct();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    const res = await api.deleteProduct(id);
    if (res.ok) {
      navigate(`/shops/view/${product.shopId}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.updateProduct(id, product);
    if (res.ok) {
      setIsEditing(false);
      const updatedProduct = await res.json();
      setProduct(updatedProduct);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  return (
    <div className="product-details-container">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
          />
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Image URL"
          />
          <button type="submit">Update</button>
        </form>
      ) : (
        <div className="product-details">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <img src={product.image} alt={product.name} />
          <p>Shop: {shopName}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ViewProduct;