import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Progress from "react-native-progress";
import BottomNavigation from './BottomNavigation';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Reimbursement from "./Dashboardscreen/Dashboard_Reimbursement";
import Advance from "./Dashboardscreen/Dashboard_Advance";
import { BackHandler, ToastAndroid } from "react-native";
// import { useFocusEffect } from "@react-navigation/native";

const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];



const Dashboard = () => {

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp(); 
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove(); 
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     const backAction = () => {
  //       BackHandler.exitApp(); 
  //       return true; 
  //     };

  //     const backHandler = BackHandler.addEventListener(
  //       "hardwareBackPress",
  //       backAction
  //     );

  //     // Cleanup when screen is unfocused
  //     return () => backHandler.remove();
  //   }, [])
  // );

  
  return (

    <SafeAreaView
      style={[
        styles.container,
        {
          // backgroundColor: isDarkMode ? '#000' : '#fff',
          // paddingTop: insets.top, // ✅ avoid content under status bar
        },
      ]}
    >



      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Image
            source={require('../assets/photo.jpg')}
            style={styles.profileImage}
          />
          <Text style={styles.greeting}>Hello, Rahul</Text>
        </View>

        <View style={styles.attendanceCard}>

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

              {/* <Progress.Circle
      size={70}
      progress={0.88}
      color="#22b0dbff"
      showsText
      formatText={() => "88%"}
      thickness={8}
      borderWidth={0}
      unfilledColor="#000000ff"
      strokeCap="round"
    /> */}

              <View style={{ position: "relative", alignItems: "center", justifyContent: "center" }}>
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
        </View>

        <Reimbursement />
        <Advance />

      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>

  );
};


const styles = StyleSheet.create({


  container: {
    flex: 1,
    backgroundColor: "#0B132B",
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
  sectionTitle: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "500",
    alignSelf: "flex-start",
  },

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



  monthText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    marginTop: 6,
  },



  dayBox: {
    width: "14%",
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginVertical: 2,
  },

  dayText: {
    fontSize: 12,
    fontWeight: "600",
  },


  markBtn: {
    marginTop: 10,
    backgroundColor: "#1E90FF",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
  },
  markBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

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




  attendanceStats: {
    width: "33%",      // explicit width for stats
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 6,
    marginLeft: 20,

  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginLeft: 25
  },
  stats: {
    marginLeft: 20,
  },
  present: {
    color: "#8fb8f5ff",
    fontSize: 14,
    marginBottom: 4,
  },
  absent: {
    color: "#F44336",
    fontSize: 14,
    marginBottom: 4,
  },
  late: {
    color: "#FFC107",
    fontSize: 14,
  },
  dayHeader: {
    color: "#A9A9A9",
    width: "14%",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    marginVertical: 2,
  },


  attendanceCard: {
    flexDirection: "row",
    backgroundColor: "#1C2541",
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    alignItems: 'flex-start',
  },

  calendarSection: {
    width: "45%",      // explicit width for calendar
    marginRight: 12,
  },


});

export default Dashboard;
