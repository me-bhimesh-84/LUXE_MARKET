import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import { Formik } from 'formik';
import { loginValidationSchema } from '../../utils/validationSchemas';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleLogin = async (values) => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const existingUser = users.find(
        user => user.email.trim().toLowerCase() === values.email.trim().toLowerCase()
      );

      if (!existingUser) {
        Alert.alert('User not found', 'Please sign up first.');
        return;
      }

      if (existingUser.password !== values.password) {
        Alert.alert('Invalid credentials', 'Incorrect password.');
        return;
      }

      await AsyncStorage.setItem('currentUser', JSON.stringify(existingUser));
      navigation.replace('MainApp');
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error', 'Something went wrong during login.');
    }
  };

  return (
    <View style={styles.container}>
      

      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Login</Text>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={styles.inputContainer}>
              <Ionicons name="mail" size={20} color="#051004" />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
              />
            </View>
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed" size={20} color="#051004" />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#444"
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <View style={styles.row}>
              <TouchableOpacity onPress={() => setRemember(!remember)} style={styles.row}>
                <Ionicons
                  name={remember ? 'checkbox' : 'square-outline'}
                  size={22}
                  color={remember ? '#051004' : '#ccc'}
                  // paddingLeft={5}
                />
                <Text style={styles.rememberText}> Keep me Signed In</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.forgot}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.link}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    alignSelf: 'left',
    marginBottom: 12,
    color: '#051004',
    fontFamily: 'helvetica',
    paddingLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 10,
  },
  input: {
    padding: 12,
    flex: 1,
    fontFamily:'helvetica',
    color: '#051004',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
    fontFamily: 'helvetica',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  rememberText: {
    color: '#051004',
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'helvetica',
  },
  forgot: {
    color: '#051004',
    fontSize: 12,
    fontFamily: 'helvetica',
    textDecorationLine: 'underline',
    marginRight: 8,
  },
  button: {
    backgroundColor: '#051004',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#051004',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'helvetica',
    fontSize: 16,
    // textDecorationLine: 'underline',
  },
});

export default LoginScreen;
