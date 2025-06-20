import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '../../contexts/CartContext';
import { useRoute } from '@react-navigation/native';

const CheckoutScreen = () => {
  const route = useRoute();
  const { cart, dispatch } = useCart();

  const [address, setAddress] = useState('123 Shoppy Street, Bengaluru, India');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [itemsToBuy, setItemsToBuy] = useState([]);

  useEffect(() => {
    if (route.params?.fromBuyNow && route.params.items?.length) {
      setItemsToBuy(route.params.items);
    } else {
      setItemsToBuy(cart);
    }
  }, [route.params, cart]);

  const total = itemsToBuy.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!itemsToBuy.length) {
      Alert.alert('No items to order', 'Your cart is empty.');
      return;
    }

 const order = {
  id: Date.now(), 
  items: cart,
  total: Math.round(total * 80),
  address,
  paymentMethod,
  date: new Date().toISOString(),
  status: 0,
};



    const existing = await AsyncStorage.getItem('orders');
    const orders = existing ? JSON.parse(existing) : [];
    orders.push(order);
    await AsyncStorage.setItem('orders', JSON.stringify(orders));

    if (!route.params?.fromBuyNow) {
      dispatch({ type: 'CLEAR_CART' });
    }

    Alert.alert('Order Placed!','Get ready to unbox something special! 📦');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checkout</Text>
      <View style={styles.summary}>
        {itemsToBuy.map((item) => (
          <Text key={item.id} style={styles.item}>
            {item.title} x{item.quantity} - ₹{Math.round(item.price * 80)}
          </Text>
        ))}
        <Text style={styles.total}>Total: ₹ {Math.round(total * 80)}</Text>
      </View>

      <Text style={styles.sectionTitle}>Shipping Address</Text>
      <TextInput
        style={styles.input}
        multiline
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.sectionTitle}>Payment options</Text>
      {['COD', 'UPI', 'Card'].map((method) => (
        <TouchableOpacity
          key={method}
          style={styles.radioRow}
          onPress={() => setPaymentMethod(method)}
        >
          <View style={[
            styles.radioCircle,
            paymentMethod === method && styles.radioSelected
          ]} />
          <Text style={styles.radioText}>{method}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
        <Text style={styles.buttonText}>Make it yours!!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0fbef' },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#051004',
    marginBottom: 20,
    textAlign: 'center',
  },
  summary: { marginBottom: 20 },
  item: { fontSize: 16, marginBottom: 6 },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 6,
    color: '#051004',
  },
  input: {
    borderWidth: 1,
    borderColor: '#db6b9c',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#07b24b',
    marginRight: 10,
  },
  radioSelected: {
    backgroundColor: '#3cff8a',
  },
  radioText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'sans-serif',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#db6b9c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#f9f9f9',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CheckoutScreen;
