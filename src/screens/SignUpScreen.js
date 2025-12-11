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
  Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [corporateId, setCorporateId] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
   const [userData, setUserData] = useState(null);
//   const handleSignIn = async () => {

// try{  
//       // const url = 'https://api.vauras.cloud/api/employee_signin';
//       const url = 'https://back.finalpayroll.in/employee_signin';
//       navigation.navigate('Dashboard'); 
//       const data = { corporate_id: corporateId, userid: userId, password };
//       const response = await axios.post(url, data, {
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (response.data.status === 'success') {
//         navigation.navigate('Dashboard');
//       }
//     } catch (error) {
//       console.error('Login Failed:', error.response?.data || error.message);
//     }
//   };

const handleSignIn = async () => {
  try {
    const url = 'https://back.finalpayroll.in/employee_signin';
    // const url = 'http://10.0.2.2:8080/employee_signin';
    const data = { corporate_id: corporateId, userid: userId, password };

    const response = await axios.post(url, data, {
      headers: { 'Content-Type': 'application/json' },
    });
// navigation.navigate('Dashboard');
    if (response.data.status === 'success') {
      const token = response.data.token;
      const user = response.data.user;

     console.log(token,"token");
     
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      if(user){
        setUserData(user);
      }
      // Alert.alert("token", token );
      console.log('Token saved:', token);
      console.log('User saved:', user);

      navigation.navigate('Dashboard');
    } else {
      Alert.alert(response.data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login Failed:', error.response?.data || error.message);
    Alert.alert('Something went wrong. Please try again.');
  }
};

  return (
    <LinearGradient
        colors={["#0B132B", "#1c68beff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.welcomeText}>Welcome Back! Please sign in.</Text>

          <View style={styles.inputCard}>
            <TextInput
              style={styles.input}
              placeholder="Enter Corporate ID"
              placeholderTextColor="#cfd8dc"
              value={corporateId}
              onChangeText={setCorporateId}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter User ID"
              placeholderTextColor="#cfd8dc"
              value={userId}
              onChangeText={setUserId}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Your Password"
              placeholderTextColor="#cfd8dc"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <View style={styles.checkboxContainer}>
              <CheckBox
                value={rememberMe}
                onValueChange={setRememberMe}
                tintColors={{ true: '#007bff', false: '#aaa' }}
              />
              <Text style={styles.checkboxLabel}>Remember Me</Text>
            </View>

            <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
              <Text style={styles.signInText}>Sign In ➜</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text style={styles.forgotText}>Forget Password?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  container: {
    alignItems: 'center',
    width: '85%',
  },
  logo: {
    width: width * 0.6,
    height: height * 0.1,
    marginBottom: 30,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 20,
  },
  inputCard: {
    width: '100%',
    // backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 20,
    // borderColor: '#1e88e5',
    // borderWidth: 1,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: '#ffffffff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    color: '#fff',
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: '#00508B',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 20,
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
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
