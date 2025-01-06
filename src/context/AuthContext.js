import React, { createContext, useState } from 'react';
import { api } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (phoneNumber, otp) => {
    const res = await api.login(phoneNumber);
    if (res.ok) {
      const verified = await api.verifyOtp(otp, phoneNumber);
      if (verified.ok) {
        const data = await verified.json();
        setUser(data);
        return true;
      }
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
