import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import BottomNavigation from './BottomNavigation';

const { width } = Dimensions.get('window');

const BankDetailsForm = ({navigation}) => {
  const [form, setForm] = useState({
    // first_name: '',
    // gross: '',
    first_name: '',
    last_name: '',
    mobile: '',
    dob: '',
    gender: '',
    // father_name: '',
    // email_id: '',
    // alternate_mobile: '',
    // emergency_contact: '',
    // aadhar_number: '',
    // pan_card_number: '',
    // passport_number: '',
    // nationality: '',
    // Blood_Group: '',
    // Physical_Disability: '',
    // Marital_Status: '',
    // Emergency_Contact_No: '',
    // Domicile: '',
    // Height: '',
    // Religion: '',
    // Additional_ID: ''
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const fields = [
    // { label: 'first_name', key: 'first_name' },
    // { label: 'Gross', key: 'gross', keyboardType: 'numeric' },
    { label: 'First Name', key: 'first_name' },
    { label: 'Last Name', key: 'last_name' },
    { label: 'Mobile', key: 'mobile', keyboardType: 'phone-pad' },
    { label: 'DOB', key: 'dob', type: 'date' },
    { label: 'Gender', key: 'gender', type: 'picker', options: ['Male', 'Female', 'Other'] },
    // { label: 'Father’s Name', key: 'father_name' },
    // { label: 'Email ID', key: 'email_id', keyboardType: 'email-address' },
    // { label: 'Alternate Mobile', key: 'alternate_mobile', keyboardType: 'phone-pad' },
    // { label: 'Emergency Contact', key: 'emergency_contact', keyboardType: 'phone-pad' },
    // { label: 'Aadhar Number', key: 'aadhar_number', keyboardType: 'numeric' },
    // { label: 'PAN Card Number', key: 'pan_card_number' },
    // { label: 'Passport Number', key: 'passport_number' },
    // { label: 'Nationality', key: 'nationality' },
    // { label: 'Blood Group', key: 'Blood_Group', type: 'picker', options: ['A+', 'A-', 'B+', 'B-', 'AB', 'O+', 'O-'] },
    // { label: 'Physical Disability', key: 'Physical_Disability', type: 'picker', options: ['Yes', 'No'] },
    // { label: 'Marital Status', key: 'Marital_Status', type: 'picker', options: ['Yes', 'No'] },
    // { label: 'Emergency Contact No.', key: 'Emergency_Contact_No', keyboardType: 'phone-pad' },
    // { label: 'Domicile', key: 'Domicile' },
    // { label: 'Height', key: 'Height', keyboardType: 'phone-pad' },
    // { label: 'Religion', key: 'Religion' },
    // { label: 'Additional ID', key: 'Additional_ID', keyboardType: 'phone-pad' },
  ];

  const handleNext = () => {
    setSubmitted(true);
    if (
  form.first_name.trim() === '' ||
  form.last_name.trim() === '' ||
  form.mobile.trim() === '' ||
  form.dob.trim() === '' ||
  form.gender.trim() === ''
) {
  return;
}
    navigation.navigate('Address');
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split('T')[0];
      handleChange('dob', dateString);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Personal Details</Text>
        </View>

        {fields.map(({ label, key, keyboardType, type, options }) => (
          <View key={key} style={styles.inputGroup}>
            <Text style={styles.label}>{label}:</Text>

            {type === 'date' ? (
              <>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
                  <Text>{form[key] || 'Select Date'}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={form[key] ? new Date(form[key]) : new Date()}
                    mode="date"
                    display="default"
                    maximumDate={new Date()}
                    onChange={handleDateChange}
                  />
                )}
              </>
            ) : type === 'picker' ? (
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={form[key]}
                  onValueChange={(value) => handleChange(key, value)}
                >
                  <Picker.Item label="Select" value="" />
                  {options.map((opt) => (
                    <Picker.Item key={opt} label={opt} value={opt} />
                  ))}
                </Picker>
              </View>
            ) : (
              <TextInput
                style={styles.input}
                value={form[key]}
                onChangeText={(value) => handleChange(key, value)}
                keyboardType={keyboardType || 'default'}
              />
            )}

            {(key === 'first_name' || key === 'last_name' || key === 'mobile' || key=== 'dob' || key==='gender') && submitted && form[key].trim() === '' && (
              <Text style={styles.errorText}>* {label} is required</Text>
            )}
          </View>
        ))}

        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadText}>Upload Cheque/Passbook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.nextButton,
             (form.first_name.trim() === '' || form.last_name.trim() === '' || form.mobile.trim()==='' || form.dob.trim()==='' || form.gender.trim()==='') && styles.disabledButton,
          ]}
          onPress={handleNext}
        >
          <Text style={styles.nextText}>NEXT</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* <BottomNavigation /> */}
    </SafeAreaView>
  );
};

export default BankDetailsForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: width * 0.06,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 25,
    marginTop: 20,
  },
  title: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: width * 0.035,
    marginBottom: 5,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: width * 0.035,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  uploadButton: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 15,
  },
  uploadText: {
    color: '#333',
    fontSize: width * 0.037,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#005b9f',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  nextText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.038,
  },
  errorText: {
    color: 'red',
    fontSize: width * 0.03,
    marginTop: 3,
  },
});
