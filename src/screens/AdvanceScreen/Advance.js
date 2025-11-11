import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import BottomNavigation from "../BottomNavigation";

const AdvanceManagement = () => {
  return (
    <LinearGradient colors={["#05203C", "#0A3B63"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Advance Management</Text>
          <View style={styles.headerIcons}>
            <Icon name="search-outline" size={22} color="#fff" style={styles.icon} />
            <Icon name="notifications-outline" size={22} color="#fff" />
          </View>
        </View>

        {/* Month & Year Selector */}
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

        {/* Advance Overview */}
        <View style={styles.overviewBox}>
          <View style={styles.overviewHeader}>
            <Text style={styles.sectionTitle}>Advance Overview</Text>
            <TouchableOpacity style={styles.addBtn}>
              <Text style={styles.addBtnText}>+ Advance Request</Text>
            </TouchableOpacity>
          </View>

          {/* Progress bar */}
          <Text style={styles.progressText}>75%</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "75%" }]} />
          </View>

          {/* Amounts */}
          <View style={styles.amountRow}>
            <Text style={styles.amountLabel}>₹20000{"\n"}<Text style={styles.amountSub}>Total Advance</Text></Text>
            <Text style={styles.amountLabel}>₹8000{"\n"}<Text style={styles.amountSub}>Remaining</Text></Text>
          </View>

          <Text style={styles.emiText}>EMI: ₹2000 / month</Text>
        </View>

        {/* Upcoming Deduction */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Deduction</Text>
          <View style={styles.card}>
            <Text style={styles.cardDate}>Oct 01</Text>
            <Text style={styles.cardAmount}>₹2000 due</Text>
          </View>
        </View>

        {/* Advance History */}
        <View style={styles.section}>
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
        </View>
      </ScrollView>
      <BottomNavigation/>
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
    backgroundColor: "#5A6BF2",
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
});

export default AdvanceManagement;
