// context/WishlistContext.js
import React, { createContext, useReducer, useContext } from 'react';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      if (state.find((item) => item.id === action.payload.id)) return state;
      return [...state, action.payload];
    case 'REMOVE_FROM_WISHLIST':
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, dispatchWishlist] = useReducer(wishlistReducer, []);
  return (
    <WishlistContext.Provider value={{ wishlist, dispatchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
