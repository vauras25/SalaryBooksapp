import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
} from 'react-native';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from './ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomNavigation from './BottomNavigation';

const PayslipScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();

  const allMonths = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL',
    'MAY', 'JUNE', 'JULY', 'AUGUST',
    'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
  ];

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState('');
  const years = [2022, 2023, 2024, 2025];
  const filteredMonths = selectedMonth ? [selectedMonth] : allMonths;

  const handleDownload = async (month) => {
    const fileName = `${month.toLowerCase()}.pdf`;
    const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission denied', 'Enable storage permission.');
        return;
      }
    }

    try {
      const assetPath = `pdfs/${fileName}`;
      await RNFS.copyFileAssets(assetPath, destPath);
      Alert.alert('Download complete', `Saved to: ${destPath}`);
    } catch (error) {
      console.log('Copy error:', error);
      Alert.alert('Error', 'Failed to download file.');
    }
  };

  const handleView = async (month) => {
    const fileName = `${month.toLowerCase()}.pdf`;
    const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    try {
      await FileViewer.open(filePath, { showOpenWithDialog: true });
    } catch (error) {
      console.log('View error:', error);
      Alert.alert('Error', 'Failed to open file. Make sure it is downloaded.');
    }
  };

  const styles = getStyles(isDarkMode, insets);

  return (
    <SafeAreaView style={styles.screenWrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>PAYSLIPS STATEMENTS</Text>
        </View>

        <View style={styles.filterRow}>
          <View style={styles.pickerWrapper}>
            <Text style={styles.pickerLabel}>Year</Text>
            <Picker
              selectedValue={selectedYear}
              onValueChange={(value) => setSelectedYear(value)}
              style={styles.picker}
              dropdownIconColor={isDarkMode ? '#fff' : '#000'}
            >
              {years.map((year) => (
                <Picker.Item key={year} label={`${year}`} value={year} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Text style={styles.pickerLabel}>Month</Text>
            <Picker
              selectedValue={selectedMonth}
              onValueChange={(value) =>
                setSelectedMonth(value === selectedMonth ? '' : value)
              }
              style={styles.picker}
              dropdownIconColor={isDarkMode ? '#fff' : '#000'}
            >
              <Picker.Item label="All" value="" />
              {allMonths.map((month) => (
                <Picker.Item key={month} label={month} value={month} />
              ))}
            </Picker>
          </View>
        </View>

        <ScrollView
          style={{ marginBottom: 100 }}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {filteredMonths.map((month, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.monthText}>{month}</Text>
              <View style={styles.iconGroup}>
                <TouchableOpacity onPress={() => handleView(month)}>
                  <Image
                    source={require('../assets/eye.png')}
                    style={styles.iconImage}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDownload(month)}>
                  <Image
                    source={require('../assets/download.png')}
                    style={styles.iconImage}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.underline} />
            </View>
          ))}
        </ScrollView>
      </View>
      <BottomNavigation />
    </SafeAreaView>
  );
};

export default PayslipScreen;

const getStyles = (isDarkMode, insets) =>
  StyleSheet.create({
    screenWrapper: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000' : '#f2f2f2',
      paddingTop: insets.top,
    },
    container: {
      flex: 1,
    },
    header: {
      backgroundColor: isDarkMode ? '#111' : '#ccc',
      padding: 15,
      alignItems: 'center',
    },
    headerText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
    },
    filterRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      marginVertical: 10,
    },
    pickerWrapper: {
      flex: 1,
      marginHorizontal: 5,
    },
    pickerLabel: {
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
      marginBottom: 5,
    },
    picker: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
      borderRadius: 8,
    },
    scrollContainer: {
      padding: 10,
    },
    row: {
      marginBottom: 15,
    },
    monthText: {
      fontSize: 16,
      fontWeight: '500',
      color: isDarkMode ? '#fff' : '#000',
    },
    iconGroup: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: -20,
    },
    iconImage: {
      width: 20,
      height: 20,
      marginLeft: 10,
    },
    underline: {
      height: 1,
      backgroundColor: isDarkMode ? '#fff' : '#000',
      marginTop: 10,
    },
  });
