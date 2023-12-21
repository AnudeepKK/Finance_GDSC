// PhoneNumberContext.js
import React, { createContext, useContext, useState } from 'react';

const PhoneNumberContext = createContext();

export const PhoneNumberProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <PhoneNumberContext.Provider value={{ phoneNumber, setPhoneNumber }}>
      {children}
    </PhoneNumberContext.Provider>
  );
};

export const usePhoneNumber = () => {
  const context = useContext(PhoneNumberContext);
  if (!context) {
    throw new Error('usePhoneNumber must be used within a PhoneNumberProvider');
  }
  return context;
};
