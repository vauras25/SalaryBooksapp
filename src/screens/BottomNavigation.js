import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from './ThemeContext';

const { width } = Dimensions.get('window');

const BottomNavigation = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useTheme();
  const translateY = useRef(new Animated.Value(0)).current;
  
  const handleHomePress = () => {
    navigation.navigate('Employee');
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        translateY.setOffset(translateY._value);
        translateY.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        translateY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        translateY.flattenOffset();
        if (gestureState.dy < -40) { // Swipe up threshold
          handleHomePress();
        }
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  const navItems = [
    { label: 'Expenses', icon: require('../assets/expenses.png'), screen: 'Expense' },
    { label: 'Leaves', icon: require('../assets/leaves.png'), screen: 'Leaves' },
    { label: 'Payslips', icon: require('../assets/payslips.png'), screen: 'Payslips' },
    { label: 'Check In', icon: require('../assets/checkin.png'), screen: 'AttendanceScreen' },
    { label: 'Settings', icon: require('../assets/settings.png'), screen: 'Settings' },
  ];

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 10 }]}>
      {/* Bottom Nav Items */}
      <View style={[styles.bottomNav, { backgroundColor: isDarkMode ? '#1c1c1c' : '#ececec' }]}>
        {navItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Image
              source={item.icon}
              style={[
                styles.navIconImage,
                { tintColor: isDarkMode ? '#ececec' : '#000' }
              ]}
            />
            <Text style={[styles.navLabel, { color: isDarkMode ? '#ececec' : '#000' }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Home Button */}
      <Animated.View
        style={[
          styles.homeButtonContainer,
          {
            transform: [{ translateY }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity onPress={handleHomePress}>
          <View style={[styles.homeButton, { backgroundColor: isDarkMode ? '#1c1c1c' : '#ececec' }]}>
            <Image
              source={require('../assets/settings.png')}
              style={[
                styles.homeIcon,
                { tintColor: isDarkMode ? '#ececec' : '#000' }
              ]}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 60,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderColor: '#333',
    zIndex: 2,
  },
  navItem: {
    alignItems: 'center',
    width: width / 5,
  },
  navIconImage: {
    width: 22,
    height: 22,
    marginBottom: 4,
    resizeMode: 'contain',
  },
  navLabel: {
    fontSize: 11,
  },
  homeButtonContainer: {
    position: 'absolute',
    top: -25,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  homeIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    marginTop: -30
  },
});