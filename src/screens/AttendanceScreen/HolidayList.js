import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function HolidayList() {
  const holidays = [
    { date: "02nd Monday", name: "Dussehra | Mahatma Gandhi’s Birthday" },
    { date: "20 Friday", name: "Diwali" },
    { date: "21 Saturday", name: "Diwali" },
    { date: "27 Friday", name: "Diwali" },
  ];

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const calendar = [
    [null, null, null, null, null, null, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, 31, null, null, null, null, null],
  ];

  return (
    <LinearGradient colors={["#001f3f", "#002b56"]} style={styles.container}>
      <Text style={styles.headerTitle}>Holiday List</Text>

      {/* Month Selector */}
      <View style={styles.monthRow}>
        <Text style={styles.monthText}>October</Text>
        <Text style={styles.yearText}>2025</Text>
      </View>

      {/* Calendar Section */}
      <View style={styles.calendarCard}>
        {/* Left — holiday count */}
        <View style={styles.leftCard}>
          <Text style={styles.cardLabel}>Number of holidays</Text>
          <Text style={styles.cardCount}>04</Text>
        </View>

        {/* Right — mini calendar */}
        <View style={styles.rightCalendar}>
          <View style={styles.dayHeader}>
            {days.map((d, i) => (
              <Text key={i} style={styles.dayText}>{d}</Text>
            ))}
          </View>

          {calendar.map((week, i) => (
            <View key={i} style={styles.weekRow}>
              {week.map((day, j) => (
                <View
                  key={j}
                  style={[
                    styles.dayCell,
                    day === 2 || day === 20 || day === 21 || day === 27
                      ? styles.highlightDay
                      : {},
                  ]}
                >
                  <Text
                    style={[
                      styles.dayNumber,
                      day === 2 || day === 20 || day === 21 || day === 27
                        ? styles.highlightText
                        : {},
                    ]}
                  >
                    {day ? day : ""}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* Holiday List */}
      <View style={styles.listCard}>
        <FlatList
          data={holidays}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.holidayRow}>
              <Text style={styles.holidayDate}>{item.date}</Text>
              <Text style={styles.holidayName}>{item.name}</Text>
            </View>
          )}
          scrollEnabled={false}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 20 },
  monthRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  monthText: { color: "#fff", fontSize: 18, marginRight: 10 },
  yearText: { color: "#9fd3ff", fontSize: 18 },
  calendarCard: {
    flexDirection: "row",
    backgroundColor: "#003b6b",
    borderRadius: 16,
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  leftCard: {
    backgroundColor: "#002b56",
    width: 120,
    height: 120,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cardLabel: { color: "#9fd3ff", fontSize: 12, textAlign: "center", marginBottom: 4 },
  cardCount: { color: "#fff", fontSize: 30, fontWeight: "bold" },
  rightCalendar: { flex: 1, marginLeft: 20 },
  dayHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  dayText: { color: "#9fd3ff", fontSize: 12, width: 20, textAlign: "center" },
  weekRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  dayCell: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  dayNumber: { color: "#fff", fontSize: 12 },
  highlightDay: {
    backgroundColor: "#00c6ff33",
    borderRadius: 4,
  },
  highlightText: { color: "#00e0ff", fontWeight: "bold" },
  listCard: {
    backgroundColor: "#003b6b",
    borderRadius: 16,
    padding: 16,
  },
  holidayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#002b56",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 8,
  },
  holidayDate: { color: "#9fd3ff", fontWeight: "600", fontSize: 13 },
  holidayName: { color: "#fff", fontSize: 13, flex: 1, textAlign: "right" },
});
