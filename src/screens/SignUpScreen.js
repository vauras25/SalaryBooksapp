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
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [corporateId, setCorporateId] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = async () => {
// const data = {
//       corporate_id: corporateId,
//       password: password,
//       userid: userId
//     };
try{  
      // const url = 'https://api.vauras.cloud/api/employee_signin';
      const url = 'https://back.finalpayroll.in/employee_signin';
      navigation.navigate('Dashboard'); 
      const data = { corporate_id: corporateId, userid: userId, password };
      const response = await axios.post(url, data, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.status === 'success') {
        navigation.navigate('Dashboard');
      }
    } catch (error) {
      console.error('Login Failed:', error.response?.data || error.message);
    }
  };

  return (
    <LinearGradient
      colors={['#000000ff', '#004080']}
      style={styles.gradientBackground}
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
