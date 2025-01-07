import React, { useState } from 'react';
import { api } from '../../services/api';
import './AddUser.css'; // Import the CSS file

const AddUser = () => {
    const [user, setUser] = useState({
        name: '',
        phoneNumber: '',
        type: 'shop_owner' // Default value
    });
    const [notice, setNotice] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await api.addUser(user);
        if (res.ok) {
            // Handle successful user addition
            setNotice('User added successfully');
            setUser({
                name: '',
                phoneNumber: '',
                type: 'shop_owner'
            });
        } else {
            // Handle error
            setNotice('Error adding user');
        }

        // Remove notice after 2 seconds
        setTimeout(() => {
            setNotice('');
        }, 2000);
    };

    return (
        <div className="add-user-container">
            <h1>Add User</h1>
            {notice && <p>{notice}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="text"
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                />
                <select
                    name="type"
                    value={user.type}
                    onChange={handleChange}
                    required
                >
                    <option value="shop_owner">Shop Owner</option>
                    <option value="customer">Customer</option>
                </select>
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default AddUser;