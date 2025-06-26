import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import BottomNavigation from './BottomNavigation';
// import DocumentPicker from 'react-native-document-picker'
// import DocumentPicker from '@react-native-documents/picker'
const DocumentVaultScreen = () => {
   const iconRows = [1, 2, 3, 4]; // For 5 rows of 4 icons each
  //  const submitDoc= async()=>{
  //       try{
  //           const doc =await DocumentPicker.pick();
  //           console.log(doc);
  //       }catch(err){
  //           if(DocumentPicker.isCancel(err)){
  //               console.log("user canclled the document ", err);
  //           }
  //           else{
  //               console.log(err);
  //           }
  //       }
  //  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>DOCUMENT VAULT</Text>
      </View>

      {/* Icons Grid */}
      <ScrollView contentContainerStyle={styles.iconContainer}>
        {iconRows.map((_, rowIndex) => (
            
          <View key={rowIndex} style={styles.row}>
            {[1, 2, 3, 4].map((_, colIndex) => {
              let iconSource = require('../assets/checkin.png'); // default icon

              if (rowIndex === 1) {
                iconSource = require('../assets/file.png');
              } else if (rowIndex === 2) {
                iconSource = require('../assets/pdf.png');
              }

              return (
                <Image
                  key={colIndex}
                  source={iconSource}
                  style={styles.icon}
                />
              );
            })}
          </View>
        ))}

        {/* Upload Button */}
        <TouchableOpacity style={styles.uploadButton} >
          <Text style={styles.uploadButtonText}>Upload Document</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation/>
    </View>
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
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  iconContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  icon: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  uploadButton: {
    backgroundColor: '#D90000',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
    width: '90%',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#D8D8D8',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
    resizeMode: 'contain',
  },
  navText: {
    fontSize: 12,
    color: '#000',
  },
});
