// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/home/HomeScreen';
import CartScreen from '../screens/cart/CartScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import LuxeClubScreen from '../screens/LuxeClubScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#191919',
          borderTopColor: '#191919',
          borderRightColor: '#191919',
          borderLeftColor: '#191919',
          size: 50,
        },
        tabBarActiveTintColor: '#942454',
        tabBarInactiveTintColor: '#f0fbef',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home' ;
          else if (route.name === 'Cart') iconName = 'cart';
          else if (route.name === 'Profile') iconName = 'person';
          else if (route.name === 'LuxeClub') iconName = 'diamond-outline';
        
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="LuxeClub" component={LuxeClubScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
     
    </Tab.Navigator>
  );
};

export default TabNavigator;
