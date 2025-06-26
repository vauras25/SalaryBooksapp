import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useTheme } from './ThemeContext'; 
const { width, height } = Dimensions.get('window');

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();

  const [corporateId, setCorporateId] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = async () => {
    // navigation.navigate('Employee');

    // const data = {
    //   corporate_id: corporateId,
    //   password: password,
    //   userid: userId
    // };

    try {
      const url = 'https://api.vauras.cloud/api/employee_signin';
       navigation.navigate('Employee');
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.data.status === "success") {
        navigation.navigate('Employee');
      }

    } catch (error) {
      if (error.response) {
        console.error('Login Failed:', error.response.data);
      } else {
        console.error('Network Error:', error.message);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.scrollContainer, isDarkMode && { backgroundColor: '#000' }]}>
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />

        <View style={[styles.card, isDarkMode && { backgroundColor: '#1c1c1e', borderColor: '#555' }]}>
          <Text style={[styles.title, isDarkMode && { color: '#fff' }]}>Sign In</Text>
          <Text style={[styles.subtitle, isDarkMode && { color: '#ccc' }]}>Welcome Back! Please sign in.</Text>

          <TextInput
            style={[styles.input, isDarkMode && { backgroundColor: '#333', color: '#fff' }]}
            placeholder="Enter Corporate ID"
            placeholderTextColor={isDarkMode ? '#aaa' : '#fff'}
            value={corporateId}
            onChangeText={setCorporateId}
          />

          <TextInput
            style={[styles.input, isDarkMode && { backgroundColor: '#333', color: '#fff' }]}
            placeholder="Enter User ID"
            placeholderTextColor={isDarkMode ? '#aaa' : '#fff'}
            value={userId}
            onChangeText={setUserId}
          />

          <TextInput
            style={[styles.input, isDarkMode && { backgroundColor: '#333', color: '#fff' }]}
            placeholder="Enter Your Password"
            placeholderTextColor={isDarkMode ? '#aaa' : '#fff'}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.checkboxContainer}>
            <CheckBox value={rememberMe} onValueChange={setRememberMe} tintColors={{ true: '#007bff', false: '#aaa' }} />
            <Text style={[styles.checkboxLabel, isDarkMode && { color: '#fff' }]}>Remember Me</Text>
          </View>

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInText}>Sign In ➜</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.forgotText, isDarkMode && { color: '#aaa' }]}>Forget Password?</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  container: {
    padding: width * 0.05,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.6,
    height: height * 0.1,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#000',
    backgroundColor: '#f1f1f1',
    padding: width * 0.05,
    alignItems: 'center',
  },
  title: {
    fontSize: width < 350 ? 20 : 24,
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: 20,
    color: '#000000',
    fontSize: width < 350 ? 12 : 14,
  },
  input: {
    width: '100%',
    backgroundColor: '#0f1d2f',
    color: '#fff',
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  signInButton: {
    backgroundColor: '#00508B',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  signInText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotText: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
});

export default SignUpScreen;