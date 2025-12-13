import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
// import { PieChart } from "react-native-svg-charts";
// import { G, Line } from "react-native-svg";
import * as Progress from "react-native-progress";
import BottomNavigation from "../BottomNavigation";
export default function LeaveManagementScreen() {
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

            <TouchableOpacity style={styles.leaveButton}>
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

        {/* Upcoming Leave */}
        <Text style={styles.sectionTitle}>Upcoming Leave</Text>

        <View style={styles.upcomingCard}>
          <Text style={styles.upcomingDate}>Oct 03 - Oct 05</Text>
          <View style={styles.upcomingStatusBox}>
            <Text style={styles.upcomingStatusText}>Sick Leave</Text>
          </View>
        </View>

        {/* Leave History */}
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

/* ------------------ Reusable Bar Item ------------------ */

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

/* ------------------ Styles ------------------ */

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
});
