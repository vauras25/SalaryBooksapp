import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomNavigation from './BottomNavigation';
import { Calendar } from 'react-native-calendars';
const getSundaysInMonth = (year, month) => {
  const marked = {};
  const date = new Date(year, month - 1, 1);

  while (date.getMonth() === month - 1) {
    if (date.getDay() === 1) {
      const dateString = date.toISOString().split('T')[0];
      marked[dateString] = {
        customStyles: {
          text: {
            color: 'red',
            fontWeight: 'bold',
          },
        },
      };
    }
    date.setDate(date.getDate() + 1);
  }

  return marked;
};

const LeavesScreen = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Full-width Header */}
      <View style={styles.fullWidthHeader}>
        <Text style={styles.title}>Leaves</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Leave Summary Boxes */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>Comp Offs</Text>
            <Text style={styles.summaryValue}>2</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>Total Leaves</Text>
            <Text style={styles.summaryValue}>10</Text>
          </View>
        </View>

        {/* Holiday List Toggle */}
        <TouchableOpacity
          style={styles.holidayHeader}
          onPress={() => setExpanded(!expanded)}
          activeOpacity={0.8}
        >
          <Text style={styles.holidayTitle}>Holiday List 2025</Text>
          <Icon
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="white"
          />
        </TouchableOpacity>

        {/* Holiday List Body */}
        {expanded && (
  <View style={styles.holidayContent}>
    <Calendar
  current={'2025-01-01'}
  monthFormat={'MMMM yyyy'}
  firstDay={0}
  hideExtraDays
  disableMonthChange
  markingType={'custom'}
  markedDates={{
    ...getSundaysInMonth(2025, 1),
    
   
  }}
  renderArrow={(direction) => (
    <Icon
      name={direction === 'left' ? 'chevron-back' : 'chevron-forward'}
      size={18}
      color="#004aad"
    />
  )}
  theme={{
    backgroundColor: '#eeeeee',
    calendarBackground: '#eeeeee',
    textSectionTitleColor: '#000',
    selectedDayBackgroundColor: '#004aad',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#004aad',
    dayTextColor: '#000',
    textDisabledColor: '#d9e1e8',
    arrowColor: '#004aad',
    monthTextColor: '#004aad',
    textMonthFontWeight: 'bold',
    textDayFontWeight: '500',
    textDayFontSize: 16,
    textMonthFontSize: 14,
  }}
  enableSwipeMonths={false}
/>

  </View>
)}

      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
};

export default LeavesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  fullWidthHeader: {
    backgroundColor: '#E8E8E8',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    elevation: 2, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginTop:30
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryBox: {
    backgroundColor: '#004aad',
    borderRadius: 10,
    width: '48%',
    paddingVertical: 12,
    alignItems: 'center',
  },
  summaryTitle: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 5,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  holidayHeader: {
    flexDirection: 'row',
    backgroundColor: '#004aad',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  holidayTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  holidayContent: {
    backgroundColor: '#eeeeee',
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  holidayEmpty: {
    color: '#555',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
