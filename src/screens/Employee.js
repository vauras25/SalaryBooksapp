import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  useColorScheme,
} from 'react-native';
import BottomNavigation from './BottomNavigation';
import { useTheme } from './ThemeContext'; 
const { width, height } = Dimensions.get('window');

const Employee = ({ navigation }) => {
  const  { isDarkMode }  = useTheme();

  const actions = [
    { title: 'Complete Onboarding', screen: 'Personal_Details' },
    { title: 'Attendance', screen: 'AttendanceScreen' },
    { title: 'Leaves', screen: 'Leaves' },
    { title: 'Document Vault', screen: 'document_vault' },
    { title: 'PaySlips', screen: 'Payslips' },
    { title: 'Expense Management', screen: 'Expense' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
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
                onPress={() => {
                  if (item.screen) {
                    navigation.navigate(item.screen);
                  }
                }}>
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
    marginTop: 29,
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
    left: 90,
  },
  name: {
    fontWeight: 'bold',
    fontSize: width * 0.045,
  },
  empId: {
    fontSize: width * 0.035,
    marginTop: 5,
  },
  email: {
    fontSize: width * 0.035,
    marginTop: 5,
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
