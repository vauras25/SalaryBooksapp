import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');

const STATES = ['West Bengal', 'Maharashtra', 'Tamil Nadu', 'Karnataka'];
const DISTRICTS = ['Kolkata', 'Mumbai', 'Chennai', 'Bangalore'];
const COUNTRIES = ['India', 'USA', 'UK', 'Canada'];

const AddressForm = ({ navigation }) => {
  const initialForm = {
    residenceNo: '',
    residenceName: '',
    road: '',
    locality: '',
    city: '',
    district: '',
    state: '',
    pin: '',
    country: '',
  };

  const [showCurrentForm, setShowCurrentForm] = useState(false);
  const [permanentAddress, setPermanentAddress] = useState(initialForm);
  const [currentAddress, setCurrentAddress] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const isFormValid = (form) =>
    Object.values(form).every((v) => v.trim() !== '');

  const canSubmit =
    isFormValid(permanentAddress) &&
    (!showCurrentForm || isFormValid(currentAddress));

  const handleChange = (key, value, isCurrent = false) => {
    const update = isCurrent ? setCurrentAddress : setPermanentAddress;
    const state = isCurrent ? currentAddress : permanentAddress;
    update({ ...state, [key]: value });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (canSubmit) {
      navigation.navigate('BankDetailsForm');
    } else {
      Alert.alert('Validation Error', 'Please fill in all fields.');
    }
  };

  const renderForm = (label, data, isCurrent = false) => (
    <View style={styles.formContainer}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Enter {label} Address</Text>
      </View>

      {[
        { key: 'residenceNo', label: 'Residence No.', type: 'numeric' },
        { key: 'residenceName', label: 'Residence Name', type: 'default' },
        { key: 'road', label: 'Road', type: 'default' },
        { key: 'locality', label: 'Locality/Area', type: 'default' },
        { key: 'city', label: 'City/Town', type: 'default' },
      ].map((item, idx) => (
        <View key={idx} style={styles.inputGroup}>
          <Text style={styles.label}>{item.label}</Text>
          <TextInput
            style={styles.input}
            value={data[item.key]}
            onChangeText={(val) => handleChange(item.key, val, isCurrent)}
            keyboardType={item.type}
          />
          {submitted && data[item.key].trim() === '' && (
            <Text style={styles.errorText}>* {item.label} is required</Text>
          )}
        </View>
      ))}

      {/* District Picker */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>District</Text>
        <Picker
          selectedValue={data.district}
          onValueChange={(val) => handleChange('district', val, isCurrent)}
          style={styles.picker}
        >
          <Picker.Item label="Select District" value="" />
          {DISTRICTS.map((d, i) => (
            <Picker.Item key={i} label={d} value={d} />
          ))}
        </Picker>
        {submitted && data.district.trim() === '' && (
          <Text style={styles.errorText}>* District is required</Text>
        )}
      </View>

      {/* State Picker */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>State</Text>
        <Picker
          selectedValue={data.state}
          onValueChange={(val) => handleChange('state', val, isCurrent)}
          style={styles.picker}
        >
          <Picker.Item label="Select State" value="" />
          {STATES.map((s, i) => (
            <Picker.Item key={i} label={s} value={s} />
          ))}
        </Picker>
        {submitted && data.state.trim() === '' && (
          <Text style={styles.errorText}>* State is required</Text>
        )}
      </View>

      {/* PIN */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Pin Code</Text>
        <TextInput
          style={styles.input}
          value={data.pin}
          onChangeText={(val) => handleChange('pin', val, isCurrent)}
          keyboardType="numeric"
          maxLength={6}
        />
        {submitted && data.pin.trim() === '' && (
          <Text style={styles.errorText}>* Pin Code is required</Text>
        )}
      </View>

      {/* Country Picker */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Country</Text>
        <Picker
          selectedValue={data.country}
          onValueChange={(val) => handleChange('country', val, isCurrent)}
          style={styles.picker}
        >
          <Picker.Item label="Select Country" value="" />
          {COUNTRIES.map((c, i) => (
            <Picker.Item key={i} label={c} value={c} />
          ))}
        </Picker>
        {submitted && data.country.trim() === '' && (
          <Text style={styles.errorText}>* Country is required</Text>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {renderForm('Permanent', permanentAddress)}

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>
          Is <Text style={{ fontWeight: 'bold' }}>Current Residential Address</Text> different?
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.toggleButton, { backgroundColor: 'green' }]}
            onPress={() => setShowCurrentForm(true)}
          >
            <Text style={styles.toggleButtonText}>YES</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, { backgroundColor: 'red' }]}
            onPress={() => setShowCurrentForm(false)}
          >
            <Text style={styles.toggleButtonText}>NO</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showCurrentForm && renderForm('Current', currentAddress, true)}

      <TouchableOpacity
        style={[styles.nextButton, { opacity: canSubmit ? 1 : 0.5 }]}
        disabled={!canSubmit}
        onPress={handleSubmit}
      >
        <Text style={styles.nextButtonText}>NEXT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  formContainer: {
    marginBottom: 20,
  },
  titleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    marginTop: 40,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    minWidth: width * 0.8,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 15,
    marginBottom: 4,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  toggleContainer: {
    marginVertical: 20,
  },
  toggleText: {
    fontSize: 15,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  nextButton: {
    marginTop: 16,
    backgroundColor: '#00509E',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default AddressForm;
