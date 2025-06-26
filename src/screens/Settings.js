// src/screens/Settings.js
import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';

const Settings = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <Text style={{ color: isDarkMode ? '#fff' : '#000', fontSize: 18 }}>Dark Mode</Text>
      <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
