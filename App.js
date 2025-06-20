import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <CartProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </CartProvider>
      </WishlistProvider>
    </ThemeProvider>
  );
}
