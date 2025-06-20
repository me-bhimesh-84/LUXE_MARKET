import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const LuxeClubScreen = () => {
return (
    <ScrollView style={styles.container}>
        <View style={styles.banner}>
            <Image
                source={require('../assets/luxebanner.png')}
                style={styles.bannerImage}
            />
            <Text style={styles.heading}>Welcome to Luxe Club</Text>
            <Text style={styles.subheading}>Unlock exclusive benefits, early access, and more.</Text>
        </View>

        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Member Perks</Text>
            <Text style={styles.perk}>🛍️ Early Access to Sales</Text>
            <Text style={styles.perk}>💎 Exclusive Member Discounts</Text>
            <Text style={styles.perk}>🎉 Birthday Surprises</Text>
            <Text style={styles.perk}>🧑‍💼 Personal Styling Sessions</Text>
            <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinText}>Join Now</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0fbef',
    flex: 1,
  },
  banner: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#051004',
  },
  bannerImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 20,
    marginTop:20,
    resizeMode: 'cover',
  },
  heading: {
    color: '#f0fbef',
    fontSize: 24,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    color: '#f0fbef',
    fontSize: 16,
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#051004',
  },
  perk: {
    fontSize: 16,
    marginVertical: 5,
    color: '#333',
  },
  joinButton: {
    margin: 20,
    padding: 15,
    backgroundColor: '#051004',
    borderRadius: 10,
    alignItems: 'center',
  },
  joinText: {
    color: '#f0fbef',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LuxeClubScreen;
