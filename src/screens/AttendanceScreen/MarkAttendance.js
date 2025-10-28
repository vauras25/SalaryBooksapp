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

import MapView, { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";


const MarkAttendance = () => {
  const [inTime, setInTime] = useState("--:--");
  const [outTime, setOutTime] = useState("--:--");


  const officeLocation = { latitude: 22.5057, longitude: 88.3567 };
  
    // Function to calculate distance (in meters)
    const getDistance = (lat1, lon1, lat2, lon2) => {
      const toRad = (v) => (v * Math.PI) / 180;
      const R = 6371e3; // meters
      const φ1 = toRad(lat1);
      const φ2 = toRad(lat2);
      const Δφ = toRad(lat2 - lat1);
      const Δλ = toRad(lon2 - lon1);
  
      const a =
        Math.sin(Δφ / 2) ** 2 +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
      return R * c; // distance in meters
    };
  

      const requestPermission = async () => {
    console.log("Requesting location permission...");

    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Access Required",
            message: "This app needs to access your location to check attendance.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Location permission granted");
          return true;
        } else {
          Alert.alert("Permission Denied", "Location permission is required.");
          return false;
        }
      } catch (err) {
        console.error("Permission request error:", err);
        return false;
      }
    }

    return true;
  };


    const validateLocation = async () => {
      console.warn("1")
      try {
        const permission = await requestPermission();
        if (!permission) {
          Alert.alert("Permission Required", "Please enable location access.");
          return false;
        }
  
        return new Promise((resolve) => {
          Geolocation.getCurrentPosition(
            (pos) => {
              const { latitude, longitude } = pos.coords;
              const distance = getDistance(
                latitude,
                longitude,
                officeLocation.latitude,
                officeLocation.longitude
              );
              console.log("Distance:", distance);
              if (distance <= 100) {
                resolve(true);
              } else {
                Alert.alert(
                  "Outside Office Area",
                  "You must be within 100 meters of the office."
                );
                resolve(false);
              }
            },
            (error) => {
              console.error("Location error:", error);
              Alert.alert("Error", `Unable to fetch location: ${error.message}`);
              resolve(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        });
      } catch (error) {
        console.error("validateLocation failed:", error);
        Alert.alert("Error", "Something went wrong while checking location.");
        return false;
      }
    };
  
  
    // Handle Check In
    const handleCheckIn = async () => {
      const isInside = await validateLocation();
      if (isInside) {
        const now = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        setInTime(now);
        Alert.alert("Checked In", `You checked in at ${now}`);
      }
    };
  
    // Handle Check Out
    const handleCheckOut = async () => {
      const isInside = await validateLocation();
      if (isInside) {
        const now = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        setOutTime(now);
        Alert.alert("Checked Out", `You checked out at ${now}`);
      }
    };


     return (
<View>


            {/* Section Title */}
            <Text style={styles.sectionTitle}>Mark Attendance</Text>

            {/* Map */}
            <View style={styles.mapContainer}>
              <MapView
                style={{ width: "100%", height: 150 }}
                initialRegion={{
                  latitude: officeLocation.latitude,
                  longitude: officeLocation.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={officeLocation}
                  title="Vauras Advisory Services"
                  description="Lake Gardens, Kolkata"
                />
              </MapView>
            </View>

            {/* Check Buttons */}
            <View style={styles.checkButtons}>
              <TouchableOpacity
                style={[styles.checkButton, styles.checkIn]}
                onPress={handleCheckIn}
              >
                <Text style={styles.checkText}>CHECK IN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.checkButton, styles.checkOut]}
                onPress={handleCheckOut}
              >
                <Text style={styles.checkText}>CHECK OUT</Text>
              </TouchableOpacity>
            </View>

            {/* Time Details */}
            <View style={styles.timeRow}>
              <View style={styles.timeBox}>
                <Text style={styles.timeLabel}>IN TIME : {inTime}</Text>
              </View>
              <View style={styles.timeBox}>
                <Text style={styles.timeLabel}>OUT TIME : {outTime}</Text>
              </View>
            </View>

            {/* Status */}
            <View style={styles.statusBox}>
              <Text style={styles.statusText}>
                Today's Status :{" "}
                {inTime !== "--:--" ? `PRESENT at ${inTime}` : "Not Marked"}
              </Text>
            </View>
          </View>
     );

}

const styles = StyleSheet.create({

sectionTitle: { color: "#fff", fontSize: 16, fontWeight: "700", marginBottom: 10 },
  mapContainer: {
    height: 150,
    marginHorizontal: 40,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
  },
  checkButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  checkButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  checkIn: { backgroundColor: "#00916E" },
  checkOut: { backgroundColor: "#A4161A" },
  checkText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  timeRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  timeBox: {
    backgroundColor: "#1E2A47",
    padding: 10,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },
  timeLabel: { color: "#fff", fontSize: 13 },
  statusBox: {
    backgroundColor: "#1E2A47",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  statusText: { color: "#00FFB3", fontSize: 14, fontWeight: "600" },

 
});


export default MarkAttendance;