// ProfileScreen.js
import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { ThemeContext } from '../../ThemeContext';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('currentUser');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setPhone(parsed.phone || '');
        setAddress(parsed.address || '');
        if (parsed.profilePic) setProfilePic(parsed.profilePic);
      }
    };
    loadUser();
  }, []);

  const saveDetails = async () => {
    const updatedUser = {
      ...user,
      phone,
      address,
      profilePic,
    };
    await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    Alert.alert('Saved', 'Profile updated successfully.');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('currentUser');
    navigation.replace('Login');
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#051004' : '#f0fbef' }]}>
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#051004' : '#f0fbef' }]}>
        <Text style={styles.appTitle}>LUXE MARKET</Text>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={profilePic ? { uri: profilePic } : require('../../assets/profile.jpg')}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.name}>Hey, {user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.section}>
        

       
        <View style={styles.toggleRow}>
          <Text style={{ color: isDarkMode ?  '#f0fbef' :'#051004' }}>🌙 Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>

        <View style={styles.activityRow}>
          <TouchableOpacity style={styles.activityItem}>
            <Ionicons name="chatbox-ellipses-outline" size={22} color="#4ccd32" />
            <Text style={styles.activityText}>Reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.activityItem}>
            <MaterialCommunityIcons name="comment-question-outline" size={22} color="#4ccd32" />
            <Text style={styles.activityText}>Q & A</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.activityItem}>
            <Ionicons name="heart-outline" size={22} color="#4ccd32" />
            <Text style={styles.activityText}>Likes</Text>
          </TouchableOpacity>
        </View>

        {/* Options */}
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Orders')}>
          <Ionicons name="bag" size={20} color="#051004" />
          <Text style={styles.optionText}>My Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Wishlist')}>
          <Ionicons name="heart" size={20} color="#051004" />
          <Text style={styles.optionText}>Wishlist</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('TrackOrder')}>
          <Ionicons name="map" size={20} color="#051004" />
          <Text style={styles.optionText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="gift" size={20} color="#051004" />
          <Text style={styles.optionText}>Refer & Earn</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="help-circle" size={20} color="#051004" />
          <Text style={styles.optionText}>Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="settings" size={20} color="#051004" />
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.premiumBtn}>
          <Ionicons name="star" size={20} color="#fff" />
          <Text style={styles.premiumText}>Become a Member</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sign out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  appTitle: {
    color: '#c98ce3',
    fontSize: 22,
    fontFamily:'helvetica',
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
    alignContent: 'left',
    // justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily:'coolvetica',
    color: '#c98ce3',
    fontFamily: 'System',
  },
  email: {
    fontSize: 14,
    color: '#c98ce3',
    fontFamily: 'Sans-serif',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
 
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    fontFamily: 'Sans-serif',
    fomtweight: 'bold',
    fontSize: 20,
    color: '#051004',
  },
 
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    height: 60,
    paddingHorizontal: 10,
  },
  activityItem: {
    alignItems: 'center',

  },
  activityText: {
    marginTop: 4,
    fontSize: 12,
    color: '#4ccd32',
    fontFamily: 'Sans-serif',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#db6b9c',
    padding: 14,
    borderRadius: 16,
    marginBottom: 4,
    elevation: 1,
    marginRight: 8,
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionText: {
    fontSize: 16,
    color: '#f0fbef',
    marginLeft: 10,
    fontFamily: 'Sans-serif',
  },
  premiumBtn: {
    backgroundColor: '#591c73',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 24,
    marginTop:48,
  },
  premiumText: {
    color: '#f0fbef',
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
    
    
  },
  logoutBtn: {
    backgroundColor: 'red',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#f0fbef',
    fontWeight: 'bold',
    fontFamily: 'Sans-serif',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    fontSize: 16,
    color: '#f0fbef',
    fontFamily: 'sans-serif',
  },
});

export default ProfileScreen;
