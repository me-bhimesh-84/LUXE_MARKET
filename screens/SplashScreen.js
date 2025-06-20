  import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* App Logo */}
      <View style={styles.logoBox}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>

      {/* App Name */}
      <Text style={styles.appName}>LUXE MARKET</Text>

      {/* Taglines */}
      <View style={styles.taglines}>
        <Text style={styles.tagline}>👜 Your luxury shopping destination</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '##f0fbef',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    position: 'absolute',
    top: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '##051004',
  },
  logoBox: {
    backgroundColor: 'transparent',
    padding: 12,
    borderRadius: 60,
    elevation: 5,
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 0,
  },
  appName: {
    fontSize: 28,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '##051004',
    marginBottom: 10,
  },
  taglines: {
    marginTop: 4,
  },
  tagline: {
    fontSize: 15,
    fontStyle: 'italic',
    fontFamily: 'Helvetica',
    color: '#051004',
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default SplashScreen;
