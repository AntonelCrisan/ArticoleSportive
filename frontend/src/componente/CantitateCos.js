import React, { createContext, useContext, useState } from 'react';

// Creează contextul
const CartContext = createContext();

// Creează un provider pentru a înfășura aplicația
export const CantitateCos = ({ children }) => {
  const [cartQuantity, setCartQuantity] = useState(0);

  return (
    <CartContext.Provider value={{ cartQuantity, setCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizat pentru a folosi contextul
export const useCart = () => useContext(CartContext);
