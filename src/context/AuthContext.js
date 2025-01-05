import React, { createContext, useState } from 'react';
import { api } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (phoneNumber, otp) => {
    const res = await api.login(phoneNumber);
    if (res.ok) {
      const verified = await api.verifyOtp(otp);
      if (verified.ok) {
        const data = await verified.json();
        const dummyData = await api.getUserById(1);
        console.log(dummyData);
        setUser(dummyData);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};