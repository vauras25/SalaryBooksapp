import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { BarChart } from "react-native-chart-kit";
import Svg, { Circle } from "react-native-svg";

const screenWidth = Dimensions.get("window").width;

export default function OvertimeOverview() {
  const barData = {
    labels: ["M", "T", "W", "T", "F", "S"],
    datasets: [{ data: [1, 1.5, 2, 1, 3, 1] }],
  };

  return (
    <LinearGradient colors={["#001f3f", "#002b56"]} style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Overtime</Text>
        <View style={styles.monthSelector}>
          <Text style={styles.monthText}>September</Text>
          <Text style={styles.yearText}>2025</Text>
        </View>
      </View>

      {/* Overtime Circle */}
      <View style={styles.overtimeBox}>
        <Svg height="120" width="120">
          <Circle cx="60" cy="60" r="50" stroke="#0ff" strokeWidth="6" fill="none" opacity="0.3" />
          <Circle
            cx="60"
            cy="60"
            r="50"
            stroke="#00e0ff"
            strokeWidth="6"
            strokeDasharray="314"
            strokeDashoffset="80"
            strokeLinecap="round"
            fill="none"
          />
        </Svg>
        <Text style={styles.overtimeText}>18h</Text>
      </View>

      {/* Today’s Overtime */}
      <View style={styles.todayBox}>
        <Text style={styles.plusText}>+2 hrs overtime logged today</Text>
        <View style={styles.timeRow}>
          <TouchableOpacity style={[styles.button, { backgroundColor: "#00C897" }]}>
            <Text style={styles.buttonText}>Check In</Text>
          </TouchableOpacity>
          <Text style={styles.timeLabel}>TIME: 09:45</Text>
        </View>
        <View style={styles.timeRow}>
          <TouchableOpacity style={[styles.button, { backgroundColor: "#C94F4F" }]}>
            <Text style={styles.buttonText}>Check Out</Text>
          </TouchableOpacity>
          <Text style={styles.timeLabel}>TIME: 20:02</Text>
        </View>
      </View>

      {/* Overtime Tracker */}
      <View style={styles.chartBox}>
        <Text style={styles.chartTitle}>Overtime Tracker</Text>
        <BarChart
          data={barData}
          width={screenWidth - 60}
          height={180}
          chartConfig={{
            backgroundColor: "#002b56",
            backgroundGradientFrom: "#002b56",
            backgroundGradientTo: "#002b56",
            fillShadowGradient: "#00c6ff",
            fillShadowGradientOpacity: 1,
            color: () => `rgba(255,255,255,0.8)`,
            labelColor: () => `#ccc`,
            barPercentage: 0.5,
          }}
          style={{ marginVertical: 8, borderRadius: 16 }}
          fromZero
        />
      </View>

      {/* Requests & Approvals */}
      <View style={styles.row}>
        <View style={styles.requestBox}>
          <Text style={styles.sectionTitle}>Requests & Approvals</Text>
          <View style={styles.requestItem}>
            <Text style={styles.dateText}>Sept 02</Text>
            <Text style={styles.statusApproved}>Approved</Text>
          </View>
          <View style={styles.requestItem}>
            <Text style={styles.dateText}>Sept 14</Text>
            <Text style={styles.statusPending}>Pending</Text>
          </View>
          <TouchableOpacity style={styles.logButton}>
            <Text style={styles.logText}>+ Log Overtime</Text>
          </TouchableOpacity>
        </View>

        {/* Earnings */}
        <View style={styles.earnBox}>
          <Text style={styles.currency}>₹4500</Text>
          <Text style={styles.earnText}>earned from overtime</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headerTitle: { fontSize: 22, color: "#fff", fontWeight: "700" },
  monthSelector: { flexDirection: "row", alignItems: "center", gap: 10 },
  monthText: { color: "#fff", fontSize: 16 },
  yearText: { color: "#9fd3ff", fontSize: 16 },
  overtimeBox: { alignItems: "center", marginVertical: 20 },
  overtimeText: { position: "absolute", top: 45, fontSize: 22, fontWeight: "bold", color: "#fff" },
  todayBox: { backgroundColor: "#003b6b", borderRadius: 16, padding: 16, marginVertical: 10 },
  plusText: { color: "#00e0ff", fontSize: 16, marginBottom: 10, fontWeight: "500" },
  timeRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 6 },
  button: { paddingVertical: 6, paddingHorizontal: 20, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "600" },
  timeLabel: { color: "#b0c4de", fontSize: 14 },
  chartBox: { backgroundColor: "#003b6b", borderRadius: 16, padding: 16, marginVertical: 10, alignItems: "center" },
  chartTitle: { color: "#fff", fontSize: 16, fontWeight: "600", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  requestBox: { flex: 1, backgroundColor: "#003b6b", borderRadius: 16, padding: 16, marginRight: 10 },
  sectionTitle: { color: "#fff", fontSize: 15, fontWeight: "600", marginBottom: 10 },
  requestItem: { flexDirection: "row", justifyContent: "space-between", marginVertical: 4 },
  dateText: { color: "#ccc" },
  statusApproved: { color: "#00C897" },
  statusPending: { color: "#FFD166" },
  logButton: { marginTop: 8, borderColor: "#00e0ff", borderWidth: 1, borderRadius: 8, padding: 6, alignItems: "center" },
  logText: { color: "#00e0ff", fontWeight: "600" },
  earnBox: { flex: 1, backgroundColor: "#003b6b", borderRadius: 16, padding: 16, alignItems: "center" },
  currency: { color: "#fff", fontSize: 24, fontWeight: "700" },
  earnText: { color: "#9fd3ff", fontSize: 13, marginVertical: 6 },
  progressBar: { height: 8, width: "100%", backgroundColor: "#1a3a5f", borderRadius: 4, overflow: "hidden" },
  progressFill: { width: "70%", height: "100%", backgroundColor: "#00e0ff" },
});
