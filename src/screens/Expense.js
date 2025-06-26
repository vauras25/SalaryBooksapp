import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import BottomNavigation from './BottomNavigation';

const { width, height } = Dimensions.get('window');

const Expense = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.headerText}>Expense Management</Text>
        </View>
      {/* Icon Row */}
      <View style={styles.iconRow}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/previous_claims.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.iconLabel}>Previous Claims</Text>
        </View>
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/pending_claims.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.iconLabel}>Pending Claims</Text>
        </View>
      </View>

      {/* File New Claim Button */}
      <TouchableOpacity style={styles.button} onPress={() => setShowForm(true)}>
        <Text style={styles.buttonText}>File New Claim</Text>
      </TouchableOpacity>

      {/* Popup Overlay Form */}
      {/* {showForm && (
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <TouchableOpacity onPress={() => setShowForm(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            <Text style={styles.formTitle}>Enter the following details</Text>
            <TextInput placeholder="Enter Head" style={styles.input} placeholderTextColor="#aaa" />
            <TextInput
              placeholder="Amount"
              style={styles.input}
              keyboardType="numeric"
              placeholderTextColor="#aaa"
            />
            <View style={styles.row}>
              <TextInput
                placeholder="Month"
                style={[styles.input, styles.halfInput]}
                placeholderTextColor="#aaa"
              />
              <TextInput
                placeholder="Year"
                style={[styles.input, styles.halfInput]}
                placeholderTextColor="#aaa"
              />
            </View>
            <TextInput placeholder="Branch" style={styles.input} placeholderTextColor="#aaa" />
            <TextInput placeholder="Department" style={styles.input} placeholderTextColor="#aaa" />
            <TextInput placeholder="Designation" style={styles.input} placeholderTextColor="#aaa" />
            <TextInput placeholder="HOD" style={styles.input} placeholderTextColor="#aaa" />

            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      )} */}

      {showForm && (
  <View style={styles.overlay}>
    <View style={styles.popup}>
      <View style={styles.popupHeader}>
        <Text style={styles.popupTitle}>Enter the following details</Text>
        <TouchableOpacity onPress={() => setShowForm(false)} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
 <View style={styles.formRow}>
  <Text style={styles.label}>Enter Head :</Text>
  <TextInput style={styles.inputUnderline} />
</View>

<View style={styles.formRow}>
  <Text style={styles.label}>Amount:</Text>
  <TextInput style={styles.inputUnderline} keyboardType="numeric" />
</View>

      <View style={styles.row}>
        <TextInput placeholder="Month:" placeholderTextColor="#aaa" style={[styles.input, styles.halfInput]} />
        <TextInput placeholder="Year:" placeholderTextColor="#aaa" style={[styles.input, styles.halfInput]} />
      </View>

      <TextInput placeholder="Branch:" placeholderTextColor="#aaa" style={styles.input} />
      <TextInput placeholder="Department:" placeholderTextColor="#aaa" style={styles.input} />
      <TextInput placeholder="Designation:" placeholderTextColor="#aaa" style={styles.input} />
      <TextInput placeholder="HOD:" placeholderTextColor="#aaa" style={styles.input} />

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  </View>
)}


      <BottomNavigation />
    </View>
  );
};

export default Expense;

const styles = StyleSheet.create({
   header: {
    marginTop:23,
    backgroundColor: '#ccc',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
    width: '80%',
  },
  iconContainer: {
    alignItems: 'center',
    width: '45%',
    top: 30,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  iconLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  button: {
    backgroundColor: '#e60000',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    position: 'absolute',
    bottom: 140,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
 overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  popupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  popupTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#e60000',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
    formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    width: 100,
  },
  inputUnderline: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    color: '#fff',
    paddingVertical: 2,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  submitButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
