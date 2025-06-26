import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import BottomNavigation from './BottomNavigation';
const Employee = ({navigation}) => {
  const icons = {
        Expenses: require('../assets/expenses.png'),
        Leaves: require('../assets/leaves.png'),
        Payslips: require('../assets/payslips.png'),
        'Check In': require('../assets/checkin.png'),
        Settings: require('../assets/settings.png'),
        };
  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image
          source={require('../assets/logo.png')} // replace with your actual image
          style={styles.profileImage}
        />
        <View style={styles.profileText}>
          <Text style={styles.name}>Employee{'\n'}Name</Text>
          <Text style={styles.empId}>AXIHYJ8090</Text>
          <Text style={styles.email}>abcdef@gmail.com</Text>
        </View>
      </View>

      {/* Action List */}
      <View style={styles.actionCard}>
        {[
          'ADD ATTENDANCE',
          'CHECK ATTENDANCE LOG',
          'CHECK LEAVES AVAILABLE',
          'PAYSLIPS',
          'EXPENSE MANAGEMENT',
          'DOCUMENT VAULT',
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.actionItem}
            onPress={()=>{
              if(item === 'PAYSLIPS'){
                navigation.navigate('Payslips');
              }
              else if(item === 'DOCUMENT VAULT'){
                navigation.navigate('document_vault')
              }
              else if(item === 'EXPENSE MANAGEMENT'){
                navigation.navigate('Expense');
              }
            }
            }>
            <Text style={styles.actionText}>{item}</Text>
            <View style={styles.underline} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Navigation */}
      

    <BottomNavigation/>
    </SafeAreaView>
  );
};

export default Employee;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00508B',
    padding: 20,
    justifyContent: 'space-between',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: -5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:-5
    
    
  },
  profileImage: {
    width: 80,
    height: 80,
    borderColor:'#000',
    borderRadius: 40,
    left:15,
    top:-10
  },
  profileText: {
    top:20,
    marginLeft: 20,
    flex: 1,
    marginBottom:50
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'right',
    marginRight:15
  },
  empId: {
    fontSize: 14,
    textAlign: 'right',
    color: '#333',
    top:10,
    marginRight:15
  },
  email: {
    fontSize: 14,
    textAlign: 'right',
    color: '#555',
    marginRight:15,
    top:10
  },
  actionCard: {
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 35,
    top:-60
  },
  actionItem: {
    marginBottom: 15,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  underline: {
    height: 1,
    backgroundColor: 'red',
    marginTop: 5,
  },
  
});
