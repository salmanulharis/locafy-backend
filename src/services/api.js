const BASE_URL = 'http://localhost:3000/api';

export const api = {
    login: (phoneNumber) => fetch(`${BASE_URL}/login`, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber })
    }),
    verifyOtp: (otp, phoneNumber) => fetch(`${BASE_URL}/login/verify-otp`, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp, phoneNumber })
    }),
    getUserById: (userId) => fetch(`${BASE_URL}/users/${userId}`),
    getProductsByShop: (shopId) => fetch(`${BASE_URL}/products/shop/${shopId}`),
    getProductsByPincode: (pincode) => fetch(`${BASE_URL}/products?pincode=${pincode}`),
    getShopById: (shopId) => fetch(`${BASE_URL}/shops/${shopId}`),
    getShops: () => fetch(`${BASE_URL}/shops`),
    addShop: (shop) => fetch(`${BASE_URL}/shops`, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shop)
    }),
    getShopByUserId: (userId) => fetch(`${BASE_URL}/shops/user/${userId}`),
    updateShop: (shopId, shop) => fetch(`${BASE_URL}/shops/${shopId}`, { 
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shop)
    }),
    deleteShopById: (shopId) => fetch(`${BASE_URL}/shops/${shopId}`, { method: 'DELETE' }),
};
