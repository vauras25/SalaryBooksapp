import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './src/screens/SignUpScreen';
import Employee from './src/screens/Employee';
import Payslips from './src/screens/Payslips';
import Expense from './src/screens/Expense';
import Document_vault from './src/screens/document_vault';
import BankDetailsForm from './src/screens/BankDetailsForm';
import Personal_Details from './src/screens/Personal_Details';
import Address from './src/screens/Address';
import AttendanceScreen from './src/screens/AttendanceScreen';
import Leaves from './src/screens/Leaves';
import Settings from './src/screens/Settings';
import { ThemeProvider } from './src/screens/ThemeContext';
const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? '#000' : '#fff' }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? '#000' : '#fff'}
        />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SignUp">
            <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} options={{ headerShown: false }} />
            <Stack.Screen name="BankDetailsForm" component={BankDetailsForm} options={{ headerShown: false }} />
            <Stack.Screen name="Address" component={Address} options={{ headerShown: false }} />
            <Stack.Screen name="Personal_Details" component={Personal_Details} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Employee" component={Employee} options={{ headerShown: false }} />
            <Stack.Screen name="Payslips" component={Payslips} options={{ headerShown: false }} />
            <Stack.Screen name="Expense" component={Expense} options={{ headerShown: false }} />
            <Stack.Screen name="document_vault" component={Document_vault} options={{ headerShown: false }} />
            <Stack.Screen name="Leaves" component={Leaves} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
