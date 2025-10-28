import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
  Platform,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import BottomNavigation from "./BottomNavigation";
import MarkAttendance from "./AttendanceScreen/MarkAttendance";
import AttendanceOverview from "./AttendanceScreen/AttendanceOverview";
import OvertimeOverview from "./AttendanceScreen/OvertimeOverview";
import HolidayList from "./AttendanceScreen/HolidayList";

const AttendanceScreen = () => {

  const [selectedButton, setSelectedButton] = useState("Mark Attendance");


  // Office coordinates
  
  // Ask for location permission
  // const requestPermission = async () => {
  //   if (Platform.OS === "android") {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //     );
  //     return granted === PermissionsAndroid.RESULTS.GRANTED;
  //   }
  //   return true;
  // };





  // Check if user is near office (within 100 meters)
  // const validateLocation = async () => {
  //   const permission = await requestPermission();
  //   if (!permission) {
  //     Alert.alert("Permission Required", "Please enable location access.");
  //     return false;
  //   }

  //   return new Promise((resolve) => {
  //     Geolocation.getCurrentPosition(
  //       (pos) => {
  //         const { latitude, longitude } = pos.coords;
  //         const distance = getDistance(
  //           latitude,
  //           longitude,
  //           officeLocation.latitude,
  //           officeLocation.longitude
  //         );
  //         console.log("Distance:", distance);
  //         if (distance <= 100) {
  //           resolve(true);
  //         } else {
  //           Alert.alert(
  //             "Outside Office Area",
  //             "You must be within 100 meters of the office."
  //           );
  //           resolve(false);
  //         }
  //       },
  //       (error) => {
  //         console.error(error);
  //         Alert.alert("Error", "Unable to fetch location.");
  //         resolve(false);
  //       },
  //       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //     );
  //   });
  // };



  return (
    <LinearGradient colors={["#0B132B", "#1c68beff"]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Attendance</Text>
          <View style={styles.headerIcons}>
            <Text style={styles.icon}>🔍</Text>
            <Text style={styles.icon}>🔔</Text>
          </View>
        </View>

        {/* Top Buttons */}
        {/* <View style={styles.topButtonRow}>
          {["Mark Attendance", "View Detailed Log", "Overtime Overview", "Holiday List"].map(
            (item, index) => (
              <TouchableOpacity key={index} style={styles.topButton}>
                <Text style={styles.topButtonText}>{item}</Text>
              </TouchableOpacity>
            )
          )}
        </View> */}

        <View style={styles.topButtonRow}>
          {["Mark Attendance", "Attendence Overview", "Overtime Overview", "Holiday List"].map(
            (item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.topButton,
                  selectedButton === item && styles.topButtonSelected
                ]}
                onPress={() => setSelectedButton(item)}
              >
                <Text
                  style={[
                    styles.topButtonText,
                    selectedButton === item && styles.topButtonTextSelected
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
        {selectedButton === "Mark Attendance" && (
          <MarkAttendance/>
        )}
        {selectedButton === "Attendence Overview" && (
          <AttendanceOverview/>
        )}
        {selectedButton === "Overtime Overview" && (
          <OvertimeOverview/>
        )}
        {selectedButton === "Holiday List" && (
          <HolidayList/>
        )}
      </ScrollView>

      <BottomNavigation />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "700" },
  headerIcons: { flexDirection: "row", gap: 10 },
  icon: { fontSize: 18, color: "#fff" },
  topButtonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  topButton: {
    backgroundColor: "#1E2A47",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
    marginBottom: 10,
  },
  topButtonText: { color: "#C9D1D9", fontSize: 13, fontWeight: "600" },
   topButtonTextSelected: {
    color: "#fff",
    fontWeight: "700",
  },
    topButtonSelected: {
    backgroundColor: "#000000ff", // change to your preferred highlight color
  },

});

export default AttendanceScreen;
