import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { api } from '../../services/api';

const AddShop = () => {
    const [shop, setShop] = useState({
        name: '',
        place: '',
        pincode: '',
        address: '',
        location: '',
        phone: '',
        userId: ''
    });
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    useEffect(() => {
        const fetchUser = async () => {
            const loginUser = JSON.parse(localStorage.getItem('locafy-user'));
            const userId = loginUser.userId;
            const res = await api.getUserById(parseInt(userId));
            if (res.ok) {
                const data = await res.json();
                setShop((prevShop) => ({
                    ...prevShop,
                    userId: data.id
                }));
                if (!id && !location.pathname.includes('add')) {
                    const shopRes = await api.getShopByUserId(userId);
                    if (shopRes.ok) {
                        const shopData = await shopRes.json();
                        setShop(shopData);
                        setIsEdit(true);
                    }
                }
            }
        };

        const fetchShop = async () => {
            const res = await api.getShopById(id);
            if (res.ok) {
                const data = await res.json();
                setShop(data);
                setIsEdit(true);
            }
        };

        fetchUser();
        if (id) {
            fetchShop();
        } else if (location.pathname.includes('add')) {
            setIsEdit(false);
        }
    }, [id, location.pathname]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShop({
            ...shop,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = isEdit ? await api.updateShop(id || shop.id, shop) : await api.addShop(shop);
            if (response.ok) {
                navigate('/shops');
            } else {
                alert(`Failed to ${isEdit ? 'update' : 'create'} shop`);
            }
        } catch (error) {
            console.error(`Error ${isEdit ? 'updating' : 'creating'} shop:`, error);
            alert(`An error occurred while ${isEdit ? 'updating' : 'creating'} the shop`);
        }
    };

    return (
        <div>
            <h1>{isEdit ? 'Edit Shop' : 'Add Shop'}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={shop.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="place"
                    placeholder="Place"
                    value={shop.place}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={shop.pincode}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={shop.address}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={shop.location}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={shop.phone}
                    onChange={handleChange}
                    required
                />
                <button className='primary-btn' type="submit">{isEdit ? 'Update Shop' : 'Add Shop'}</button>
            </form>
        </div>
    );
};

export default AddShop;