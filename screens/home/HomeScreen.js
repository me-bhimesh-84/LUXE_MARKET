import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Image,
  TextInput, Dimensions, ScrollView
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ThemeContext } from '../../ThemeContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const banners = [
  require('../../assets/banner1.png'),
  require('../../assets/banner2.jpeg'),
  require('../../assets/banner3.png'),
];

const categories = [
  { id: '1', title: 'Watches', description: 'Timeless & Fine Timepieces', image: require('../../assets/timepieces.png') },
  { id: '2', title: 'Clothing', description: 'Designer Styles & Apparel', image: require('../../assets/couture.png') },
  { id: '3', title: 'Jewels', description: 'Exquisite Rings, Necklaces & More', image: require('../../assets/hautejoaillerie.png') },
  //{ id: '4', title: 'Home Decor', description: 'Elegant Decor & Furnishings', image: require('../../assets/homedecor_luxury.png') },
  { id: '6', title: 'Bags', description: 'Luxury Handbags & Wallets', image: require('../../assets/luxury_accessories.png') },
  { id: '7', title: 'Rare Finds', description: 'Unique & Limited Edition Items', image: require('../../assets/collectibles.png') },
];
const HomeScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [recommended, setRecommended] = useState([]);
  const [recent, setRecent] = useState([]);
  const [searchText, setSearchText] = useState('');
  const scrollRef = useRef();
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products?limit=10')
      .then((res) => setRecommended(res.data))
      .catch((err) => console.log('Error loading products', err));

    AsyncStorage.getItem('recentlyViewed').then(data => {
      if (data) setRecent(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollRef.current?.scrollTo({ x: scrollX + 200, animated: true });
      setScrollX(prev => (prev + 200 > 800 ? 0 : prev + 200));
    }, 3000);
    return () => clearInterval(interval);
  }, [scrollX]);

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5' }
      ]}
      onPress={() => navigation.navigate('ProductList', { category: item.title })}
    >
      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.image} />
      </View>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]} numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.recommendCard,
        { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' },
      ]}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.recommendImage} />
      <Text numberOfLines={1} style={[styles.recommendTitle, { color: isDarkMode ? '#fff' : '#000' }]}>{item.title}</Text>
      <Text style={styles.recommendPrice}>₹ {Math.round(item.price * 80)}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={categories}
      renderItem={renderCategory}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={{ backgroundColor: isDarkMode ? '#000' : '#fff', paddingBottom: 40 }}
      ListHeaderComponent={
        <>
          <View style={styles.appHeader}>
            <Image source={require('../../assets/logo.png')} style={{ width: 40, height: 40,borderRadius:10, }} />
            <Text style={[styles.appTitle, { color: isDarkMode ? '#f0fbef' : '#051004' }]}>LUXE MARKET</Text>
          </View>
          <TextInput
            style={[styles.searchInput, {
              backgroundColor: isDarkMode ? '#051004' : '#f0fbef',
              color: isDarkMode ? '#fff' : '#000'
            }]}
            placeholder="Search products..."
            placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
            value={searchText}
            onChangeText={setSearchText}
          />

          
          
  
          <View style={styles.offerContainer}>
            <ScrollView horizontal ref={scrollRef} showsHorizontalScrollIndicator={false} scrollEnabled={true}>
              <View style={styles.offerBox}><Text style={styles.offerText}>🔥 30% OFF on Fashion Wear</Text></View>
              <View style={styles.offerBox}><Text style={styles.offerText}>🚀 Free Shipping above ₹1499</Text></View>
              <View style={styles.offerBox}><Text style={styles.offerText}>🎉 Exclusive Offers on Accessories</Text></View>
            </ScrollView>
          </View>

          <Carousel
            loop
            width={width}
            height={180}
            autoPlay
            data={banners}
            scrollAnimationDuration={1200}
            renderItem={({ item }) => <Image source={item} style={styles.bannerImage} />}
            style={styles.carouselContainer}
            vertical={true}
          />
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#f0fbef' : '#051004' }]}>🔥 Essentials </Text>
          <FlatList
            data={recommended}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />

          <Text style={[styles.sectionTitle, { color: isDarkMode ?  '#f0fbef' : '#051004' }]}>🛍️ Explore Categories</Text>
        </>
      }
      ListFooterComponent={
        <>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#f0fbef' : '#051004' }]}>🔥 Trending Picks For You</Text>
          <FlatList
            data={recommended}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />

          {recent.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#2c2e91' }]}>🧠 Recently Viewed</Text>
              <FlatList
                data={recent}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id.toString() + '-recent'}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}
              />
            </>
          )}
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 10,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    marginLeft: 12,
    marginBottom: 10,
    fontFamily: 'sans-serif',
  },
  carouselContainer: {
    marginBottom: 12,
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  bannerImage: {
    width: 'auto',
    height: 180,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    resizeMode: 'cover',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  searchInput: {
    margin: 12,
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: '#f0fbef',
    color: '#000',
    borderWidth: 1,
    borderColor: '##942454',
    paddingHorizontal: 14,
    fontSize: 16,
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  offerContainer: {
    flexDirection: 'row',
    paddingVertical: 6,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  offerBox: {
    backgroundColor: '#942454',
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 8,
  },
  offerText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  card: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    marginBottom: 12,
  },
  // imageWrapper: {
  //   width: 80,
  //   height: 80,
  //   borderRadius: 40,
  //   backgroundColor: '#fff',
  //   elevation: 2,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginBottom: 8,
  //   overflow: 'hidden',
  // },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 35,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'sans-serif',
  },
  recommendCard: {
    borderRadius: 10,
    padding: 16,
    width: 130,
    marginRight: 12,
    alignItems: 'center',
    elevation: 2,
  },
  recommendImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  recommendTitle: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'sans-serif',
    color: '#591c73',
    marginBottom: 4,
    maxWidth: 120,
    textAlign: 'center',
    paddingHorizontal: 4,
    fontFamily: 'sans-serif',
  },
  recommendPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: '#4ccd32',
    marginTop: 4,
  },
});

export default HomeScreen;
