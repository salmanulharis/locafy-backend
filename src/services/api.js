const BASE_URL = 'http://localhost:4000/api';

export const api = {
    login: (phoneNumber) => fetch(`${BASE_URL}/login`, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber })
    }),
    verifyOtp: (otp) => fetch(`${BASE_URL}/login/verify-otp`, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp })
    }),
    getUserById: (userId) => fetch(`${BASE_URL}/users/${userId}`),
    getProductsByShop: (shopId) => fetch(`${BASE_URL}/products/shop/${shopId}`),
    getProductsByPincode: (pincode) => fetch(`${BASE_URL}/products?pincode=${pincode}`),
    getShopDetails: (shopId) => fetch(`${BASE_URL}/shops/${shopId}`),
    getShops: () => fetch(`${BASE_URL}/shops`),
};
