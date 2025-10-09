import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Platform,
  Alert,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import DocumentPicker from 'react-native-document-picker';
import BottomNavigation from './BottomNavigation';

const { width } = Dimensions.get('window');
const iconRows = [1, 2, 3, 4];

const DocumentVaultScreen = () => {
  const [fileName, setFileName] = useState(null);
  const insets = useSafeAreaInsets();

  const checkStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
        const hasPermission = await PermissionsAndroid.check(permission);

        if (!hasPermission) {
          const status = await PermissionsAndroid.request(permission, {
            title: 'Storage Permission',
            message: 'App needs access to your storage to select files',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          });
          return status === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // const pickDocument = async () => {
  //   try {
  //     const hasPermission = await checkStoragePermission();
  //     if (!hasPermission) {
  //       Alert.alert(
  //         'Permission Required',
  //         'Please grant storage permission in app settings',
  //         [
  //           { text: 'Cancel', style: 'cancel' },
  //           { text: 'Open Settings', onPress: () => Linking.openSettings() },
  //         ]
  //       );
  //       return;
  //     }

  //     const res = await DocumentPicker.pickSingle({
  //       type: [DocumentPicker.types.allFiles],
  //     });

  //     setFileName(res.name);
  //     Alert.alert('Success', `File selected: ${res.name}`);
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       console.log('User cancelled file picker');
  //     } else {
  //       console.error('Document picker error:', err);
  //       Alert.alert('Error', err.message || 'Failed to pick document');
  //     }
  //   }
  // };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>DOCUMENT VAULT</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {iconRows.map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {[1, 2, 3, 4].map((_, colIndex) => {
              let iconSource = require('../assets/checkin.png');
              if (rowIndex === 1) iconSource = require('../assets/file.png');
              else if (rowIndex === 2) iconSource = require('../assets/pdf.png');

              return (
                <Image
                  key={`${rowIndex}-${colIndex}`}
                  source={iconSource}
                  style={styles.icon}
                />
              );
            })}
          </View>
        ))}

        <View style={styles.uploadContainer}>
          <TouchableOpacity style={styles.uploadButton} >
            <Text style={styles.uploadButtonText}>Upload Document</Text>
          </TouchableOpacity>

          {fileName && (
            <Text style={styles.fileName}>Selected file: {fileName}</Text>
          )}
        </View>
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
};

export default DocumentVaultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F3F0',
  },
  header: {
    backgroundColor: '#D8D8D8',
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 0.05 * width,
    fontWeight: '600',
    color: '#000',
  },
  scrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
    paddingBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  icon: {
    width: width * 0.18,
    height: width * 0.18,
    marginHorizontal: 5,
    resizeMode: 'contain',
  },
  uploadContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#D90000',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: '600',
  },
  fileName: {
    marginTop: 15,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
