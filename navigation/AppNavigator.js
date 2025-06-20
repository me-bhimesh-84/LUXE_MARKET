import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import MainApp from './MainApp';
import ProductListScreen from '../screens/home/ProductListScreen';
import ProductDetailsScreen from '../screens/home/ProductDetailsScreen';
import CheckoutScreen from '../screens/cart/CheckoutScreen';
import WishlistScreen from '../screens/wishlist/WishlistScreen';
import OrdersScreen from '../screens/orders/OrdersScreen';
import TrackOrderScreen from '../screens/orders/TrackOrderScreen';
// import LuxeClubScreen from '../screens/LuxeClubScreen';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      {/* Screens with header hidden (splash/auth/main) */}
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />

      {/* Product List with dynamic category title & back button */}
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={({ route }) => ({
          title: `${route.params.category}`,
          headerStyle: { backgroundColor: '#051004' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        })}
      />

      {/* Product Details screen */}
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          title: 'Product Details',
          headerStyle: { backgroundColor: '#051004' },
          headerTintColor: '#c98ce3',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
  name="Wishlist"
  component={WishlistScreen}
  options={{
    title: 'My Wishlist',
    headerStyle: { backgroundColor: '#051004' },
    headerTintColor: '#c98ce3',
    headerTitleStyle: { fontWeight: 'bold' },
  }}
/>
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          headerShown: true,
          title: 'Checkout',
          headerStyle: { backgroundColor: '#051004' },
          headerTintColor: '#c98ce3',
        }}
      />
<Stack.Screen
  name="Orders"
  component={OrdersScreen}
  options={{
    title: 'My Orders',
    headerStyle: { backgroundColor: '#051004' },
    headerTintColor: '#c98ce3',
    headerTitleStyle: { fontWeight: 'bold' },
  }}
/>
<Stack.Screen
  name="TrackOrder"
  component={TrackOrderScreen}
  options={{
    title: 'Track Order',
    headerStyle: { backgroundColor: '#c98ce3' },
    headerTitleStyle: { fontWeight: 'bold' },
  }}
/>

    </Stack.Navigator>
  );
};

export default AppNavigator;
