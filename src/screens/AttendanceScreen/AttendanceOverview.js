import React from 'react';
import { View, Text, ScrollView, StyleSheet,Dimensions  } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ProgressChart, BarChart } from "react-native-chart-kit";
import { Calendar } from 'react-native-calendars';

export default function AttendanceOverview() {
  const barData = [22, 2, 1]; // Present, Absent, Late
  const totalDays = 25;
  const attendancePercent = (barData[0] / totalDays) * 100;
  const screenWidth = Dimensions.get("window").width;

  return (
    <LinearGradient colors={['#031B34', '#0A2647']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Attendance Overview</Text>

        {/* Top Charts */}
        <View style={styles.topSection}>
          <View style={styles.circleChart}>
            <ProgressChart
              data={{
                labels: ["Present"],
                data: [0.68], // 68%
              }}
              width={screenWidth - 60}
              height={180}
              strokeWidth={12}
              radius={36}
              chartConfig={{
                backgroundGradientFrom: "#0B132B",
                backgroundGradientTo: "#1c68beff",
                color: (opacity = 1) => `rgba(0, 255, 179, ${opacity})`,
              }}
              hideLegend={true}
            />
            <Text style={styles.circleText}>{attendancePercent.toFixed(0)}%</Text>
          </View>

          <View style={styles.barChartBox}>
            <Text style={styles.monthTitle}>September</Text>
            <BarChart
              data={{
                labels: ["Present", "Absent", "Late"],
                datasets: [{ data: [22, 2, 1] }],
              }}
              width={screenWidth - 40}
              height={220}
              chartConfig={{
                backgroundGradientFrom: "#0B132B",
                backgroundGradientTo: "#1c68beff",
                color: (opacity = 1) => `rgba(0, 255, 179, ${opacity})`,
                labelColor: () => "#C9D1D9",
              }}
              showValuesOnTopOfBars={true}
              withInnerLines={false}
            />
            <View style={styles.barLabels}>
              <Text style={styles.barLabel}>Present</Text>
              <Text style={styles.barLabel}>Absent</Text>
              <Text style={styles.barLabel}>Late</Text>
            </View>
          </View>
        </View>

        {/* Calendar Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Monthly Record</Text>
          <Calendar
            theme={{
              backgroundColor: 'transparent',
              calendarBackground: 'transparent',
              textSectionTitleColor: '#B0C4DE',
              selectedDayBackgroundColor: '#00C6FF',
              selectedDayTextColor: '#fff',
              dayTextColor: '#fff',
              monthTextColor: '#00C6FF',
              arrowColor: '#00C6FF',
            }}
            markedDates={{
              '2025-10-03': { selected: true, marked: true },
              '2025-10-14': { selected: true, marked: true, selectedColor: '#FFA500' },
            }}
          />
          <View style={styles.footerStats}>
            <Text style={styles.footerText}>Total Present: 24</Text>
            <Text style={styles.footerText}>Total Absent: 02</Text>
            <Text style={styles.footerText}>Total Late: 02</Text>
          </View>
        </View>

        {/* Today's Overview */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Today's Overview</Text>
          <Text style={styles.infoText}>Status: <Text style={styles.highlight}>Present</Text></Text>
          <Text style={styles.infoText}>Check In: <Text style={styles.highlight}>09:45 AM</Text></Text>
          <Text style={styles.infoText}>Check Out: <Text style={styles.highlight}>Pending</Text></Text>
        </View>

        {/* Previous Log */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Previous Log</Text>
          <View style={styles.logItem}>
            <Text style={styles.logDate}>Thursday, September 18th</Text>
            <Text style={styles.logDetail}>Check In: 09:45 AM</Text>
            <Text style={styles.logDetail}>Check Out: 07:05 PM</Text>
            <Text style={styles.logDetail}>Report: 8h 15m</Text>
          </View>
          <View style={styles.logItem}>
            <Text style={styles.logDate}>Wednesday, September 17th</Text>
            <Text style={styles.logDetail}>Check In: 09:53 AM</Text>
            <Text style={styles.logDetail}>Check Out: 06:58 PM</Text>
            <Text style={styles.logDetail}>Report: 7h 45m</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 16 },
  header: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  topSection: { flexDirection: 'row', justifyContent: 'space-between' },
  circleChart: { alignItems: 'center', flex: 1 },
  circleText: { position: 'absolute', top: 45, color: '#fff', fontSize: 18, fontWeight: 'bold' },
  barChartBox: { flex: 1, marginLeft: 10 },
  monthTitle: { color: '#fff', fontSize: 16, textAlign: 'center', marginBottom: 4 },
  barLabels: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 6 },
  barLabel: { color: '#B0C4DE', fontSize: 12 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  sectionTitle: { color: '#00C6FF', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  infoText: { color: '#fff', marginBottom: 5 },
  highlight: { color: '#00C6FF', fontWeight: '600' },
  footerStats: { marginTop: 10 },
  footerText: { color: '#B0C4DE', fontSize: 13, marginTop: 2 },
  logItem: { marginTop: 10 },
  logDate: { color: '#00C6FF', fontSize: 14, fontWeight: 'bold' },
  logDetail: { color: '#B0C4DE', fontSize: 13 },
});
