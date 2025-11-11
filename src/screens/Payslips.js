import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavigation from "./BottomNavigation";

const PayslipScreen = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleView = (month) => {
    console.log("View payslip for:", month);
    // navigation.navigate('PayslipDetails', { month })
  };

  const handleDownload = (month) => {
    console.log("Download payslip for:", month);
    // Implement download logic
  };

//   const handleSignIn = async () => {
//     // const data = {
//     //       corporate_id: corporateId,
//     //       password: password,
//     //       userid: userId
//     //     };
//     try {
//       // const url = 'https://api.vauras.cloud/api/employee_signin';
//       const url = 'https://back.finalpayroll.in/employee_signin';
//       navigation.navigate('Dashboard');
//       const data = { corporate_id: corporateId, userid: userId, password };
//       const response = await axios.post(url, data, {
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (response.data.status === 'success') {
//         navigation.navigate('Dashboard');
//       }
//     } catch (error) {
//       console.error('Login Failed:', error.response?.data || error.message);
//     }
//   };
//  useEffect(() =>{
//   handleSignIn();
//  })

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon name="logo-usd" size={24} color="#fff" />
          <Text style={styles.headerTitle}>Payslips</Text>
        </View>
        <View style={styles.headerIcons}>
          <Icon name="search-outline" size={22} color="#fff" style={styles.icon} />
          <Icon name="notifications-outline" size={22} color="#fff" />
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Month</Text>
          <Icon name="chevron-down-outline" size={18} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Year</Text>
          <Icon name="chevron-down-outline" size={18} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Month List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {months.map((month, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.monthCard,
              selectedMonth === month && { backgroundColor: "#0D1B2A" },
            ]}
            onPress={() => setSelectedMonth(month)}
          >
            <Text style={styles.monthText}>{month}</Text>
            <View style={styles.actionIcons}>
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
          </TouchableOpacity>
        ))}
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
};

export default PayslipScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001F3F",
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#102A43",
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0F345C",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: "47%",
    justifyContent: "space-between",
  },
  filterText: {
    color: "#ccc",
    fontSize: 14,
  },
  monthCard: {
    backgroundColor: "#123456",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  monthText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  actionIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionIcon: {
    marginRight: 15,
  },
  iconImage: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});
