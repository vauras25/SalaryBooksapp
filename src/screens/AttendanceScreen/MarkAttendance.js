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
// import Geolocation from "react-native-geolocation-service";
// import Geolocation from "react-native-geolocation-service";
// import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from '@react-native-community/geolocation';

import { launchCamera } from 'react-native-image-picker';
import { Image } from 'react-native';


const MarkAttendance = () => {
  const [inTime, setInTime] = useState("--:--");
  const [outTime, setOutTime] = useState("--:--");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [faceImage, setFaceImage] = useState(null);


  navigator.geolocation = Geolocation;
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


  //   const requestLocationPermission = async () => {
  //   if (Platform.OS === "android") {
  //     try {
  //       const fine = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //       );

  //       const coarse = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
  //       );

  //       return fine === "granted" || coarse === "granted";
  //     } catch (e) {
  //       console.log("Permission error:", e);
  //       return false;
  //     }
  //   }
  //   return true;
  // };


  async function requestLocationPermission() {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Location permission granted");
          return true;
        } else {
          console.log("Location permission denied");
          return false;
        }
      }
    } catch (err) {
      console.warn(err);
    }
  }
  //   const validateLocation = async () => {
  //     console.warn("1")
  //     try {
  //       const permission = await requestPermission();
  //       if (!permission) {
  //         Alert.alert("Permission Required", "Please enable location access.");
  //         return false;
  //       }
  // console.warn("2")
  //       return new Promise((resolve) => {
  //         Geolocation.getCurrentPosition(
  //           (pos) => {
  //             const { latitude, longitude } = pos.coords;
  //             const distance = getDistance(
  //               latitude,
  //               longitude,
  //               officeLocation.latitude,
  //               officeLocation.longitude
  //             );
  //             console.warn("3")
  //             console.log("✔ Current Location:", latitude, longitude);
  //             console.log("Distance:", distance);
  //             if (distance <= 100) {
  //               resolve(true);
  //             } else {
  //               Alert.alert(
  //                 "Outside Office Area",
  //                 "You must be within 100 meters of the office."
  //               );
  //               resolve(false);
  //             }
  //           },
  //           (error) => {
  //             console.error("Location error:", error);
  //             Alert.alert("Error", `Unable to fetch location: ${error.message}`);
  //             resolve(false);
  //           },
  //           { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //         );
  //       });
  //     } catch (error) {
  //       console.error("validateLocation failed:", error);
  //       Alert.alert("Error", "Something went wrong while checking location.");
  //       return false;
  //     }
  //   };


  async function getLocation() {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      (pos) => {
        console.log("POSITION:", pos);
        // Alert.alert("Location", JSON.stringify(pos));
        // Alert.alert("Location latitude", JSON.stringify(pos.coords.latitude));
        // Alert.alert("Location longitude", JSON.stringify(pos.coords.longitude));
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
      },
      (error) => {
        console.log("LOCATION ERROR:", error);
        Alert.alert("Error", error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }

  const handleCheckIn = async () => {
    // const isInside = await validateLocation();
    const isInside = await getLocation();
    if (isInside) {
      const now = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setInTime(now);
      Alert.alert("Checked In", `You checked in at ${now}`);
    }
  };


  const handleCheckOut = async () => {
    // const isInside = await validateLocation();
    const isInside = await getLocation();
    if (isInside) {
      const now = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setOutTime(now);
      Alert.alert("Checked Out", `You checked out at ${now}`);
    }
  };

  const openCamera = async () => {
    const options = {
      mediaType: 'photo',
      saveToPhotos: false,
      includeBase64: true,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled camera");
      } else if (response.errorMessage) {
        console.log("Camera Error: ", response.errorMessage);
        Alert.alert("Camera Error", response.errorMessage);
      } else {
        const photo = response.assets[0];
        setFaceImage(photo.uri);
        Alert.alert("Face Captured", "Your attendance photo is recorded.");
      }
    });
  };



  return (
    <View>


      {/* Section Title */}
      <Text style={styles.sectionTitle}>Mark Attendance</Text>

      {/* Map */}
      {/* <View style={styles.mapContainer}>
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
      </View> */}

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


      <View style={styles.timeRow}>
        <View style={styles.timeBox}>
          <Text style={styles.timeLabel}>latitude : {latitude}</Text>
        </View>
        <View style={styles.timeBox}>
          <Text style={styles.timeLabel}>longitude : {longitude}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.faceBtn}
        onPress={openCamera}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>Face Recognition</Text>
      </TouchableOpacity>

      {faceImage && (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ color: "#fff", marginBottom: 10 }}>Captured Face:</Text>
          <Image
            source={{ uri: faceImage }}
            style={{ width: 120, height: 120, borderRadius: 10 }}
          />
        </View>
      )}

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
  faceBtn: {
  backgroundColor: "#3B82F6",
  paddingVertical: 8,
  paddingHorizontal: 15,
  borderRadius: 8,
  marginTop: 10,
  alignItems: "center",
},



});


export default MarkAttendance;