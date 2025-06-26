import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import BottomNavigation from './BottomNavigation';


const Expense = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/previous_claims.png')} // Replace with your image
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.iconLabel}>Previous Claims</Text>
        </View>
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/pending_claims.png')} // Replace with your image
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.iconLabel}>Pending Claims</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>File New Claim</Text>
      </TouchableOpacity>


      <BottomNavigation/>
    </View>
  );
};

export default Expense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f2f1',
    // justifyContent: 'center',
    alignItems: 'center',
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
    top:30
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  iconLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#e60000',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    top:270
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});