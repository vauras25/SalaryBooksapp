import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavigation from "../BottomNavigation";
import ModalSelector from "react-native-modal-selector";
import axios from "axios";
import RNBlobUtil from "react-native-blob-util";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FileViewer from "react-native-file-viewer";

const PayslipScreen = () => {



 const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth(); 
  const currentYear = currentDate.getFullYear();

  const months = [
    { key: 0, label: "January" },
    { key: 1, label: "February" },
    { key: 2, label: "March" },
    { key: 3, label: "April" },
    { key: 4, label: "May" },
    { key: 5, label: "June" },
    { key: 6, label: "July" },
    { key: 7, label: "August" },
    { key: 8, label: "September" },
    { key: 9, label: "October" },
    { key: 10, label: "November" },
    { key: 11, label: "December" },
  ];

  const years = Array.from({ length: 6 }, (_, i) => ({
    key: i,
    label: `${2020 + i}`,
  }));

  const [selectedMonth, setSelectedMonth] = useState(months[currentMonthIndex].label);
  const [selectedYear, setSelectedYear] = useState(String(currentYear));
  const [payslipData, setPayslipData] = useState(null);
  const [token, setToken] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    const loadToken = async () => {
      const t = await AsyncStorage.getItem("authToken");
      setToken(t);
      console.log("TOKEN LOADED:", t);
    };
    loadToken();
  }, []);

  const monthsToShow = useMemo(() => {
    if (Number(selectedYear) === currentYear) {
      return months.slice(0, currentMonthIndex + 1);
    }
    return months;
  }, [selectedYear]);

  useEffect(() => {
    const allowed = monthsToShow.map((m) => m.label);
    if (!allowed.includes(selectedMonth)) {
      setSelectedMonth(allowed[allowed.length - 1]);
    }
  }, [monthsToShow]);

  
  const fetchPayslips = async () => {
    if (!token) return;

    try {
      const payload = {
        pageno: 1,
        perpage: 10,
        wage_year: selectedYear,
        row_checked_all: true,
        checked_row_ids: "[]",
        unchecked_row_ids: "[]",
      };

      console.log("Calling API for:", selectedMonth, selectedYear);

      const response = await axios.post(
        "http://10.0.2.2:8080/employee/get-generated-payslip-data",
        payload,
        {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        }
      );
      // const payslip_data=AsyncStorage.setItem('payslip_data',response);
      console.log("API Response:", response.data);

      if (response.data.status === "success") {
        setPayslipData(response.data);
      } else {
        Alert.alert("Error", "Unable to load payslip data");
      }
    } catch (error) {
      console.log("API Error:", error);
      Alert.alert("API Error", error.message);
    }
  };

  useEffect(() => {
    fetchPayslips();
  }, [selectedMonth, selectedYear, token]);


  const download_payslip = async (monthKey, year) => {
    if (!payslipData) {
      Alert.alert("Error", "Payslip data not loaded");
      return;
    }

    const docs = payslipData.master_data.docs;
    console.log(docs,"docs");
    
    let matched = docs.find((item) => item.wage_month === monthKey);

    if (!matched) {
      Alert.alert("Error", "No payslip found for this month");
      return;
    }

    const payload = {
      row_checked_all: false,
      pageno: 1,
      perpage: 20,
      wage_month: monthKey,
      wage_year: parseInt(year),
      checked_row_ids: JSON.stringify([matched._id]),
      unchecked_row_ids: "[]",
      type: "download",
    };

    try {
      const { config, fs } = RNBlobUtil;
      const downloads = fs.dirs.DownloadDir;
      const path = `${downloads}/payslip_${monthKey}_${year}.pdf`;

      const res = await config({
        fileCache: true,
        path,
        overwrite: true,
      }).fetch(
        "POST",
        "http://10.0.2.2:8080/employee/download-payslip-data",
        {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        JSON.stringify(payload)
      );

      Alert.alert("Success", "Payslip downloaded!");

    } catch (err) {
      console.log("Download Error:", err);
      Alert.alert("Download Failed", err.message);
    }
  };


  // const view_payslip = async (monthKey, year) => {
  //   try {
  //     const filePath = `${RNBlobUtil.fs.dirs.DownloadDir}/payslip_${monthKey}_${year}.pdf`;
  //     await FileViewer.open(filePath);
  //   } catch (error) {
  //     Alert.alert("Cannot open file", "Install a PDF viewer");
  //   }
  // };

  const view_payslip = (monthKey, year) => {
  if (!payslipData) {
    Alert.alert("Error", "Payslip data not loaded");
    return;
  }

  const docs = payslipData.master_data.docs;

  let matched = docs.find((item) => item.wage_month === monthKey);

  if (!matched) {
    Alert.alert("Error", "No payslip found for this month");
    return;
  }

  navigation.navigate("ViewPayslipScreen", { data: matched });
};

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
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

        {/* Month Dropdown */}
        {/* <ModalSelector
          data={monthsToShow}
          initValue="Select Month"
          onChange={(option) => setSelectedMonth(option.label)}
        >
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>{selectedMonth}</Text>
            <Icon name="chevron-down-outline" size={18} color="#ccc" />
          </TouchableOpacity>
        </ModalSelector> */}

        {/* Year Dropdown */}
        <ModalSelector
          data={years}
          initValue="Select Year"
          onChange={(option) => setSelectedYear(option.label)}
        >
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>{selectedYear}</Text>
            <Icon name="chevron-down-outline" size={18} color="#ccc" />
          </TouchableOpacity>
        </ModalSelector>

      </View>

      {/* Month List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {monthsToShow.map((month) => (
          <TouchableOpacity
            key={month.key}
            style={[
              styles.monthCard,
              selectedMonth === month.label && { backgroundColor: "#0D1B2A" },
            ]}
            onPress={() => setSelectedMonth(month.label)}
          >
            <Text style={styles.monthText}>{month.label}</Text>

            <View style={styles.actionIcons}>
              <TouchableOpacity onPress={() => view_payslip(month.key, selectedYear)}>
                <Image
                  source={require("../../assets/eye.png")}
                  style={styles.iconImage}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => download_payslip(month.key, selectedYear)}
              >
                <Image
                  source={require("../../assets/download.png")}
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

/* ================  STYLES  ================== */

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
    marginBottom: 20,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0F345C",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "80%",
    justifyContent: "space-between",
  },
  filterText: {
    fontSize: 14,
    color: "#fff",
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
  iconImage: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  actionIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
});
