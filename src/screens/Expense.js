import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import BottomNavigation from "./BottomNavigation";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

const Expense = () => {



  const [claimsData, setClaimsData] = useState([]);
  const [activeTab, setActiveTab] = useState("previous");
  const [modalVisible, setModalVisible] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(true);
  // const [branch, setBranch] = useState("");
  // const [dept, setDept] = useState("");
  // const [designation, setDesignation] = useState("");
  // const [hod, setHod] = useState("");

  const [headId, setHeadId] = useState('');
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [image, setImage] = useState(null);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('authToken');
    console.log('Stored token:', token);
    return token;
  };

  useEffect(() => {
    fetchClaimsData();
  }, []);

  const pickImage = () => {
  const options = {
    mediaType: 'photo',
    includeBase64: false,
  };

  launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('Image Picker Error: ', response.errorMessage);
    } else {
      const uri = response.assets[0].uri;
      setImage(uri);
    }
  });
};



  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };


  const fetchClaimsData = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjhhODBjZTVkN2M1ZDkwMDFiYWMzOWE0IiwidXNlcl9lbWFpbCI6IiIsImNvcnBvcmF0ZV9pZCI6IlZCTCIsInVzZXJpZCI6IlRFU1QwMjEiLCJmaXJzdF9uYW1lIjoiU3VqaXRhIiwibGFzdF9uYW1lIjoia3VtYXIgRGFzIiwidXNlcl90eXBlIjoiZW1wbG95ZWUiLCJpYXQiOjE3NjE4MDI5NzIsImV4cCI6MTc5MzMzODk3Mn0.SNqI6EjWD_yi9MRwaFsE1lfgRbsn_twKxW0cTw5rvsg";
      // const token =  getToken();
      // Alert.alert("token",token);
      const payload = {
        pageno: 1,
        type: 'reimbursement',
      };
      const response = await axios.post(
        "http://10.0.2.2:8080/employee/get-extra-earning",
        payload,
        {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        const docs = response.data.data.docs || [];
        // Alert.alert("apisuccess");
        // transform data to match your UI
        const formattedData = docs.map((item) => ({
          id: item._id,
          date: formatDate(item.created_at),
          type: item.head_id || "N/A",
          amount: `₹${item.amount}`,
          status: capitalize(item.status),
        }));

        setClaimsData(formattedData);
      } else {
        Alert.alert("Error", response.data.message || "Failed to load data");
      }
    } catch (error) {
      Alert.alert("Error", token);
      console.error("API Error:", error);
      if (error.response) {
        Alert.alert("Server Error", JSON.stringify(error.response.data));
      } else if (error.request) {
        Alert.alert("Network Error", "No response from backend.");
      } else {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };



  //   const handleSubmit = async () => {
  //     try {
  //       Alert.alert("Start");
  //       // const response = await fetch("https://your-api-url.com/api/claims", {
  //       const response = await fetch("http://10.0.2.2:8080/employee/add-extra-earning-data", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       });
  //  Alert.alert("Start2");
  //       if (!response.ok) {
  //         throw new Error("Failed to submit claim");
  //       }

  //       const data = await response.json();
  //       Alert.alert("Success", "Claim submitted successfully!");
  //       console.log("Response:", data);
  //       setModalVisible(false);
  //     } catch (error) {
  //       console.error(error);
  //       Alert.alert("Error", error.message);
  //     }
  //   };

  const handleSubmit = async () => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjhhODBjZTVkN2M1ZDkwMDFiYWMzOWE0IiwidXNlcl9lbWFpbCI6IiIsImNvcnBvcmF0ZV9pZCI6IlZCTCIsInVzZXJpZCI6IlRFU1QwMjEiLCJmaXJzdF9uYW1lIjoiU3VqaXRhIiwibGFzdF9uYW1lIjoia3VtYXIgRGFzIiwidXNlcl90eXBlIjoiZW1wbG95ZWUiLCJpYXQiOjE3NjE4MDI5NzIsImV4cCI6MTc5MzMzODk3Mn0.SNqI6EjWD_yi9MRwaFsE1lfgRbsn_twKxW0cTw5rvsg';
      const payload = {
        head_id: headId,
        amount: amount,
        remark: remark,
        wage_month: month,
        wage_year: year,
        type: 'reimbursement',
      };



      const response = await axios.post(
        'http://10.0.2.2:8080/employee/add-extra-earning-data',
        payload,
        {
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      console.log('API Response:', response.data);


      if (response.data.status === 'success') {
        Alert.alert('Success', response.data.message);
        fetchClaimsData();
        setModalVisible(false)
      } else {
        Alert.alert('Error', response.data.message);
      }

    } catch (error) {
      console.error('API Error:', error);
      if (error.response) {
        Alert.alert('Server Error', JSON.stringify(error.response.data));
      } else if (error.request) {
        Alert.alert('Network Error', 'No response from backend.');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };





  // const handleChange = (key, value) => {
  //   setFormData((prev) => ({ ...prev, [key]: value }));
  // };

  return (
    <LinearGradient
      colors={["#001B3A", "#003366"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon name="wallet-outline" size={22} color="#fff" />
          <Text style={styles.headerText}>Expense Management</Text>
        </View>
        <View style={styles.headerRight}>
          <Icon name="search-outline" size={22} color="#fff" style={styles.icon} />
          <View style={styles.notificationWrapper}>
            <Icon name="notifications-outline" size={22} color="#fff" />
            <View style={styles.notificationDot} />
          </View>
        </View>
      </View>

      {/* Tabs */}
      {/* <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.activeTabText}>Previous Claims</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.inactiveTabText}>Claim Status</Text>
        </TouchableOpacity>
      </View> */}

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "previous" && styles.activeTab]}
          onPress={() => setActiveTab("previous")}
        >
          <Text
            style={
              activeTab === "previous"
                ? styles.activeTabText
                : styles.inactiveTabText
            }
          >
            Previous Claims
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "status" && styles.activeTab]}
          onPress={() => setActiveTab("status")}
        >
          <Text
            style={
              activeTab === "status"
                ? styles.activeTabText
                : styles.inactiveTabText
            }
          >
            Claim Status
          </Text>
        </TouchableOpacity>
      </View>

      {/* Section Header */}
      {activeTab === "previous" && (
        <>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Previous Claims</Text>
            {/* <TouchableOpacity style={styles.newClaimBtn}>
              <Text style={styles.newClaimText}>File New Claim</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.newClaimBtn}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.newClaimText}>File New Claim</Text>
            </TouchableOpacity>
          </View>


          {/* <ScrollView style={styles.list}>
            {expenses.map((item, index) => (
              <View key={index} style={styles.expenseCard}>
                <Text style={styles.expenseTitle}>{item.title}</Text>
                <View style={styles.amountTag}>
                  <Text style={styles.amountText}>₹ {item.amount}</Text>
                </View>
              </View>
            ))}
          </ScrollView> */}
          {loading ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text>Loading...</Text>
            </View>
          ) : claimsData.length === 0 ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text>No claims found</Text>
            </View>
          ) : (
            <ScrollView style={styles.list}>
              {claimsData.map((item) => (
                <View key={item.id} style={styles.expenseCard}>
                  <Text style={styles.expenseTitle}>{item.type}</Text>

                  <View style={styles.amountTag}>
                    <Text style={styles.amountText}>₹ {item.amount}</Text>
                  </View>

                  {/* <Text style={styles.dateText}>{item.date}</Text>
                  <Text style={styles.statusText}>Status: {item.status}</Text> */}
                </View>
              ))}
            </ScrollView>
          )}
        </>
      )}
      {activeTab === "status" && (
        <>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Previous Claims</Text>
            {/* <TouchableOpacity style={styles.newClaimBtn}>
              <Text style={styles.newClaimText}>File New Claim</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.newClaimBtn}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.newClaimText}>File New Claim</Text>
            </TouchableOpacity>
          </View>
          {/* <ScrollView style={styles.list}>
            {claimsData.map((item, index) => (
              <View key={index} style={styles.expenseCard}>
                <Text style={styles.expenseTitle}>{item.type}</Text>
                <View style={styles.amountTag}>
                  <Text style={styles.amountText}>₹ {item.amount}</Text>
                </View>
              </View>
            ))}
          </ScrollView> */}
          {loading ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text>Loading...</Text>
            </View>
          ) : claimsData.length === 0 ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text>No claims found</Text>
            </View>
          ) : (
            <ScrollView style={styles.list}>
              {claimsData.map((item) => (
                <View key={item.id} style={styles.expenseCard}>
                  <Text style={styles.expenseTitle}>{item.type}</Text>

                  <View style={styles.amountTag}>
                    <Text style={styles.amountText}>₹ {item.amount}</Text>
                  </View>

                  <Text style={styles.dateText}>{item.date}</Text>
                  <Text style={styles.statusText}>Status: {item.status}</Text>
                </View>
              ))}
            </ScrollView>
          )}


        </>
      )}
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

              <View style={styles.formContainer}>
                {/* <View style={styles.row}>
                    <Text style={styles.label}>Enter Head:</Text>
                    <TextInput style={styles.input}
                      placeholder="Enter Head"
                      onChangeText={(text) => handleChange("head", text)}
                      placeholderTextColor="#ccc" />
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Amount:</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(text) => handleChange("amount", text)}
                      placeholder="Enter Amount"
                      keyboardType="numeric"
                      placeholderTextColor="#ccc"
                    />
                  </View> */}

                <TextInput
                  placeholder="Head ID"
                  value={headId}
                  onChangeText={setHeadId}
                  style={{ borderWidth: 1, marginBottom: 10, padding: 8, color: "#fff" , borderColor: "#fff"}}
                   placeholderTextColor="#fff"
                />
                <TextInput
                  placeholder="Amount"
                  value={amount}
                  onChangeText={setAmount}
                  style={{ borderWidth: 1, marginBottom: 10, padding: 8, color: "#fff" , borderColor: "#fff"}}
                   placeholderTextColor="#fff"
                />
                <TextInput
                  placeholder="Reason"
                  value={remark}
                  onChangeText={setRemark}
                  style={{ borderWidth: 1, marginBottom: 10, padding: 8, color: "#fff" , borderColor: "#fff"}}
                   placeholderTextColor="#fff"
                />
                <View style={styles.row}>
                  <View style={styles.halfPicker}>
                    <Text style={styles.label}>Month:</Text>
                    <Picker
                      selectedValue={month}
                      onValueChange={setMonth}
                      style={styles.picker}
                      dropdownIconColor="#fff"
                    >
                      <Picker.Item label="Select" value="" />
                      <Picker.Item label="Jan" value="0" />
                      <Picker.Item label="Feb" value="1" />
                      <Picker.Item label="Mar" value="2" />
                      <Picker.Item label="Apr" value="3" />
                      <Picker.Item label="May" value="4" />
                      <Picker.Item label="June" value="5" />
                      <Picker.Item label="July" value="6" />
                      <Picker.Item label="Aug" value="7" />
                      <Picker.Item label="Sep" value="8" />
                      <Picker.Item label="Oct" value="9" />
                      <Picker.Item label="Nov" value="10" />
                      <Picker.Item label="Dec" value="11" />
                    </Picker>
                  </View>
                  <View style={styles.halfPicker}>
                    <Text style={styles.label}>Year:</Text>
                    <Picker
                      selectedValue={year}
                      onValueChange={setYear}
                      style={styles.picker}
                      dropdownIconColor="#fff"
                    >
                      <Picker.Item label="Select" value="" />
                      <Picker.Item label="2024" value="2024" />
                      <Picker.Item label="2025" value="2025" />
                    </Picker>
                  </View>

                  

                </View>
                <Text style={styles.label}>Upload Image:</Text>
                  <View style={styles.imageUploadContainer}>
                    {image ? (
                      <Image
                        source={{ uri: image }}
                        style={{ width: 100, height: 100, borderRadius: 8, marginBottom: 10 }}
                      />
                    ) : (
                      <Text style={{ color: "#ccc", marginBottom: 10 }}>No image selected</Text>
                    )}
                    <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
                      <Text style={styles.uploadBtnText}>Choose Image</Text>
                    </TouchableOpacity>
                  </View>

                {/* Other Dropdowns */}
                {/* <Text style={styles.label}>Branch:</Text>
                  <Picker
                    selectedValue={branch}
                    onValueChange={setBranch}
                    style={styles.picker}
                    dropdownIconColor="#fff"
                  >
                    <Picker.Item label="Select Branch" value="" />
                    <Picker.Item label="Delhi" value="Delhi" />
                    <Picker.Item label="Mumbai" value="Mumbai" />
                  </Picker> */}

                {/* <Text style={styles.label}>Department:</Text>
                  <Picker
                    selectedValue={dept}
                    onValueChange={setDept}
                    style={styles.picker}
                    dropdownIconColor="#fff"
                  >
                    <Picker.Item label="Select Department" value="" />
                    <Picker.Item label="HR" value="HR" />
                    <Picker.Item label="Accounts" value="Accounts" />
                  </Picker> */}

                {/* <Text style={styles.label}>Designation:</Text>
                  <Picker
                    selectedValue={designation}
                    onValueChange={setDesignation}
                    style={styles.picker}
                    dropdownIconColor="#fff"
                  >
                    <Picker.Item label="Select Designation" value="" />
                    <Picker.Item label="Manager" value="Manager" />
                    <Picker.Item label="Executive" value="Executive" />
                  </Picker> */}

                {/* <Text style={styles.label}>HOD:</Text>
                  <Picker
                    selectedValue={hod}
                    onValueChange={setHod}
                    style={styles.picker}
                    dropdownIconColor="#fff"
                  >
                    <Picker.Item label="Select HOD" value="" />
                    <Picker.Item label="John" value="John" />
                    <Picker.Item label="Amit" value="Amit" />
                  </Picker> */}

                {/* <TouchableOpacity style={styles.submitBtn}>
                    <Text style={styles.submitText}>SUBMIT</Text>
                  </TouchableOpacity> */}
                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                  <Text style={styles.submitText}>SUBMIT</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </Modal>
      </View>
      <BottomNavigation />
    </LinearGradient>
  );
};

export default Expense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 16,
  },
  notificationWrapper: {
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: -3,
    right: -3,
    width: 8,
    height: 8,
    backgroundColor: "red",
    borderRadius: 4,
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 25,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 15,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#0D213A",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "500",
  },
  inactiveTabText: {
    color: "#bbb",
  },
  sectionHeader: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  newClaimBtn: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  newClaimText: {
    color: "#fff",
    fontWeight: "500",
  },
  list: {
    marginTop: 15,
  },
  expenseCard: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 10,
  },
  expenseTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  amountTag: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  amountText: {
    color: "#fff",
    fontWeight: "600",
  },

  formContainer: {
    maxHeight: "75%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    borderRadius: 20,
    padding: 20,
    maxHeight: "85%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingBottom: 8,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  closeBtn: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    color: "#fff",
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: 10,
    color: "#fff",
    marginLeft: "-20px"
  },
  picker: {
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    height: 50,
    // borderRadius: 10,
    // marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfPicker: {
    flex: 0.48,
  },
  submitBtn: {
    backgroundColor: "#3B82F6",
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 20,
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  imageUploadContainer: {
  alignItems: "center",
  marginVertical: 15,
},

uploadBtn: {
  backgroundColor: "#004B8D",
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 10,
},

uploadBtnText: {
  color: "#fff",
  fontSize: 14,
  fontWeight: "bold",
},


});
