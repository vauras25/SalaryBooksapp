import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputField = ({ placeholder, secureTextEntry = false }) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#fff"
      secureTextEntry={secureTextEntry}
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#004A8F',
    color: '#fff',
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    fontSize: 16,
  },
});

export default InputField;
