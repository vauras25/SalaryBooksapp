import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  BackHandler,
  Alert
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'; // ✅ use this
import BottomNavigation from './BottomNavigation';
import { useTheme } from './ThemeContext'; 
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Employee = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const insets = useSafeAreaInsets(); // ✅ get safe area insets

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert('Logout', 'Do you want to logout?', [
          { text: 'Cancel', onPress: () => null, style: 'cancel' },
          { text: 'Yes', onPress: () => navigation.replace('SignUpScreen') },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => backHandler.remove();
    }, [navigation])
  );

  const actions = [
    { title: 'Complete Onboarding', screen: 'Personal_Details' },
    { title: 'Attendance', screen: 'AttendanceScreen' },
    { title: 'Leaves', screen: 'Leaves' },
    { title: 'Document Vault', screen: 'document_vault' },
    { title: 'PaySlips', screen: 'Payslips' },
    { title: 'Expense Management', screen: 'Expense' },
  ];

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? '#000' : '#fff',
          paddingTop: insets.top, // ✅ avoid content under status bar
        },
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.innerContent}>
          {/* Profile Card */}
          <View style={[styles.profileCard, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f6f6f6' }]}>
            <Image
              source={require('../assets/photo.jpg')}
              style={styles.profileImage}
            />
            <View style={styles.profileText}>
              <Text style={[styles.name, { color: isDarkMode ? '#fff' : '#000' }]}>
                Employee{'\n'}Name
              </Text>
              <Text style={[styles.empId, { color: isDarkMode ? '#aaa' : '#333' }]}>
                AXIHYJ8090
              </Text>
              <Text style={[styles.email, { color: isDarkMode ? '#aaa' : '#555' }]}>
                abcdef@gmail.com
              </Text>
            </View>
          </View>

          {/* Buttons List */}
          <View style={styles.buttonsContainer}>
            {actions.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  item.title === 'Complete Onboarding'
                    ? styles.onboardingButton
                    : styles.button,
                  {
                    backgroundColor: isDarkMode ? '#222' : '#f2f2f2',
                  },
                ]}
                onPress={() => item.screen && navigation.navigate(item.screen)}
              >
                <Text style={[styles.buttonText, { color: isDarkMode ? '#fff' : '#000' }]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
};

export default Employee;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.1,
  },
  innerContent: {
    flex: 1,
    alignItems: 'center',
  },
  profileCard: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: width * 0.05,
    width: '100%',
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  profileImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: width * 0.04,
  },
  profileText: {
    flex: 1,
    marginLeft: width * 0.02,
     // changed from left: 90 (which causes layout problems)
     textAlign:'left'
  },
  name: {
    fontWeight: 'bold',
    fontSize: width * 0.045,
    marginLeft:120,
    
  },
  empId: {
    fontSize: width * 0.035,
    marginTop: 5,
    marginLeft:120,
  },
  email: {
    fontSize: width * 0.035,
    marginTop: 5,
    marginLeft:80,
  },
  buttonsContainer: {
    width: '100%',
    marginTop: height * 0.01,
    paddingBottom: height * 0.05,
  },
  onboardingButton: {
    width: '100%',
    paddingVertical: height * 0.05,
    borderRadius: 15,
    marginBottom: height * 0.015,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: height * 0.02,
    borderRadius: 25,
    marginBottom: height * 0.015,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
});
