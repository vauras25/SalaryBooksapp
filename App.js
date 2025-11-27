import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './src/screens/SignUpScreen';
import Dashboard from './src/screens/DashboardScreen';
import Payslips from './src/screens/Payslip/Payslips';
import Expense from './src/screens/Expense';
import Document_vault from './src/screens/document_vault';
import BankDetailsForm from './src/screens/BankDetailsForm';
import Personal_Details from './src/screens/Personal_Details';
import Address from './src/screens/Address';
import AttendanceScreen from './src/screens/AttendanceScreen';
import Leaves from './src/screens/Leaves';
import Settings from './src/screens/Settings';
import { ThemeProvider } from './src/screens/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Advance from './src/screens/AdvanceScreen/Advance';
import ViewPayslipScreen from "./src/screens/Payslip/ViewPayslipScreen";
Ionicons.loadFont();
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
          <Stack.Navigator initialRouteName="SignUpScreen" >
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} options={{ headerShown: false }} />
            <Stack.Screen name="BankDetailsForm" component={BankDetailsForm} options={{ headerShown: false }} />
            <Stack.Screen name="Address" component={Address} options={{ headerShown: false }} />
            <Stack.Screen name="Personal_Details" component={Personal_Details} options={{ headerShown: false }} />
            {/* <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} /> */}
            <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
            <Stack.Screen name="Payslips" component={Payslips} options={{ headerShown: false }} />
            <Stack.Screen name="Expense" component={Expense} options={{ headerShown: false }} />
            <Stack.Screen name="document_vault" component={Document_vault} options={{ headerShown: false }} />
            <Stack.Screen name="Leaves" component={Leaves} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
            <Stack.Screen name="Advance" component={Advance} options={{ headerShown: false }} />
            <Stack.Screen name="ViewPayslipScreen" component={ViewPayslipScreen} options={{ headerShown: true, title: "Payslip Details" }}
/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
