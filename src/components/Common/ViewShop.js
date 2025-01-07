import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import './ViewShop.css';

const ViewShop = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [shop, setShop] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchShopDetails = async () => {
            try {
                const shopRes = await api.getShopById(id);
                if (shopRes.ok) {
                    const shopData = await shopRes.json();
                    setShop(shopData);
                } else {
                    navigate('/shops');
                }
            } catch (error) {
                console.error('Error fetching shop details:', error);
                navigate('/shops');
            }
        };

        const fetchProducts = async () => {
            try {
                const productsRes = await api.getProductsByShop(id);
                if (productsRes.ok) {
                    const productsData = await productsRes.json();
                    setProducts(productsData);
                } else {
                    console.error('Error fetching products');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchShopDetails();
        fetchProducts();
    }, [id, navigate]);

    const handleDelete = async () => {
        try {
            const deleteRes = await api.deleteShopById(id);
            if (deleteRes.ok) {
                navigate('/shops/');
            } else {
                console.error('Error deleting shop');
            }
        } catch (error) {
            console.error('Error deleting shop:', error);
        }
    };

    if (!shop) {
        return <div>Loading...</div>;
    }

    return (
        <div className="shop-details-container">
            <div className="shop-details">
                <h1>{shop.name}</h1>
                <p>{shop.place}</p>
                <p>{shop.phone}</p>
                <p>{shop.pincode}</p>
                <div>{shop.address}</div>
                <div className="shop-actions">
                    <button className='add-button' onClick={() => navigate(`/products/add/${id}`)}>Add Product</button>
                    <button className="edit-button" onClick={() => navigate(`/shops/edit/${id}`)}>Edit Shop</button>
                    <button className="delete-button" onClick={handleDelete}>Delete Shop</button>
                </div>
            </div>
            <div className="shop-products">
                <h2>Products</h2>
                {products.length > 0 ? (
                    <ul className="products-list">
                        {products.map(product => (
                            <li key={product.id} className="product">
                                {product.name}
                                <button className='view-product primary-btn' onClick={() => navigate(`/product/${product.id}`)}>View Product</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No products found for this shop.</p>
                )}
            </div>
        </div>
    );
};

export default ViewShop;