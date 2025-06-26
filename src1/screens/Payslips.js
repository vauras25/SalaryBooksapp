import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  PermissionsAndroid,
  Platform
} from 'react-native';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { useNavigation } from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';

const PayslipScreen = () => {
  const navigation = useNavigation();

  const months = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL',
    'MAY', 'JUNE', 'JULY', 'AUGUST',
    'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
  ];

  const icons = {
    Expenses: require('../assets/expenses.png'),
    Leaves: require('../assets/leaves.png'),
    Payslips: require('../assets/payslips.png'),
    'Check In': require('../assets/checkin.png'),
    Settings: require('../assets/settings.png'),
  };

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
      const assetPath = `pdfs/${fileName}`; // Make sure this folder exists in android/app/src/main/assets/pdfs/
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>PAYSLIPS STATEMENTS</Text>
      </View>

      {/* List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {months.map((month, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.monthText}>{month}</Text>
            <View style={styles.iconGroup}>
              <TouchableOpacity onPress={() => handleView(month)}>
                <Image source={require('../assets/eye.png')} style={styles.iconImage} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDownload(month)}>
                <Image source={require('../assets/download.png')} style={styles.iconImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.underline} />
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation/>
    </View>
  );
};

export default PayslipScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    backgroundColor: '#ccc',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
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
    color: '#000',
  },
  iconGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: -20,
  },
  underline: {
    height: 1,
    backgroundColor: 'red',
    marginTop: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#333',
    backgroundColor: '#000',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
    color: '#fff',
  },
  navLabel: {
    color: '#fff',
    fontSize: 12,
  },
  navIconImage: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  iconImage: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});
