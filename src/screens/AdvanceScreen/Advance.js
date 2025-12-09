import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import BottomNavigation from "../BottomNavigation";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { API_BASE_URL } from "@env";



const AdvanceManagement = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [recoveryFrom, setRecoveryFrom] = useState("");
  const [installments, setInstallments] = useState("03");
  const [frequency, setFrequency] = useState("");
  const [month, setMonth] = useState("September");
  const [year, setYear] = useState("2025");
  const [reason, setReason] = useState("");
  const [advanceList, setAdvanceList] = useState([]);
  const [token, setToken] = useState(null);


  useEffect(() => {
      const loadToken = async () => {
        const t = await AsyncStorage.getItem("authToken");
        setToken(t);
        console.log("TOKEN LOADED:", t);
      };
      loadToken();
    }, []);
  
  const fetchAdvanceList = async () => {
    console.log("Advancepage",token)
     if (!token) return;
     console.log("Advancepage1")
    try {
      // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjhhODBjZTVkN2M1ZDkwMDFiYWMzOWE0IiwidXNlcl9lbWFpbCI6IiIsImNvcnBvcmF0ZV9pZCI6IlZCTCIsInVzZXJpZCI6IlRFU1QwMjEiLCJmaXJzdF9uYW1lIjoiU3VqaXRhIiwibGFzdF9uYW1lIjoia3VtYXIgRGFzIiwidXNlcl90eXBlIjoiZW1wbG95ZWUiLCJpYXQiOjE3NjE4MDI5NzIsImV4cCI6MTc5MzMzODk3Mn0.SNqI6EjWD_yi9MRwaFsE1lfgRbsn_twKxW0cTw5rvsg";
      const payload = {
        pageno: 1,
      };
      // const res = await axios.post("http://10.0.2.2:8080/employee/employee-get-advance-list",
      const res = await axios.post(`${API_BASE_URL}employee/employee-get-advance-list`,
        payload,
         {
       headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
      });

      if (res.data?.status === "success") {
        setAdvanceList(res.data.advance_data.docs || []);
      }
    } catch (error) {
      console.log("Advance list error:", error);
    }
  };


  useEffect(() => {
    fetchAdvanceList();
  }, [token]);

  const currentAdvance = advanceList.length > 0 ? advanceList[0] : null;

  
  const submitAdvanceRequest = async () => {
     if (!token) return;
  try {
    if (!advanceAmount || !installments || !frequency || !month || !year || !recoveryFrom) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }
    const monthMap = {
      January: 1, February: 2, March: 3, April: 4,
      May: 5, June: 6, July: 7, August: 8,
      September: 9, October: 10, November: 11, December: 12,
    };

    const startMonthNum = monthMap[month];

 
    const emi = Number(advanceAmount) / Number(installments);

    let instalment_history = [];
    let currentMonth = startMonthNum;
    let currentYear = Number(year);

    for (let i = 0; i < Number(installments); i++) {
      instalment_history.push({
        advance_amount: emi.toFixed(2),
        instalment_month: currentMonth,
        instalment_year: currentYear,
        payment_status: "pending",
        recovery_from: recoveryFrom,
        // balance_amount: emi.toFixed(2),
        
      });

      currentMonth++;
      if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
      }
    }

 
    const payload = {
      advance_amount: advanceAmount,
      advance_outstanding: advanceAmount,
      no_of_instalments: installments,
      recovery_frequency: frequency,
      recovery_from: recoveryFrom,
      payment_start_month: startMonthNum.toString(),
      payment_start_year: year,
      instalment_history,
      remarks: reason || "",
    };

    console.log("Payload =>", payload,"token",token);
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjhhODBjZTVkN2M1ZDkwMDFiYWMzOWE0IiwidXNlcl9lbWFpbCI6IiIsImNvcnBvcmF0ZV9pZCI6IlZCTCIsInVzZXJpZCI6IlRFU1QwMjEiLCJmaXJzdF9uYW1lIjoiU3VqaXRhIiwibGFzdF9uYW1lIjoia3VtYXIgRGFzIiwidXNlcl90eXBlIjoiZW1wbG95ZWUiLCJpYXQiOjE3NjE4MDI5NzIsImV4cCI6MTc5MzMzODk3Mn0.SNqI6EjWD_yi9MRwaFsE1lfgRbsn_twKxW0cTw5rvsg";
    const response = await axios.post(`${API_BASE_URL}employee/employee-advance-request`, 
     payload,
        {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        }
      );

    // const data = await response.json();
    const data = response.data;

    console.log("API Response:", data);

    if (data.status === "success") {
      Alert.alert("Success", "Advance request submitted");
      fetchAdvanceList(); 
      setModalVisible(false);
    } else {
      Alert.alert("Error", data.message || "Something went wrong");
    }

  } catch (err) {
    console.log(err);
    Alert.alert("Error", "Failed to submit advance request");
  }
};




  return (
    <LinearGradient colors={["#05203C", "#0A3B63"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Advance Management</Text>
          <View style={styles.headerIcons}>
            <Icon name="search-outline" size={22} color="#fff" style={styles.icon} />
            <Icon name="notifications-outline" size={22} color="#fff" />
          </View>
        </View>

       
        <View style={styles.dropdownRow}>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>September</Text>
            <Icon name="chevron-down" color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>2025</Text>
            <Icon name="chevron-down" color="#fff" />
          </TouchableOpacity>
        </View>

       
        <View style={styles.overviewBox}>
          <View style={styles.overviewHeader}>
            <Text style={styles.sectionTitle}>Advance Overview</Text>
            {/* <TouchableOpacity style={styles.addBtn}>
              <Text style={styles.addBtnText}>+ Advance Request</Text>
            </TouchableOpacity> */}

            <View style={styles.container1}>
              {/* + Advance Request button */}
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.addBtnText}>+ Advance Request</Text>
              </TouchableOpacity>

            
              <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.overlay}>
                  <View style={styles.modalBox}>
                  
                    <View style={styles.header}>
                      <Text style={styles.headerTitle}>Enter the following details</Text>
                      <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeBtn}>✕</Text>
                      </TouchableOpacity>
                    </View>

                   
                    <View style={styles.field}>
                      <Text style={styles.label}>Advance Amount :</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter amount"
                        placeholderTextColor="#ccc"
                        keyboardType="numeric"
                        value={advanceAmount}
                        onChangeText={setAdvanceAmount}
                      />
                    </View>

                    <View style={styles.field}>
                      <Text style={styles.label}>Recovery From :</Text>
                      <View style={styles.pickerWrapper}>
                        <Picker
                          selectedValue={recoveryFrom}
                          onValueChange={setRecoveryFrom}
                          dropdownIconColor="#fff"
                          style={styles.picker}
                        >
                          <Picker.Item label="Select One" value="" />
                          <Picker.Item label="Annual Earning" value="salary" />
                          <Picker.Item label="Reimbursement" value="reimbursement" /> 
                          <Picker.Item label="Incentive" value="incentive" /> 
                          <Picker.Item label="Gross Earning" value="gross_earning" /> 
                          <Picker.Item label="Bonus" value="bonus" /> 
                         
                        </Picker>
                      </View>
                    </View>

                    <View style={styles.field}>
                      <Text style={styles.label}>No. of Installments :</Text>
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={installments}
                        onChangeText={setInstallments}
                      />
                    </View>

                    <View style={styles.field}>
                      <Text style={styles.label}>Recovery Frequency :</Text>
                      <View style={styles.pickerWrapper}>
                        <Picker
                          selectedValue={frequency}
                          onValueChange={setFrequency}
                          dropdownIconColor="#fff"
                          style={styles.picker}
                        >
                          <Picker.Item label="Select One" value="" />
                          <Picker.Item label="Monthly" value="monthly" />
                          <Picker.Item label="Quaterly" value="quaterly" />
                          <Picker.Item label="Half Yearly" value="halfYearly" />
                          <Picker.Item label="Annually" value="annually" />
                          
                        </Picker>
                      </View>
                    </View>

                  
                    <View style={styles.row}>
                      <View style={styles.column}>
                        <Text style={styles.label}>Month :</Text>
                        <View style={styles.pickerWrapper}>
                          <Picker
                            selectedValue={month}
                            onValueChange={setMonth}
                            dropdownIconColor="#fff"
                            style={styles.picker}
                          >
                            <Picker.Item label="September" value="September" />
                            <Picker.Item label="October" value="October" />
                            <Picker.Item label="November" value="November" />
                          </Picker>
                        </View>
                      </View>

                      <View style={styles.column}>
                        <Text style={styles.label}>Year :</Text>
                        <View style={styles.pickerWrapper}>
                          <Picker
                            selectedValue={year}
                            onValueChange={setYear}
                            dropdownIconColor="#fff"
                            style={styles.picker}
                          >
                            <Picker.Item label="2025" value="2025" />
                            <Picker.Item label="2026" value="2026" />
                          </Picker>
                        </View>
                      </View>
                    </View>

                    <View style={styles.field}>
                      <Text style={styles.label}>Reason :</Text>
                      <TextInput
                        style={[styles.input, { height: 80, textAlignVertical: "top" }]}
                        multiline
                        placeholder="Enter reason"
                        placeholderTextColor="#ccc"
                        value={reason}
                        onChangeText={setReason}
                      />
                    </View>

                  
                    <TouchableOpacity
                      style={styles.submitBtn}
                      onPress={() => {
                        setModalVisible(false);
                        submitAdvanceRequest();
                      }}
                    >
                      <Text style={styles.submitText}>SUBMIT</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>

          {/* Progress bar */}
          {/* <Text style={styles.progressText}>75%</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "75%" }]} />
          </View> */}

          <Text style={styles.progressText}>
            {currentAdvance ?
              `${Math.round((currentAdvance.advance_recovered / currentAdvance.advance_amount) * 100)}%`
              : "0%"}
          </Text>
          <View style={[styles.progressFill, {
            width: currentAdvance ? `${(currentAdvance.advance_recovered / currentAdvance.advance_amount) * 100}%` : "0%"
          }]} />



         
          <View style={styles.amountRow}>
            {/* <Text style={styles.amountLabel}>₹20000{"\n"}<Text style={styles.amountSub}>Total Advance</Text></Text>
            <Text style={styles.amountLabel}>₹8000{"\n"}<Text style={styles.amountSub}>Remaining</Text></Text> */}

            <Text style={styles.amountLabel}>
              ₹{currentAdvance?.advance_amount || 0}{"\n"}
              <Text style={styles.amountSub}>Total Advance</Text>
            </Text>

            <Text style={styles.amountLabel}>
              ₹{currentAdvance?.advance_outstanding || 0}{"\n"}
              <Text style={styles.amountSub}>Remaining</Text>
            </Text>

          </View>

         
          <Text style={styles.emiText}>
            EMI: ₹
            {currentAdvance ? (currentAdvance.advance_amount / currentAdvance.no_of_instalments).toFixed(0) : 0}
            / month
          </Text>

        </View>

       
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Deduction</Text>
          <View style={styles.card}>
            <Text style={styles.cardDate}>Oct 01</Text>
            <Text style={styles.cardAmount}>₹2000 due</Text>
          </View>
        </View>

        {/* Advance History */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advance History</Text>
          <View style={styles.card}>
            <Text style={styles.cardDate}>April 15</Text>
            <View style={styles.cardRight}>
              <Text style={styles.cardAmount}>₹2000</Text>
              <Text style={[styles.status, { color: "#FF4D4D" }]}>Active</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardDate}>Jan 23</Text>
            <View style={styles.cardRight}>
              <Text style={styles.cardAmount}>₹2000</Text>
              <Text style={[styles.status, { color: "#2ECC71" }]}>Completed</Text>
            </View>
          </View>
        </View> */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advance History</Text>

          {advanceList.map((item) => (
            <View key={item._id} style={styles.card}>
              <Text style={styles.cardDate}>
                {new Date(item.created_at).toDateString().slice(4, 10)}
              </Text>

              <View style={styles.cardRight}>
                <Text style={styles.cardAmount}>₹{item.advance_amount}</Text>
                <Text
                  style={[
                    styles.status,
                    { color: item.status === "active" ? "#FF4D4D" : "#2ECC71" },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
      <BottomNavigation />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  dropdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  dropdown: {
    backgroundColor: "rgba(255,255,255,0.1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 12,
    width: "48%",
  },
  dropdownText: {
    color: "#fff",
    fontSize: 16,
  },
  overviewBox: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  overviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addBtn: {
    backgroundColor: "#414141ff",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
  progressText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 16,
  },
  progressBar: {
    backgroundColor: "#1C2C40",
    borderRadius: 10,
    height: 8,
    marginVertical: 8,
  },
  progressFill: {
    backgroundColor: "#00D1FF",
    height: 8,
    borderRadius: 10,
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  amountLabel: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  amountSub: {
    color: "#B0C4DE",
    fontSize: 12,
    fontWeight: "400",
  },
  emiText: {
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#B0C4DE",
    borderRadius: 8,
    padding: 8,
    textAlign: "center",
    marginTop: 10,
  },
  section: {
    marginTop: 25,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardDate: {
    color: "#fff",
    fontSize: 15,
  },
  cardAmount: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  cardRight: {
    alignItems: "flex-end",
  },
  status: {
    fontSize: 13,
    marginTop: 3,
  },

  container1: { flex: 1, padding: 20 },
  addBtn: {
    backgroundColor: "#3a8fff",
    borderRadius: 10,
    alignSelf: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addBtnText: { color: "#fff", fontWeight: "bold" },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalBox: {
    width: "90%",
    backgroundColor: "#02294f",
    borderRadius: 10,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: { color: "#fff", fontSize: 16, fontWeight: "600" },
  closeBtn: { color: "#f55", fontSize: 20 },
  field: { marginVertical: 5 },
  label: { color: "#fff", marginBottom: 4 },
  input: {
    backgroundColor: "#003a6d",
    borderRadius: 6,
    paddingHorizontal: 10,
    color: "#fff",
  },
  pickerWrapper: {
    backgroundColor: "#003a6d",
    borderRadius: 6,
  },
  picker: { color: "#fff", height: 52 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  column: { flex: 0.48 },
  submitBtn: {
    backgroundColor: "#7faaf9",
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 10,
  },
  submitText: { color: "#001f3f", fontWeight: "700" },
});

export default AdvanceManagement;
