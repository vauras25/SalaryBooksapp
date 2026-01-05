import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { PieChart } from "react-native-svg-charts";
// import { G, Line } from "react-native-svg";
import * as Progress from "react-native-progress";
import { Picker } from '@react-native-picker/picker';
import BottomNavigation from "../BottomNavigation";
import LeaveManagement from "../Dashboardscreen/leave_balance";
import DatePicker from 'react-native-date-picker';
import axios from "axios";
import { API_BASE_URL } from "@env";
import { useRoute } from "@react-navigation/native";
import Navbar from "../Dashboardscreen/navbar"
// import { useEffect } from "react";
export default function LeaveManagementScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [openFromDate, setOpenFromDate] = useState(false);
  const [openToDate, setOpenToDate] = useState(false);
  const [noOfDays, setNoOfDays] = useState("");
  const [remainingLeaves, setRemainingLeaves] = useState("");
  const [reason, setReason] = useState("");
  const [token, setToken] = useState(null);
  const [LeaveList, setLeaveList] = useState(null);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setuserData] = useState(null);
  const [Leavedata, setLeavedata] = useState(null);
  const [employee_id, setemployee_id] = useState(null);
  // useEffect(() => {
  //   const loadToken = async () => {
  //     const t = await AsyncStorage.getItem("authToken");
  //     setToken(t);
  //     console.log("TOKEN LOADED:", t);
  //   };
  //   loadToken();
  // }, []);
  useEffect(() => {
    const loadTokenAndFetch = async () => {
      const t = await AsyncStorage.getItem("authToken");
      const stored = await AsyncStorage.getItem("userData");
      setemployee_id(await AsyncStorage.getItem("employee_id"));
      
      
      if (stored) {
        const parsedUser = JSON.parse(stored);
        setuserData(parsedUser);
        // console.log(setuserData,'id');
        // console.log(employee_id,"employee_id");
      }
      setToken(t);
      console.log("TOKEN LOADED:", t);
      // fetch_applied_leave_data();
      // if (t) {
      //   fetch_leave_list(t);
      // }
    };

    loadTokenAndFetch();
  }, []);

  useEffect(() => {
    if (userData && userData.emp_id && token) {
      fetch_applied_leave_data();
      fetch_leave_list(token);
    }
  }, [userData, token]);


  const pieData = [
    {
      value: 53,
      svg: { fill: "#2bbaf5" },
      key: "progress",
    },
    {
      value: 47,
      svg: { fill: "#1c2a4e" },
      key: "remaining",
    },
  ];

  // useEffect(() => {
  //   const days = calculateDays(fromDate, toDate);
  //   const RemainingLeaves = LeaveList.leave_type[0].available - days;
  //   if (days !== "") {
  //     setNoOfDays(String(days));
  //     setRemainingLeaves(String(RemainingLeaves));
  //   }
  // }, [fromDate, toDate]);


  useEffect(() => {
    if (!LeaveList || !LeaveList.leave_type || !selectedLeave) return;

    const days = calculateDays(fromDate, toDate);
    if (days !== "") {
      setNoOfDays(String(days));
      setRemainingLeaves(
        String(selectedLeave.available - days)
      );
    }
  }, [fromDate, toDate, selectedLeave, LeaveList]);


  const calculateDays = (from, to) => {
    if (!from || !to) return "";

    const start = new Date(from);
    const end = new Date(to);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diffTime = end - start;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays >= 0 ? diffDays + 1 : "";
  };





  const fetch_leave_list = async (token) => {


    if (!token) return;
    console.log(API_BASE_URL,"API_BASE_URL");
    
    try {
      const payload = {}
      const response = await axios.post(
        `${API_BASE_URL}employee/employee-leave-type-list`,
        payload,
        {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data);
      if (response.data.status === "success") {
        setLeaveList(response.data);
        setRemainingLeaves(response.data.leave_type[0].available);
      } else {
        Alert.alert("Error", "Unable to load payslip data");
      }
    } catch (error) {
      console.log("API Error:", error);
      Alert.alert("API Error", error.message);
    }
  }

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  // const handleSubmit = async () => {
  //   console.log(LeaveList.leave_type[0].available, "LeaveList");

  //   if (!token) return;
  //   try {
  //     const formData = new FormData();
  //     formData.append("leave_head", LeaveList.leave_type[0].abbreviation);
  //     formData.append("from_date", fromDate.toISOString());
  //     formData.append("to_date", toDate.toISOString());
  //     formData.append("no_of_days", noOfDays);
  //     formData.append("remaining_leaves", remainingLeaves);
  //     formData.append("reason", reason);
  //     formData.append("available", LeaveList.leave_type[0].available);

  //     const response = await axios.post(`${API_BASE_URL}employee/employee-leave-request`,
  //       formData,
  //       {
  //         headers: {
  //           "x-access-token": token,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     const data = response.data;

  //     console.log("API Response:", data);

  //     if (data.status === "success") {
  //       Alert.alert("Success", "Advance request submitted");
  //       // fetchAdvanceList();
  //       setModalVisible(false);
  //     } else {
  //       Alert.alert("Error", data.message || "Something went wrong");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     Alert.alert("Error", "Failed to submit Leave request");
  //   }
  // }

  const formatDateRange = (from, to) => {
    const options = { month: "short", day: "2-digit" };

    const fromDate = new Date(from).toLocaleDateString("en-US", options);
    const toDate = new Date(to).toLocaleDateString("en-US", options);

    return `${fromDate} - ${toDate}`;
  };

  const handleSubmit = async () => {
    if (!token || !selectedLeave) {
      Alert.alert("Error", "Please select leave type");
      return;
    }

    try {
    
      
      const formData = new FormData();
      formData.append("leave_head", selectedLeave.abbreviation);
      formData.append("employee_id", employee_id);
      formData.append("from_date", fromDate.toISOString());
      formData.append("to_date", toDate.toISOString());
      formData.append("no_of_days", noOfDays);
      formData.append("leave_temp_head_id", selectedLeave.leave_temp_head_id);
      formData.append("remaining_leaves", remainingLeaves);
      formData.append("emp_reason", reason);
      formData.append("available", selectedLeave.available);

      const response = await axios.post(
        `${API_BASE_URL}employee/employee-leave-request`,
        formData,
        {
          headers: {
            "x-access-token": token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
// console.log("1");

      if (response.data.status === "success") {
        Alert.alert("Success", "Leave request submitted");
        setModalVisible(false);
        fetch_applied_leave_data();
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (err) {
      // console.log(err,"err");
      
      Alert.alert("Error", "Failed to submit Leave request");
    }
  };


  const fetch_applied_leave_data = async () => {
    //  console.log(userData,"hi i am abir");
    try {
      const response = await axios.post(
        `${API_BASE_URL}employee/fetch_applied_leave_data`,
        { employee_id: String(userData.emp_id) },
        { headers: { "x-access-token": token } }
      );

      if (response.data.success) {
        setLeavedata(response.data.data)
        console.log(Leavedata, "response.data");

      }
    } catch (error) {
      console.log("Fetch Docs Error:", error.response?.data || error);
    }
  }
  const route = useRoute();
  const screenTitle = route.params?.title;
  const getUsedLeavePercentage = () => {
  const leaveStats = LeaveList?.leave_type || [];

  const totalBalance = leaveStats.reduce(
    (sum, item) => sum + Number(item.total_balance || 0),
    0
  );

  const totalAvailable = leaveStats.reduce(
    (sum, item) => sum + Number(item.available || 0),
    0
  );

  if (totalBalance === 0) return 0;
  console.log(Math.round(
    ((totalBalance - totalAvailable) / totalBalance) * 100
  ),"total");
  
  return Math.round(
    ((totalBalance - totalAvailable) / totalBalance) * 100
  );
};
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return (
    <LinearGradient
      colors={["#000000ff", "#1c68beff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Header */}
        <View style={styles.header}>
          {/* <Text style={styles.headerText}>Leave Management</Text> */}
          <Navbar title={screenTitle} />
          {/* <View style={styles.icons}>
            <Text style={{ color: "#fff", fontSize: 20 }}>🔍</Text>
            <Text style={{ color: "#fff", fontSize: 20, marginLeft: 18 }}>
              
            </Text>
          </View> */}
        </View>

        {/* Month Selector */}
        <View style={styles.selectorRow}>
          <TouchableOpacity style={styles.selectorBox}>
            <Text style={styles.selectorText}>September</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.selectorBox}>
            <Text style={styles.selectorText}>2025</Text>
          </TouchableOpacity>
        </View>

        {/* Leave Summary Card */}
        {/* <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Leave Summary</Text>

            <TouchableOpacity style={styles.leaveButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.leaveBtnText}>+ Leave Request</Text>

            </TouchableOpacity>
          </View>

          <View style={styles.summaryRow}>
            
            <View style={{ position: "relative", alignItems: "center", justifyContent: "center", marginLeft: -30 }}>
              <Progress.Circle
                size={70}
                progress={0.88}
                color="#22b0dbff"
                thickness={8}
                borderWidth={0}
                unfilledColor="#000000ff"
                strokeCap="round"
                showsText={false}
              />

             
              <Text style={{ position: "absolute", color: "#ffffff", fontSize: 14, fontWeight: "600" }}>
                88%
              </Text>
            </View>

           
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <BarItem label="Paid" value={6} total={14} color="#2bbaf5" />
              <BarItem label="Casual" value={8} total={14} color="#60d0ff" />
              <BarItem label="Sick" value={4} total={14} color="#1f9dd6" />

              <View style={styles.leaveCountRow}>
                <Text style={styles.leaveCountText}>Paid</Text>
                <Text style={styles.leaveCountValue}>7 left</Text>
              </View>

              <View style={styles.leaveCountRow}>
                <Text style={styles.leaveCountText}>Casual</Text>
                <Text style={styles.leaveCountValue}>8 left</Text>
              </View>

              <View style={styles.leaveCountRow}>
                <Text style={styles.leaveCountText}>Sick</Text>
                <Text style={styles.leaveCountValue}>4 left</Text>
              </View>
            </View>
          </View>


          
        </View> */}
        <LinearGradient
          colors={["#07162cff", "#23568fff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >

          {/* Header */}
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Leave Summary</Text>

            <TouchableOpacity
              style={styles.leaveButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.leaveBtnText}>+ Leave Request</Text>
            </TouchableOpacity>
          </View>

          {/* Body */}
          <View style={styles.summaryRow}>
            {/* Circular Progress */}
            <View style={styles.circleWrap}>

              <Progress.Circle
                size={78}
                progress={getUsedLeavePercentage() / 100}
                color="#4FC3F7"
                thickness={9}
                borderWidth={0}
                unfilledColor="#18384A"
                strokeCap="round"
              />
              <Text style={styles.circleText}>{getUsedLeavePercentage()}%</Text>
            </View>

            {/* Bars + counts */}
            <View style={styles.barSection}>

              {/* <View style={styles.barRow}>
            <Text style={styles.barLabel}>Paid</Text>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: "30%" }]} />
            </View>
            <Text style={styles.barValue}>3</Text>
          </View>


          <View style={styles.barRow}>
            <Text style={styles.barLabel}>Casual</Text>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: "43%" }]} />
            </View>
            <Text style={styles.barValue}>6</Text>
          </View>


          <View style={styles.barRow}>
            <Text style={styles.barLabel}>Sick</Text>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: "50%" }]} />
            </View>
            <Text style={styles.barValue}>4</Text>
          </View> */}

              <View style={styles.barchart}>
                <LeaveManagement />
              </View>

              {/* <View style={styles.leaveList}>
                <View style={styles.leaveCountRow}>
                  <Text style={styles.leaveCountText}>Paid</Text>
                  <Text style={styles.leaveCountValue}>7 left</Text>
                </View>
                <View style={styles.leaveCountRow}>
                  <Text style={styles.leaveCountText}>Casual</Text>
                  <Text style={styles.leaveCountValue}>8 left</Text>
                </View>
                <View style={styles.leaveCountRow}>
                  <Text style={styles.leaveCountText}>Sick</Text>
                  <Text style={styles.leaveCountValue}>4 left</Text>
                </View>
              </View> */}

              <View style={styles.leaveList}>
                {LeaveList?.leave_type?.map((item) => (
                  <View style={styles.leaveCountRow} key={item._id}>
                    <Text style={styles.leaveCountText}>
                      {item.abbreviation}
                    </Text>

                    <Text style={styles.leaveCountValue}>
                      {item.available} left
                    </Text>
                  </View>
                ))}
              </View>

            </View>
          </View>

        </LinearGradient>
        <View>

          <Modal
            visible={modalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.overlay}>
              <LinearGradient
                colors={["#00213F", "#002C56"]}
                style={styles.modalContainer}
              >
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Enter the following details</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={styles.closeBtn}>✖</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.formContainer}>

                  {/* <View style={styles.rowContainer}>
                    <Text style={styles.labelRow}>Select Leave Type:</Text>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={leaveType}
                        onValueChange={(itemValue) => setLeaveType(itemValue)}
                        style={styles.picker}
                        dropdownIconColor="#fff"
                      >
                        <Picker.Item label="Select One" value="" />
                        <Picker.Item label="Paid Leave" value="paid" />
                        <Picker.Item label="Casual Leave" value="casual" />
                        <Picker.Item label="Sick Leave" value="sick" />
                      </Picker>
                    </View>
                  </View> */}

                  <View style={styles.rowContainer}>
                    <Text style={styles.labelRow}>Select Leave Type:</Text>

                    <TouchableOpacity
                      style={styles.customSelect}
                      onPress={() => setDropdownOpen(prev => !prev)}
                    >
                      <Text style={styles.selectedText}>
                        {selectedLeave?.abbreviation || "Select Leave Type"}
                      </Text>
                    </TouchableOpacity>

                    {dropdownOpen && (
                      <View style={styles.dropdownBoxInline}>
                        {LeaveList?.leave_type?.map((item) => (
                          <TouchableOpacity
                            key={item._id}
                            style={styles.dropdownRow}
                            // onPress={() => {
                            //   setSelectedLeave(item);
                            //   setLeaveType(item.leave_temp_head_id);
                            //   setRemainingLeaves(item.available);
                            //   setDropdownOpen(false);
                            // }}
                            onPress={() => {
                              setSelectedLeave(item);
                              setLeaveType(item.leave_temp_head_id);
                              setRemainingLeaves(item.available);
                              setDropdownOpen(false);
                            }}

                          >
                            <Text style={styles.dropdownAbbr}>{item.abbreviation}</Text>
                            <Text style={styles.dropdownValue}>
                              {item.available}/{item.quota}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>

                  <View style={styles.dateRow}>
                    <View style={styles.dateInputContainer}>
                      <Text style={styles.labelColumn}>From:</Text>
                      <TouchableOpacity
                        style={styles.dateInput}
                        onPress={() => setOpenFromDate(true)}
                      >
                        <Text style={styles.dateTextDisplay}>
                          {formatDate(fromDate)}
                        </Text>
                        <Text style={styles.calendarIcon}>📅</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.dateInputContainer}>
                      <Text style={styles.labelColumn}>To:</Text>
                      <TouchableOpacity
                        style={styles.dateInput}
                        onPress={() => setOpenToDate(true)}
                      >
                        <Text style={styles.dateTextDisplay}>
                          {formatDate(toDate)}
                        </Text>
                        <Text style={styles.calendarIcon}>📅</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <DatePicker
                    modal
                    mode="date"
                    open={openFromDate}
                    date={fromDate}
                    onConfirm={(date) => {
                      setOpenFromDate(false);
                      setFromDate(date);
                    }}
                    onCancel={() => {
                      setOpenFromDate(false);
                    }}
                    theme="dark"
                  />

                  <DatePicker
                    modal
                    mode="date"
                    open={openToDate}
                    date={toDate}
                    minimumDate={fromDate}  
                    onConfirm={(date) => {
                      setOpenToDate(false);
                      setToDate(date);
                    }}
                    onCancel={() => setOpenToDate(false)}
                    theme="dark"
                  />


                  <View style={styles.rowContainer}>
                    <Text style={styles.labelRow}>No. of Days:</Text>
                    <TextInput
                      style={[styles.inputRow1, styles.disabledInput]}
                      value={noOfDays}
                      editable={false}
                      selectTextOnFocus={false}
                    />
                  </View>

                  <View style={styles.rowContainer}>
                    <Text style={styles.labelRow}>Remaining Leaves:</Text>
                    <TextInput
                      style={[styles.inputRow, styles.disabledInput]}
                      value={String(remainingLeaves)}
                      editable={false}
                      selectTextOnFocus={false}
                    />
                  </View>

                  <View style={styles.reasonContainer}>
                    <Text style={styles.labelColumn}>Reason:</Text>
                    <TextInput
                      style={styles.textArea}
                      placeholder=""
                      placeholderTextColor="#6B7280"
                      multiline
                      numberOfLines={4}
                      value={reason}
                      onChangeText={setReason}
                    />
                  </View>

                  <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                  </TouchableOpacity>
                </ScrollView>
              </LinearGradient>
            </View>
          </Modal>

        </View>

        <Text style={styles.sectionTitle}>Leave Status</Text>

        {Leavedata
          ?.filter(item => {
            const toDate = new Date(item.leave_to_date);
            toDate.setHours(0, 0, 0, 0);

            return (
              item.leave_approval_status === "pending" ||
              (item.leave_approval_status === "approved" && toDate >= today)
            );
          })
          ?.map(item => (
            <View style={styles.upcomingCard} key={item._id}>
              <Text style={styles.upcomingDate}>
                {formatDateRange(item.leave_from_date, item.leave_to_date)}
              </Text>

              <View style={styles.upcomingStatusBox}>
                <Text style={styles.upcomingStatusText}>
                  {item.leave_head}
                </Text>
              </View>

              <View style={[styles.upcomingStatusBox,{
                    backgroundColor:
                      item.leave_approval_status === "approved"
                        ? "#04520aff"
                        : item.leave_approval_status === "rejected"
                          ? "#d11a2a"
                          : "#f7e331ff"
                  }]}>
                <Text style={styles.upcomingStatusText}>
                  {item.leave_approval_status}
                </Text>
              </View>
            </View>
          ))}



        <Text style={styles.sectionTitle}>Leave History</Text>

        {Leavedata
          ?.filter(item => {
            const toDate = new Date(item.leave_to_date);
            toDate.setHours(0, 0, 0, 0);

            return toDate < today;
          })
          ?.map(item => (
            <View style={styles.historyCard} key={item._id}>
              <Text style={styles.historyDate}>
                {formatDateRange(item.leave_from_date, item.leave_to_date)}
              </Text>
              <View style={styles.upcomingStatusBox}>
                <Text style={styles.upcomingStatusText}>
                  {item.leave_head}
                </Text>
              </View>
              <View
                style={[
                  styles.historyStatusBox,
                  {
                    backgroundColor:
                      item.leave_approval_status === "approved"
                        ? "#04520aff"
                        : item.leave_approval_status === "rejected"
                          ? "#d11a2a"
                          : "#4a9cf9ff"
                  }
                ]}
              >
                <Text style={styles.historyStatusText}>
                  {item.leave_approval_status}
                </Text>
              </View>
            </View>
          ))}

      </ScrollView>
      <BottomNavigation />
    </LinearGradient>
  );
}


const BarItem = ({ label, value, total, color }) => {
  const widthPercent = (value / total) * 100;
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.barLabel}>{label}</Text>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${widthPercent}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  // headerText: {
  //   color: "#fff",
  //   fontSize: 22,
  //   fontWeight: "600",
  // },
  // icons: {
  //   flexDirection: "row",
  // },
  scrollContainer: {
    // padding: 5,
    top: 15,
    paddingBottom: 60,
  },
  selectorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  selectorBox: {
    backgroundColor: "#1c2a4e",
    padding: 12,
    width: "48%",
    borderRadius: 12,
  },
  selectorText: {
    color: "#fff",
    fontSize: 16,
  },

  // card: {
  //   backgroundColor: "#1b2d4f",
  //   padding: 15,
  //   borderRadius: 16,
  //   marginBottom: 25,
  // },
  // cardHeader: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   marginBottom: 12,
  // },
  // cardTitle: {
  //   color: "#fff",
  //   fontSize: 18,
  //   fontWeight: "600",
  // },

  // leaveButton: {
  //   backgroundColor: "#d0d7dd",
  //   paddingVertical: 6,
  //   paddingHorizontal: 14,
  //   borderRadius: 10,
  // },
  // leaveBtnText: {
  //   color: "#1b2d4f",
  //   fontWeight: "600",
  // },

  // summaryRow: {
  //   flexDirection: "row",
  //   alignItems: "center",
  // },

  pieContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 130,
    height: 130,
  },
  pieCenter: {
    position: "absolute",
  },
  pieCenterText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  barLabel: {
    color: "#fff",
    marginBottom: 4,
    fontSize: 14,
  },
  barBackground: {
    width: "100%",
    height: 10,
    backgroundColor: "#243b63",
    borderRadius: 10,
  },
  barFill: {
    height: 10,
    borderRadius: 10,
  },

  leaveCountValue: {
    color: "#0f1411ff",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 10,
  },

  upcomingCard: {
    backgroundColor: "#1b2d4f",
    padding: 16,
    borderRadius: 16,
    marginBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  upcomingDate: {
    color: "#fff",
    fontSize: 16,
  },
  upcomingStatusBox: {
    backgroundColor: "#f7e331ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 13,
  },
  upcomingStatusText: {
    color: "#000000ff",
    fontWeight: "600",
  },

  historyCard: {
    backgroundColor: "#1b2d4f",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  historyDate: {
    color: "#fff",
    fontSize: 16,
  },
  historyStatusBox: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  historyStatusText: {
    color: "#fff",
    fontWeight: "600",
  },
  formContainer: {
    maxHeight: "75%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "85%",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 15,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  closeBtn: {
    color: "#FF4444",
    fontSize: 18,
    fontWeight: "bold",
  },
  formContainer: {
    paddingTop: 5,
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  labelRow: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
    width: "40%",
  },
  inputRow1: {
    flex: 1,
    backgroundColor: "#072c52ff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    color: "#fff",
    fontSize: 13,
    marginLeft: -35,

  },
  inputRow: {
    flex: 1,
    backgroundColor: "#072c52ff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    // height: 25,
    color: "#fff",
    fontSize: 13,
  },

  labelColumn: {
    color: "#fff",
    fontSize: 13,
    marginBottom: 8,
    fontWeight: "500",
  },


  pickerContainer: {
    flex: 1,
    backgroundColor: "#5BA3C7",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    height: 40,
    justifyContent: "center",
  },
  picker: {
    color: "#fff",
    height: 50,
  },

  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 15,
  },
  dateInputContainer: {
    flex: 1,
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5BA3C7",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    height: 40,
  },
  dateTextDisplay: {
    color: "#fff"
  },
  dateText: {
    flex: 1,
    color: "#fff",
    fontSize: 13,
  },
  calendarIcon: {
    fontSize: 16,
    marginLeft: 25
  },

  reasonContainer: {
    marginTop: -5,
    marginBottom: 10,
  },
  textArea: {
    backgroundColor: "#072c52ff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    height: 80,
    color: "#fff",
    fontSize: 13,
    textAlignVertical: "top",
  },

  submitButton: {
    backgroundColor: "#5BA3C7",
    borderRadius: 25,
    paddingVertical: 5,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
  },
  customSelect: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3b82f6",
    borderRadius: 8,
    padding: 12,
  },

  selectedText: {
    color: "#fff",
    fontSize: 14,
    // width:"100%"
  },

  dropdownOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  dropdownBox: {
    backgroundColor: "#0B1E3A",
    borderRadius: 10,
    paddingVertical: 10,
  },

  // dropdownRow: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   padding: 12,
  //   borderBottomWidth: 0.5,
  //   borderBottomColor: "#334155",
  // },

  dropdownAbbr: {
    color: "#fff",
    fontWeight: "600",
    width: "30%",
  },

  // dropdownAQ: {
  //   color: "#94a3b8",
  //   width: "20%",
  //   textAlign: "center",
  // },

  dropdownValue: {
    color: "#22c55e",
    width: "30%",
    textAlign: "right",
  },
  dropdownBoxInline: {
    position: "absolute",
    top: 55,
    left: 110,
    right: 0,
    backgroundColor: "#0B2A44",
    borderRadius: 10,
    paddingVertical: 6,
    zIndex: 999,
    elevation: 6,
    width: "50%"
  },

  dropdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#1f3b57",
  },

  dropdownAbbr: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },

  dropdownValue: {
    color: "#7dd3fc",
    fontSize: 13,
    fontWeight: "500",
  },

  customSelect: {
    borderWidth: 1,
    borderColor: "#1f3b57",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 6,
    backgroundColor: "#0B2A44",
  },

  card: {
    backgroundColor: "#0E2A3B",
    borderRadius: 22,
    padding: 16,
    marginBottom: 20,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  leaveButton: {
    backgroundColor: "#2A3F50",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  leaveBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },

  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  circleWrap: {
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -110
  },

  circleText: {
    position: "absolute",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  barSection: {
    flex: 1,
    paddingLeft: 10,
  },

  barRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  barLabel: {
    width: 50,
    color: "#B5C7D3",
    fontSize: 11,
  },

  barTrack: {
    flex: 1,
    height: 8,
    backgroundColor: "#18384A",
    borderRadius: 6,
    overflow: "hidden",
    marginHorizontal: 6,
  },

  barFill: {
    height: "100%",
    backgroundColor: "#4FC3F7",
    borderRadius: 6,
  },

  barValue: {
    width: 18,
    color: "#FFFFFF",
    fontSize: 11,
    textAlign: "right",
  },
  barchart: {
    marginTop: -40,
    marginLeft: -10,
    // margin: -20,
    paddingVertical: -20
  },
  leaveList: {
    marginTop: 20,
    marginLeft: -100,
    backgroundColor: "#194a7ea2",
    borderRadius: 17,
    paddingVertical: 10
  },

  leaveCountRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 150,
    marginTop: 2,
    // marginLeft: -60
  },

  leaveCountText: {
    color: "#DCE6ED",
    fontSize: 12,
    // marginLeft:-60
  },

  leaveCountValue: {
    color: "#3BE37B",
    fontSize: 12,
    fontWeight: "600",
    // marginRight:-20
  },




});
