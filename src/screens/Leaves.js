import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import BottomNavigation from './BottomNavigation';
import { Calendar } from 'react-native-calendars';
import { useTheme } from './ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const getSundaysInMonth = (year, month) => {
  const marked = {};
  const date = new Date(year, month - 1, 1);
  while (date.getMonth() === month - 1) {
    if (date.getDay() === 1) { // Sundays
      const dateString = date.toISOString().split('T')[0];
      marked[dateString] = {
        customStyles: {
          container: {
            backgroundColor: '#FFDDDD',
            borderRadius: 10,
          },
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
  const { isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getStyles(isDarkMode, insets);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fullWidthHeader}>
        <Text style={styles.title}>Leaves</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
        <TouchableOpacity
          style={styles.holidayHeader}
          onPress={() => setExpanded(!expanded)}
        >
          <Text style={styles.holidayTitle}>Holiday List 2025</Text>
          <Text style={styles.expandIcon}>
              {expanded ? '▴' : '▾'}
          </Text>

        </TouchableOpacity>
        {expanded && (
          <View style={styles.holidayContent}>
            <Calendar
              current={'2025-01-01'}
              markingType="custom"
              markedDates={getSundaysInMonth(2025, 1)}
              theme={{
                backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
                calendarBackground: isDarkMode ? '#1a1a1a' : '#fff',
                dayTextColor: isDarkMode ? '#fff' : '#000',
                monthTextColor: '#004aad',
                textSectionTitleColor: isDarkMode ? '#ccc' : '#004aad',
                selectedDayBackgroundColor: '#004aad',
                selectedDayTextColor: '#fff',
                todayTextColor: '#004aad',
              }}
              style={styles.calendarStyle}
            />
          </View>
        )}
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
};

export default LeavesScreen;

const getStyles = (isDarkMode, insets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000' : '#fff',
      paddingTop: insets.top,
    },
    fullWidthHeader: {
      backgroundColor: isDarkMode ? '#111' : '#E8E8E8',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
      elevation: 2,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: isDarkMode ? '#fff' : '#111',
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 100,
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
      padding: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    expandIcon: {
  color: 'white',
  fontSize: 25, 
  marginLeft: -8,
},

    holidayTitle: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '500',
    },
    holidayContent: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      padding: 10,
    },
    calendarStyle: {
      borderRadius: 10,
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
  });
