import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomNavigation = () => {
  const navigation = useNavigation();

  const navItems = [
    { label: 'Expenses', icon: require('../assets/expenses.png'), screen: 'Expenses' },
    { label: 'Leaves', icon: require('../assets/leaves.png'), screen: 'Leaves' },
    { label: 'Payslips', icon: require('../assets/payslips.png'), screen: 'Payslips' },
    { label: 'Check In', icon: require('../assets/checkin.png'), screen: 'CheckIn' },
    { label: 'Settings', icon: require('../assets/settings.png'), screen: 'Settings' },
  ];

  return (
    <View style={styles.bottomNav}>
      {navItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.navItem}
          onPress={() => navigation.navigate(item.screen)}
        >
          <Image source={item.icon} style={styles.navIconImage} />
          <Text style={styles.navLabel}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderColor: '#333',
  },
  navItem: {
    alignItems: 'center',
  },
  navIconImage: {
    width: 24,
    height: 24,
    marginBottom: 4,
    resizeMode: 'contain',
  },
  navLabel: {
    color: '#fff',
    fontSize: 12,
  },
});
