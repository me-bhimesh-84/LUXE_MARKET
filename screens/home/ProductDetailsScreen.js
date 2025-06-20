import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  ToastAndroid,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useWishlist } from '../../contexts/WishlistContext';
import { useCart } from '../../contexts/CartContext';

const ProductDetailsScreen = () => {
  const { product } = useRoute().params;
  const navigation = useNavigation();

  const [quantity, setQuantity] = useState(1);
  const priceInINR = Math.round(product.price * 80);

  const { wishlist, dispatchWishlist } = useWishlist();
  const { dispatch } = useCart();
  const isInWishlist = wishlist.some(item => item.id === product.id);

  const showToast = (msg) => {
    if (Platform.OS === 'android') ToastAndroid.show(msg, ToastAndroid.SHORT);
    else Alert.alert(msg);
  };

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity },
    });
    showToast(`${product.title.slice(0, 15)} x${quantity} added to cart`);
  };

  const handleBuyNow = () => {
    navigation.navigate('Checkout', {
      items: [{ ...product, quantity }],
      fromBuyNow: true,
    });
  };

  const toggleWishlist = () => {
    dispatchWishlist({
      type: isInWishlist ? 'REMOVE_FROM_WISHLIST' : 'ADD_TO_WISHLIST',
      payload: product,
    });
    showToast(isInWishlist ? 'Removed from Wishlist' : 'Added to Wishlist');
  };

  return (
    <ScrollView style={styles.container}>
    

      <View style={{ position: 'relative' }}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <TouchableOpacity onPress={toggleWishlist} style={styles.heartBtn}>
          <Ionicons
            name={isInWishlist ? 'heart' : 'heart-outline'}
            size={32}
            color={isInWishlist ? 'red' : '#2c2e91'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.rating}>
          ⭐ {product.rating?.rate || 4.5} ({product.rating?.count || 100}+ Reviews)
        </Text>
        <Text style={styles.price}>₹ {priceInINR}</Text>

        <View style={styles.qtyRow}>
          <Text style={styles.qtyLabel}>Quantity:</Text>
          <View style={styles.qtyControls}>
            <TouchableOpacity
              onPress={() => setQuantity(q => (q > 1 ? q - 1 : 1))}
              style={styles.qtyBtn}
            >
              <Ionicons name="remove" size={16} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity
              onPress={() => setQuantity(q => q + 1)}
              style={styles.qtyBtn}
            >
              <Ionicons name="add" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.descTitle}>Product Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
            <Text style={styles.cartText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyBtn} onPress={handleBuyNow}>
            <Text style={styles.buyText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#591c73',
    textAlign: 'center',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  heartBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#f0fbef',
    padding: 8,
    borderRadius: 25,
    elevation: 3,
  },
  content: { padding: 16 },
  title: {
    fontSize: 20,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#591c73',
  },
  rating: { fontSize: 14, color: '#888', marginBottom: 6 },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4ccd32',
    marginBottom: 10,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  qtyLabel: { fontSize: 16, fontWeight: '600' },
  qtyControls: {
    flexDirection: 'row',
    marginLeft: 12,
    alignItems: 'center',
  },
  qtyBtn: { backgroundColor: '#591c73', padding: 6, borderRadius: 4 },
  qtyText: { marginHorizontal: 12, fontSize: 16 },
  descTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartBtn: {
    backgroundColor: '#591c73',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  buyBtn: {
    backgroundColor: '#4ccd32',
    padding: 12,
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
  },
  cartText: { fontWeight: 'bold', color: '#f0fbef' },
  buyText: { color: '#fff', fontWeight: 'bold' },
});

export default ProductDetailsScreen;
