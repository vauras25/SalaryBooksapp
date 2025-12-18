import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
// import { PieChart } from "react-native-svg-charts";
// import { G, Line } from "react-native-svg";
import * as Progress from "react-native-progress";
import { Picker } from '@react-native-picker/picker';
import BottomNavigation from "../BottomNavigation";
import DatePicker from 'react-native-date-picker';
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
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <LinearGradient
      colors={["#0B132B", "#202c4eff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Leave Management</Text>
          <View style={styles.icons}>
            <Text style={{ color: "#fff", fontSize: 20 }}>🔍</Text>
            <Text style={{ color: "#fff", fontSize: 20, marginLeft: 18 }}>
              🔔
            </Text>
          </View>
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
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Leave Summary</Text>

            <TouchableOpacity style={styles.leaveButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.leaveBtnText}>+ Leave Request</Text>

            </TouchableOpacity>
          </View>

          <View style={styles.summaryRow}>
            {/* Circle Progress */}
            <View style={{ position: "relative", alignItems: "center", justifyContent: "center", marginLeft: -30 }}>
              <Progress.Circle
                size={70}
                progress={0.88}
                color="#22b0dbff"
                thickness={8}
                borderWidth={0}
                unfilledColor="#000000ff"
                strokeCap="round"
                showsText={false} // hide default text
              />

              {/* Custom text overlay */}
              <Text style={{ position: "absolute", color: "#ffffff", fontSize: 14, fontWeight: "600" }}>
                88%
              </Text>
            </View>

            {/* Bar Chart */}
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
        </View>
        <View>
          {/* <Modal
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
        
                      <View style={styles.formContainer}>
                        
                      </View>
                    </LinearGradient>
                  </View>
                </Modal> */}

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

                  <View style={styles.rowContainer}>
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
                  </View>

                  {/* Date Range */}
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

                  {/* Date Picker Modals */}
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
                    onConfirm={(date) => {
                      setOpenToDate(false);
                      setToDate(date);
                    }}
                    onCancel={() => {
                      setOpenToDate(false);
                    }}
                    theme="dark"
                  />

                  <View style={styles.rowContainer}>
                    <Text style={styles.labelRow}>No. of Days:</Text>
                    <TextInput
                      style={styles.inputRow1}
                      placeholder="0"
                      placeholderTextColor="#6B7280"
                      keyboardType="numeric"
                      value={noOfDays}
                      onChangeText={setNoOfDays}
                    />
                  </View>

                  <View style={styles.rowContainer}>
                    <Text style={styles.labelRow}>Remaining Leaves:</Text>
                    <TextInput
                      style={styles.inputRow}
                      placeholder="0"
                      placeholderTextColor="#fff"
                      keyboardType="numeric"
                      value={remainingLeaves}
                      onChangeText={setRemainingLeaves}
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

                  <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>SUBMIT</Text>
                  </TouchableOpacity>
                </ScrollView>
              </LinearGradient>
            </View>
          </Modal>

        </View>

        <Text style={styles.sectionTitle}>Upcoming Leave</Text>

        <View style={styles.upcomingCard}>
          <Text style={styles.upcomingDate}>Oct 03 - Oct 05</Text>
          <View style={styles.upcomingStatusBox}>
            <Text style={styles.upcomingStatusText}>Sick Leave</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Leave History</Text>

        {[
          { date: "Aug 05 - Aug 09", status: "Approved", color: "#04520aff" },
          { date: "Sept 21 - Sept 24", status: "Pending", color: "#4a9cf9ff" },
          { date: "Sept 03 - Sept 15", status: "Rejected", color: "#4da0c7ff" },
        ].map((item, index) => (
          <View style={styles.historyCard} key={index}>
            <Text style={styles.historyDate}>{item.date}</Text>
            <View
              style={[styles.historyStatusBox, { backgroundColor: item.color }]}
            >
              <Text style={styles.historyStatusText}>{item.status}</Text>
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
  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },
  icons: {
    flexDirection: "row",
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

  card: {
    backgroundColor: "#1b2d4f",
    padding: 15,
    borderRadius: 16,
    marginBottom: 25,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  leaveButton: {
    backgroundColor: "#d0d7dd",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  leaveBtnText: {
    color: "#1b2d4f",
    fontWeight: "600",
  },

  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
  },

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

  leaveCountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leaveCountText: {
    color: "#fff",
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
    backgroundColor: "#ff6e84",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  upcomingStatusText: {
    color: "#fff",
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
  dateTextDisplay:{
    color:"#fff"
  },
  dateText: {
    flex: 1,
    color: "#fff",
    fontSize: 13,
  },
  calendarIcon: {
    fontSize: 16,
    marginLeft:25
  },

  reasonContainer: {
    marginTop:-5,
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
});
