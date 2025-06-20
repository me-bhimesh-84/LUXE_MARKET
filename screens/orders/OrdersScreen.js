import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const { isDarkMode } = useContext(ThemeContext);
  const navigation = useNavigation();

  useEffect(() => {
    const loadOrders = async () => {
      const stored = await AsyncStorage.getItem('orders');
      if (stored) {
        const parsed = JSON.parse(stored).map((o, index) => ({
          ...o,
          id: o.id || index + 1, // Fallback if id is missing
          status: typeof o.status === 'number' ? o.status : 0,
        }));
        setOrders(parsed);
      }
    };
    loadOrders();
  }, []);

  const updateOrders = async (newOrders, message) => {
    setOrders(newOrders);
    await AsyncStorage.setItem('orders', JSON.stringify(newOrders));
    if (message) Alert.alert(message);
  };

  const cancelOrder = (id) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: -1 } : o
    );
    updateOrders(updated, 'Order cancelled');
  };

  const markDelivered = (id) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: 4 } : o
    );
    updateOrders(updated, 'Order marked as delivered');
  };

  const removeOrder = (id) => {
    const updated = orders.filter((o) => o.id !== id);
    updateOrders(updated, 'Order removed');
  };

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }]}>
      <Text style={styles.orderId}>Order #{item.id}</Text>
      <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>

      <View style={styles.itemList}>
        {item.items.map((i) => (
          <TouchableOpacity
            key={i.id}
            onPress={() => navigation.navigate('ProductDetails', { product: i })}
          >
            <Text style={[styles.item, { color: isDarkMode ? '#eee' : '#333' }]}>
              • {i.title} x{i.quantity} - ₹{Math.round(i.price * 80)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.total, { color: isDarkMode ? '#fff' : '#000' }]}>
        Total: ₹ {item.total}
      </Text>

      <Text
        style={{
          fontSize: 14,
          fontWeight: 'bold',
          marginTop: 6,
          color:
            item.status === 4
              ? 'green'
              : item.status === -1
              ? 'red'
              : '#2c2e91',
        }}
      >
        {item.status === -1
          ? '❌ Cancelled'
          : item.status === 4
          ? '✅ Delivered'
          : `📦 ${['Placed', 'Packed', 'Shipped', 'Out for Delivery'][item.status]}`}
      </Text>

      <View style={styles.actions}>
        {item.status >= 0 && item.status < 4 && (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('TrackOrder', { order: item })}
              style={[styles.actionBtn, { backgroundColor: '#c98ce3' }]}
            >
              <Ionicons name="navigate" size={18} color="#000" />
              <Text style={styles.actionText}>Track</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => cancelOrder(item.id)}
              style={[styles.actionBtn, { backgroundColor: '#ed4c92' }]}
            >
              <Ionicons name="close-circle" size={18} color="#000" />
              <Text style={styles.actionText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => markDelivered(item.id)}
              style={[styles.actionBtn, { backgroundColor: '#5df43f' }]}
            >
              <Ionicons name="checkmark-circle" size={18} color="#000" />
              <Text style={styles.actionText}>Deliver</Text>
            </TouchableOpacity>
          </>
        )}

        {(item.status === 4 || item.status === -1) && (
          <TouchableOpacity
            onPress={() => removeOrder(item.id)}
            style={[styles.actionBtn, { backgroundColor: '#555' }]}
          >
            <Ionicons name="trash" size={18} color="#fff" />
            <Text style={styles.actionText}>Remove</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? '#000' : '#f2f2f2',
      }}
      contentContainerStyle={{ padding: 16 }}
    >
      {orders.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 30, color: '#777' }}>
          You haven't placed any orders yet.
        </Text>
      ) : (
        <FlatList
          data={orders.sort((a, b) => b.id - a.id)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    elevation: 3,
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2c2e91',
  },
  date: {
    fontSize: 13,
    color: '#888',
    marginBottom: 6,
  },
  itemList: {
    marginVertical: 6,
  },
  item: {
    fontSize: 14,
    marginBottom: 2,
  },
  total: {
    fontSize: 15,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    marginTop: 4,
    color: '#5df43f',
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 10,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  actionText: {
    color: '#000',
    fontSize: 13,
    marginLeft: 6,
  },
});

export default OrdersScreen;
