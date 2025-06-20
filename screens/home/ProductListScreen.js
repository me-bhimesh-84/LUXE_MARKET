import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image,
  TouchableOpacity, TextInput, Platform, ToastAndroid, Alert
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useCart } from '../../contexts/CartContext';

const categoryMap = {
  Mobiles: 'electronics',
  Laptops: 'electronics',
  Headphones: 'electronics',
  Clothes: "men's clothing",
  Fashion: "women's clothing",
  Jewelry: 'jewelery',
};

const ProductListScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category } = route.params;
  const { dispatch } = useCart();

  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const apiCat = categoryMap[category] || 'electronics';
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/category/${apiCat}`);
        setProducts(res.data);
      } catch (err) {
        console.error('Product load error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [category]);

  const increment = (id) =>
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));

  const decrement = (id) =>
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) - 1) }));

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    dispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity } });

    const msg = `${item.title} x${quantity} added to cart`;
    Platform.OS === 'android' ? ToastAndroid.show(msg, ToastAndroid.SHORT) : Alert.alert('Cart', msg);
  };

  const handleBuyNow = (item) => {
    const quantity = quantities[item.id] || 1;
    navigation.navigate('Checkout', {
      items: [{ ...item, quantity }],
      fromBuyNow: true,
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.rating}>⭐ {item.rating?.rate ?? 4.5}</Text>
        <Text style={styles.price}>₹ {Math.round(item.price * 80)}</Text>

        <View style={styles.qtyRow}>
          <TouchableOpacity onPress={() => decrement(item.id)} style={styles.qtyBtn}>
            <Ionicons name="remove" size={16} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{quantities[item.id] || 1}</Text>
          <TouchableOpacity onPress={() => increment(item.id)} style={styles.qtyBtn}>
            <Ionicons name="add" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.cartBtn} onPress={() => handleAddToCart(item)}>
            <Text style={styles.cartText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyBtn} onPress={() => handleBuyNow(item)}>
            <Text style={styles.buyText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>LUXE {category}</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={products.filter(p => p.title.toLowerCase().includes(searchText.toLowerCase()))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 12, paddingBottom: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4ccd32',
    margin: 16,
    textAlign: 'center',
  },
  searchInput: {
    marginHorizontal: 14,
    backgroundColor: '#f0fbef',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 8,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fafafa',
    borderRadius: 12,
    elevation: 2,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  info: { flex: 1, paddingLeft: 10 },
  title: { fontSize: 15, fontWeight: 'bold' },
  rating: { fontSize: 13, color: '#777', marginVertical: 2 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#2c2e91' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  qtyBtn: {
    backgroundColor: '#4ccd32',
    padding: 5,
    borderRadius: 5,
  },
  qtyText: { marginHorizontal: 10, fontSize: 16, fontWeight: '600' },
  actions: { flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' },
  cartBtn: {
    backgroundColor: '#591c73',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  cartText: { fontWeight: 'bold', color: '#f0fbef' },
  buyBtn: {
    backgroundColor: '#4ccd32',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  buyText: { color: '#f0fbef', fontWeight: 'bold' },
});

export default ProductListScreen;
