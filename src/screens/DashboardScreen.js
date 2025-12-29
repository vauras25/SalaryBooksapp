import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from "react-native-progress";
import BottomNavigation from './BottomNavigation';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Reimbursement from "./Dashboardscreen/Dashboard_Reimbursement";
import Advance from "./Dashboardscreen/Dashboard_Advance";
import { BackHandler, ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { API_BASE_URL } from "@env";

const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];



const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [empData, setEmpData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [attendenceImageUrl, setAttendenceImageUrl] = useState(null);


  const loadToken = async () => {
    const t = await AsyncStorage.getItem("authToken");
    setToken(t);
    console.log("TOKEN LOADED:", t);
  };



  const fetchemployeedata = async () => {
    if (!token) return;
    try {
      // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjhhODBjZTVkN2M1ZDkwMDFiYWMzOWE0IiwidXNlcl9lbWFpbCI6IiIsImNvcnBvcmF0ZV9pZCI6IlZCTCIsInVzZXJpZCI6IlRFU1QwMjEiLCJmaXJzdF9uYW1lIjoiU3VqaXRhIiwibGFzdF9uYW1lIjoia3VtYXIgRGFzIiwidXNlcl90eXBlIjoiZW1wbG95ZWUiLCJpYXQiOjE3NjE4MDI5NzIsImV4cCI6MTc5MzMzODk3Mn0.SNqI6EjWD_yi9MRwaFsE1lfgRbsn_twKxW0cTw5rvsg";
      const payload = {
        pageno: 1,
      };
      // const res = await axios.post("http://10.0.2.2:8080/employee/employee-get-advance-list",
      const res = await axios.post(`${API_BASE_URL}employee/get-account`,
        payload,
        {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        });

      // if (res.data?.status === "success") {
      //   setEmpData(res.data?.employee_data);
      //   console.log("employee data", empData,res.data?.employee_data.profile_pic,API_BASE_URL);
      //   saveImageUrl();
      // }
      if (res.data?.status === "success") {
        const employeeData = res.data.employee_data;
        console.log("employeeData",employeeData,"API_BASE_URL",API_BASE_URL);
        
        setEmpData(employeeData);

        const profilePic = employeeData?.[0]?.profile_pic;
        saveImageUrl(profilePic);
        const attendencePic = employeeData?.[0]?.attendence_pic;
        saveAttendenceImageUrl(attendencePic);
      }

    } catch (error) {
      console.log("Advance list error:", error);
    }
  };

  // console.log("empData?.profile_pic",empData[0].profile_pic);

  // const saveImageUrl = async () => {
  // const profilePic = empData?.[0]?.profile_pic;


  // const imageUrl = profilePic
  //   ? `${API_BASE_URL}${profilePic.replace(/\\/g, "/")}`
  //   : null;

  //  await AsyncStorage.setItem("imageUrl", imageUrl);
  //  };

  const saveImageUrl = async (profilePic) => {
    const url = profilePic
      ? `${API_BASE_URL}${profilePic.replace(/\\/g, "/")}`
      : null;

    setImageUrl(url); 
    await AsyncStorage.setItem("imageUrl", url);
  };
  const saveAttendenceImageUrl = async (profilePic) => {
    const url = profilePic
      ? `${API_BASE_URL}${profilePic.replace(/\\/g, "/")}`
      : null;

    setAttendenceImageUrl(url); 
    await AsyncStorage.setItem("attendenceimageUrl", url);
  };


  useEffect(() => {
    // const backAction = () => {
    //   BackHandler.exitApp();
    //   return true;
    // };
    const loadData = async () => {
      try {
        const userData = JSON.parse(await AsyncStorage.getItem("userData"));
        setUserData(userData);
        console.log(userData, "userData1234",API_BASE_URL);
      } catch (error) {
        console.log("Error loading userData:", error);
      }
    };

    loadData();
    loadToken();

    fetchemployeedata();
    // const backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   backAction
    // );
    // return () => backHandler.remove();
  }, [token, imageUrl]);


  return (

    <LinearGradient
      colors={["#000000ff", "#1c68beff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>



        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
          {/* Header */}
          <View style={styles.headerRow}>
            {/* <Image
              source={require('${empData.profile_pic}')}
              style={styles.profileImage}
            /> */}
            <Image
              source={
                imageUrl
                  ? { uri: imageUrl }
                  : require("../assets/photo.jpg")
              }
              style={styles.profileImage}
            />
            <Text style={styles.greeting}>Hello, {userData ? `${userData.emp_first_name} ${userData.emp_last_name}` : "User"}</Text>
          </View>

          <LinearGradient
            colors={["#0B132B", "#173d68ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.attendanceCard}
          >


            <View style={styles.calendarSection}>
              {/* Current Month */}
              <Text style={styles.monthText}>
                {new Date().toLocaleString("default", { month: "long" })}{" "}
                {new Date().getFullYear()}
              </Text>

              {/* Calendar Grid */}
              <View style={styles.calendarGrid}>
                {daysOfWeek.map((d, i) => (
                  <Text key={i} style={styles.dayHeader}>
                    {d}
                  </Text>
                ))}

                {(() => {
                  const now = new Date();
                  const year = now.getFullYear();
                  const month = now.getMonth();
                  const totalDays = new Date(year, month + 1, 0).getDate();
                  const firstDay = new Date(year, month, 1).getDay(); // Sunday=0

                  const calendarCells = [];


                  for (let i = 0; i < firstDay; i++) {
                    calendarCells.push(
                      <View
                        key={`empty-${i}`}
                        style={[styles.dayBox, { backgroundColor: "transparent" }]}
                      />
                    );
                  }


                  for (let day = 1; day <= totalDays; day++) {
                    const date = new Date(year, month, day);
                    const isSunday = date.getDay() === 0;

                    const isPresent = [1, 3, 5, 7, 9, 11, 13, 15].includes(day);
                    const isAbsent = [2, 10].includes(day);
                    const isLate = [6, 14, 21].includes(day);

                    let bgColor = "#1C2541";
                    if (isPresent) bgColor = "#8fb8f5ff";
                    if (isAbsent) bgColor = "#fcb2b9ff";
                    if (isLate) bgColor = "#F4A261";
                    if (isSunday) bgColor = "#ffffff";

                    const textColor = isSunday ? "#000" : "#fff";

                    calendarCells.push(
                      <View
                        key={day}
                        style={[styles.dayBox, { backgroundColor: bgColor }]}
                      >
                        <Text style={[styles.dayText, { color: textColor }]}>{day}</Text>
                      </View>
                    );
                  }


                  const remainder = calendarCells.length % 7;
                  if (remainder !== 0) {
                    for (let i = 0; i < 7 - remainder; i++) {
                      calendarCells.push(
                        <View
                          key={`end-empty-${i}`}
                          style={[styles.dayBox, { backgroundColor: "transparent" }]}
                        />
                      );
                    }
                  }

                  return calendarCells;
                })()}
              </View>
            </View>



            {/* Progress and Stats */}
            <View style={styles.attendanceStats}>
              <Text style={styles.sectionTitle}>Attendance Log</Text>

              <View style={styles.statsRow}>

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


                {/* Attendance Stats */}
                <View style={styles.stats}>
                  <Text style={styles.present}>Present: 22</Text>
                  <Text style={styles.absent}>Absent: 02</Text>
                  <Text style={styles.late}>Late: 04</Text>
                </View>
              </View>



              <TouchableOpacity style={styles.markBtn}>
                <Text style={styles.markBtnText}>Mark Attendance</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <Reimbursement />
          <Advance />

        </ScrollView>
        <BottomNavigation />
      </SafeAreaView>
    </LinearGradient>
  );
};


// const styles = StyleSheet.create({


//   container: {
//     flex: 1,
//     backgroundColor: "#0B132B",
//     padding: 5,
//   },
//   greeting: {
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: "600",
//     marginBottom: 10,
//   },
//   card: {
//     backgroundColor: "#1C2541",
//     borderRadius: 20,
//     padding: 15,
//     marginBottom: 15,
//     alignItems: "center",
//   },
//   sectionTitle: {
//     color: "#fff",
//     fontSize: 10,
//     fontWeight: "500",
//     alignSelf: "flex-start",
//   },

//   subText: {
//     color: "#aaa",
//     fontSize: 13,
//     marginTop: 8,
//   },
//   advanceText: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//     paddingHorizontal: 10,
//     marginTop: 10,
//   },
//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   gridItem: {
//     width: "48%",
//     backgroundColor: "#3A506B",
//     paddingVertical: 20,
//     borderRadius: 15,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   gridText: {
//     color: "#fff",
//     fontWeight: "600",
//   },



//   monthText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "600",
//     textAlign: "center",
//     marginBottom: 8,
//   },
//   calendarGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     width: "100%",
//     marginTop: 6,
//   },



//   dayBox: {
//     width: "14%",
//     height: 28,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 6,
//     marginVertical: 2,
//   },

//   dayText: {
//     fontSize: 12,
//     fontWeight: "600",
//   },


//   markBtn: {
//     marginTop: 10,
//     backgroundColor: "#1E90FF",
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//     borderRadius: 10,
//   },
//   markBtnText: {
//     color: "#fff",
//     fontSize: 13,
//     fontWeight: "600",
//   },

//   headerRow: {
//     flexDirection: "row",       // make items appear in a row
//     alignItems: "center",       // vertically center image & text
//     marginBottom: 15,           // space below the header
//   },

//   profileImage: {
//     width: 45,
//     height: 45,
//     borderRadius: 22.5,         // make it circular
//     marginRight: 10,            // space between image and text
//     borderWidth: 2,
//     borderColor: "#1E90FF",     // optional border color
//   },

//   greeting: {
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: "600",
//   },




//   attendanceStats: {
//     width: "33%",      // explicit width for stats
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingTop: 6,
//     marginLeft: 20,

//   },
//   sectionTitle: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 10,
//   },
//   statsRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-around",
//     marginLeft: 25
//   },
//   stats: {
//     marginLeft: 20,
//   },
//   present: {
//     color: "#8fb8f5ff",
//     fontSize: 14,
//     marginBottom: 4,
//   },
//   absent: {
//     color: "#F44336",
//     fontSize: 14,
//     marginBottom: 4,
//   },
//   late: {
//     color: "#FFC107",
//     fontSize: 14,
//   },
//   dayHeader: {
//     color: "#A9A9A9",
//     width: "14%",
//     textAlign: "center",
//     fontSize: 12,
//     fontWeight: "600",
//     marginVertical: 2,
//   },


//   attendanceCard: {
//     flexDirection: "row",
//     backgroundColor: "#1C2541",
//     borderRadius: 20,
//     padding: 15,
//     marginBottom: 15,
//     alignItems: 'flex-start',
//   },

//   calendarSection: {
//     width: "45%",      // explicit width for calendar
//     marginRight: 12,
//   },


// });

const styles = StyleSheet.create({


  container: {
    flex: 1,
    // backgroundColor: "#0B132B",
    //  backgroundColor: 'rgb(11, 47, 73)',
    padding: 5,
  },
  greeting: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#1C2541",
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  // sectionTitle: {
  //   color: "#fff",
  //   fontSize: 10,
  //   fontWeight: "500",
  //   alignSelf: "flex-start",
  // },

  subText: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 8,
  },
  advanceText: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    backgroundColor: "#3A506B",
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  gridText: {
    color: "#fff",
    fontWeight: "600",
  },



  // monthText: {
  //   color: "#fff",
  //   fontSize: 14,
  //   fontWeight: "600",
  //   textAlign: "center",
  //   marginBottom: 8,
  // },
  // calendarGrid: {
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  //   width: "100%",
  //   marginTop: 6,
  // },



  // dayBox: {
  //   width: "14%",
  //   height: 28,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 6,
  //   marginVertical: 2,
  // },

  // dayText: {
  //   fontSize: 12,
  //   fontWeight: "600",
  // },


  // markBtn: {
  //   marginTop: 10,
  //   backgroundColor: "#1E90FF",
  //   paddingHorizontal: 16,
  //   paddingVertical: 6,
  //   borderRadius: 10,
  // },
  // markBtnText: {
  //   color: "#fff",
  //   fontSize: 13,
  //   fontWeight: "600",
  // },

  headerRow: {
    flexDirection: "row",       // make items appear in a row
    alignItems: "center",       // vertically center image & text
    marginBottom: 15,           // space below the header
  },

  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,         // make it circular
    marginRight: 10,            // space between image and text
    borderWidth: 2,
    borderColor: "#1E90FF",     // optional border color
  },

  greeting: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },




  // attendanceStats: {
  //   width: "33%",      // explicit width for stats
  //   alignItems: "center",
  //   justifyContent: "flex-start",
  //   paddingTop: 6,
  //   marginLeft: 20,

  // },
  // sectionTitle: {
  //   color: "#fff",
  //   fontSize: 16,
  //   fontWeight: "600",
  //   marginBottom: 10,
  // },
  // statsRow: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-around",
  //   marginLeft: 25
  // },
  // stats: {
  //   marginLeft: 20,
  // },
  // present: {
  //   color: "#8fb8f5ff",
  //   fontSize: 14,
  //   marginBottom: 4,
  // },
  // absent: {
  //   color: "#F44336",
  //   fontSize: 14,
  //   marginBottom: 4,
  // },
  // late: {
  //   color: "#FFC107",
  //   fontSize: 14,
  // },
  // dayHeader: {
  //   color: "#A9A9A9",
  //   width: "14%",
  //   textAlign: "center",
  //   fontSize: 12,
  //   fontWeight: "600",
  //   marginVertical: 2,
  // },


  // attendanceCard: {
  //   flexDirection: "row",
  //   backgroundColor: "#1C2541",
  //   borderRadius: 20,
  //   padding: 15,
  //   marginBottom: 15,
  //   alignItems: 'flex-start',
  // },

  // calendarSection: {
  //   width: "45%",      // explicit width for calendar
  //   marginRight: 12,
  // },

  attendanceCard: {
    flexDirection: "row",
    backgroundColor: "#1C2541",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginBottom: 8,
    alignItems: 'flex-start',
    gap: 16,
    height:170
  },

  calendarSection: {
    // flex: 1,
    width: '50%',
  },

  monthText: {
    color: "#fff",
    // fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    marginTop:5
  },

  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },

  dayHeader: {
    color: "#6b7c93",
    width: "14.28%",
    textAlign: "center",
    fontSize: 8,
    fontWeight: "600",
    marginBottom: 4,
  },

  dayBox: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    marginBottom: 2,
  },

  dayText: {
    fontSize: 9,
    fontWeight: "500",
  },






  attendanceStats: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 0,
    width: "50%",
    marginTop:5
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "left",
    letterSpacing: 0.3,
    // marginLeft:40
  },

  statsRow: {
    flexDirection: "column",
    alignItems: "right",
    justifyContent: "center",
    width: "120%",
    marginBottom: 16,
    marginLeft: -40
  },

  stats: {
    width: "100%",
    marginTop: -65,
    alignItems: "flex-end",
    paddingRight: 0,
    marginLeft: 10
  },

  present: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "400",
    marginBottom: 6,
    textAlign: "right",
  },

  absent: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "400",
    marginBottom: 6,
    textAlign: "right",
  },

  late: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "400",
    textAlign: "right",
    marginRight: 16
  },

  markBtn: {
    width: "110%",
    backgroundColor: "#1565c0",
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 0,
    // marginLeft:25
  },

  markBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

});


export default Dashboard;
