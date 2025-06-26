import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet,KeyboardAvoidingView, Image} from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
   const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <View style={styles.card}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Welcome Back! Please sign in.</Text>

        <TextInput style={styles.input} placeholder="Enter Corporate ID" placeholderTextColor="#fff" />
        <TextInput style={styles.input} placeholder="Enter User ID" placeholderTextColor="#fff" />
        <TextInput style={styles.input} placeholder="Enter Your Password" placeholderTextColor="#fff" secureTextEntry />

        {/* <View style={styles.checkboxContainer}>
          <CheckBox value={false} />
          <Text style={styles.checkboxLabel}>Remember Me</Text>
        </View> */}
        
        <TouchableOpacity style={styles.signInButton}
           onPress={() => navigation.navigate('Employee')}
        >
          <Text style={styles.signInText}>Sign In ➜</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.forgotText}>Forget Password?</Text>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#000',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: 20,
    color: '#003366',
  },
  input: {
    width: '100%',
    backgroundColor: '#004d99',
    color: '#fff',
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
    fontWeight: 'bold',
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
  },
  signInButton: {
    backgroundColor: '#cc0000',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  signInText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  forgotText: {
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
