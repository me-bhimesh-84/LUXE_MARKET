import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useWishlist } from '../../contexts/WishlistContext';
import { Ionicons } from '@expo/vector-icons';

const WishlistScreen = () => {
  const { wishlist, dispatchWishlist } = useWishlist();

  const handleRemove = (item) => {
    dispatchWishlist({ type: 'REMOVE_FROM_WISHLIST', payload: item });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.price}>₹ {Math.round(item.price * 80)}</Text>
        <TouchableOpacity onPress={() => handleRemove(item)}>
          <Text style={styles.remove}>Remove</Text>
        </TouchableOpacity>
       
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Wishlist</Text>
      {wishlist.length === 0 ? (
        <Text style={styles.empty}>Your wishlist is empty.</Text>
      ) : (
        <FlatList
          data={wishlist}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c2e91',
    textAlign: 'center',
    marginBottom: 10,
  },
  empty: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 30,
  },
  list: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c2e91',
    marginTop: 4,
  },
  remove: {
    color: 'red',
    marginTop: 8,
  },
});

export default WishlistScreen;
