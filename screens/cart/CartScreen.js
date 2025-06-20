import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useCart } from '../../contexts/CartContext';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';

const CartScreen = () => {
  const { cart, dispatch } = useCart();
  const { isDarkMode } = useContext(ThemeContext);
  const navigation = useNavigation();

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#051004' : '#f0fbef' }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>{item.title}</Text>
        <Text style={[styles.details, { color: isDarkMode ? '#f0fbef' : '#051004' }]}>Qty: {item.quantity}</Text>
        <Text style={[styles.price, { color: '#4ccd32' }]}>₹ {Math.round(item.price * 80)}</Text>
        <TouchableOpacity onPress={() => handleRemove(item.id)}>
          <Text style={[styles.remove, { color: 'red' }]}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#051004' : '#f0fbef' }]}>
      {/* Header */}
      <View style={styles.headerBox}>
        <Text style={[styles.brand, { color: '#c98ce3' ,marginTop: 20, fontSize: 24, fontWeight: 'bold',fontFamily: 'sans-serif',
         }]}>LUXE MARKET</Text>
        <Text style={[styles.header, { color: isDarkMode ? '#f0fbef' : '#051004' }]}>My Cart</Text>
      </View>

      {/* Content */}
      {cart.length === 0 ? (
        <Text style={[styles.empty, { color: isDarkMode ? '#aaa' : '#666' }]}>Uh oh, your cart is feeling a bit lonely 😔</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
          <View style={styles.footer}>
            <Text style={styles.total}>Total: ₹ {Math.round(total * 80)}</Text>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  headerBox: {
    alignItems: 'center',
    marginBottom: 10,
  },
  brand: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    fontFamily: 'sans-serif',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width:76,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: 'contain',
    backgroundColor: '#f0fbef',
  },
  info: {
    flex: 1,
    fontFamily: 'sans-serif',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'bold',
    marginTop: 5,
    color: '#4ccd32',
    fontFamily: 'helvetica',
  },
  remove: {
    marginTop: 5,
    fontSize: 13,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#4ccd32',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total: {
    color: '#f0fbef',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutBtn: {
    backgroundColor: '#5df43f',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checkoutText: {
    color: '#051004',
    fontWeight: 'bold',
  },
});

export default CartScreen;
