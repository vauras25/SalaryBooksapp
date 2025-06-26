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
  Switch,
} from 'react-native';

const { width } = Dimensions.get('window');

const BankDetailsForm = () => {
  const [form, setForm] = useState({
    bankName: '',
    branch: '',
    branchAddress: '',
    pin: '',
    accountNo: '',
    reAccountNo: '',
    accountType: '',
    ifsc: '',
    micr: '',
  });



  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header with Toggle */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Enter Bank Details</Text>
          
        </View>

        {/* Conditionally Render Form */}

          <>
            {[
              { label: 'Bank Name', key: 'bankName' },
              { label: 'Branch', key: 'branch' },
              { label: 'Branch Address', key: 'branchAddress' },
              { label: 'Bank PIN', key: 'pin', keyboardType: 'number-pad' },
              { label: 'A/C No.', key: 'accountNo', keyboardType: 'number-pad' },
              { label: 'Re-Enter A/C No.', key: 'reAccountNo', keyboardType: 'number-pad' },
              { label: 'A/C Type', key: 'accountType' },
              { label: 'IFSC Code', key: 'ifsc' },
              { label: 'MICR', key: 'micr' },
            ].map(({ label, key, keyboardType }) => (
              <View key={key} style={styles.inputGroup}>
                <Text style={styles.label}>{label}:</Text>
                <TextInput
                  style={styles.input}
                  value={form[key]}
                  onChangeText={(value) => handleChange(key, value)}
                  keyboardType={keyboardType || 'default'}
                />
              </View>
            ))}

            {/* Upload and Next Buttons */}
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadText}>Upload Cheque/Passbook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.nextButton}>
              <Text style={styles.nextText}>NEXT</Text>
            </TouchableOpacity>
          </>
        
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 25,
    marginTop:20
  },
  title: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    marginLeft:80
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
  nextText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.038,
  },
});
