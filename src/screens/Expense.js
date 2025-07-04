import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from './BottomNavigation';
import { useTheme } from './ThemeContext';

const Expense = () => {
  const [showForm, setShowForm] = useState(false);
  const { isDarkMode } = useTheme();

  const themeColors = {
    background: isDarkMode ? '#000' : '#fff',
    text: isDarkMode ? '#fff' : '#000',
    buttonBg: isDarkMode ? '#007bff' : '#e60000',
    buttonText: '#fff',
    card: isDarkMode ? '#111' : '#ccc',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: themeColors.card }]}>
        <Text style={[styles.headerText, { color: themeColors.text }]}>Expense Management</Text>
      </View>

      {/* Main Content */}
      <View style={styles.contentArea}>
        <View style={styles.iconRow}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../assets/previous_claims.png')}
              style={[styles.icon, ]}
              resizeMode="contain"
            />
            <Text style={[styles.iconLabel, { color: themeColors.text }]}>Previous Claims</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image
              source={require('../assets/pending_claims.png')}
              style={[styles.icon, ]}
              resizeMode="contain"
            />
            <Text style={[styles.iconLabel, { color: themeColors.text }]}>Claims Status</Text>
          </View>
        </View>

        {/* File New Claim Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: themeColors.buttonBg }]}
          onPress={() => setShowForm(true)}
        >
          <Text style={[styles.buttonText, { color: themeColors.buttonText }]}>File New Claim</Text>
        </TouchableOpacity>
      </View>

      {/* Popup Overlay */}
      {showForm && (
        <View style={styles.overlay}>
          <View style={[styles.popup, { backgroundColor: themeColors.background }]}>
            <View style={styles.popupHeader}>
              <Text style={[styles.popupTitle, { color: themeColors.text }]}>
                Enter the following details
              </Text>
              <TouchableOpacity onPress={() => setShowForm(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Form Inputs */}
            <View style={styles.formRow}>
              <Text style={[styles.label, { color: themeColors.text }]}>Enter Head :</Text>
              <TextInput style={[styles.inputUnderline, { color: themeColors.text, borderBottomColor: themeColors.text }]} />
            </View>

            <View style={styles.formRow}>
              <Text style={[styles.label, { color: themeColors.text }]}>Amount:</Text>
              <TextInput style={[styles.inputUnderline, { color: themeColors.text, borderBottomColor: themeColors.text }]} keyboardType="numeric" />
            </View>

            <View style={styles.row}>
              <TextInput placeholder="Month:" placeholderTextColor="#aaa" style={[styles.input, styles.halfInput]} />
              <TextInput placeholder="Year:" placeholderTextColor="#aaa" style={[styles.input, styles.halfInput]} />
            </View>

            <TextInput placeholder="Branch:" placeholderTextColor="#aaa" style={styles.input} />
            <TextInput placeholder="Department:" placeholderTextColor="#aaa" style={styles.input} />
            <TextInput placeholder="Designation:" placeholderTextColor="#aaa" style={styles.input} />
            <TextInput placeholder="HOD:" placeholderTextColor="#aaa" style={styles.input} />

            <TouchableOpacity style={[styles.submitButton, { backgroundColor: themeColors.buttonBg }]}>
              <Text style={[styles.submitText, { color: themeColors.buttonText }]}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <BottomNavigation />
    </SafeAreaView>
  );
};

export default Expense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentArea: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 30,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    width: '45%',
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
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 190,
  },
  buttonText: {
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
    fontSize: 14,
    width: 100,
  },
  inputUnderline: {
    flex: 1,
    borderBottomWidth: 1,
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
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  submitText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
