import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomNavigation from './BottomNavigation';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');

const MONTHS = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 10 }, (_, i) => CURRENT_YEAR - 5 + i);

const AttendanceScreen = () => {
  const [inTime, setInTime] = useState(null);
  const [outTime, setOutTime] = useState(null);
  const [status, setStatus] = useState('-');
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR.toString());
  const [modalVisible, setModalVisible] = useState(false);

  const handleMarkPresent = () => {
    const now = new Date();
    const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    setInTime(formattedTime);
    setStatus('P');
  };

  const getCalendarDate = () => {
    const monthIndex = MONTHS.indexOf(selectedMonth) + 1;
    return `${selectedYear}-${monthIndex.toString().padStart(2, '0')}-01`;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.monthContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.monthText}>
            {selectedMonth} {selectedYear}
          </Text>
        </TouchableOpacity>

        <View style={styles.summaryContainer}>
          {['Total Present', 'Total Absent', 'Total Leaves W/O Holiday', 'Total Working Days'].map((title, index) => (
            <TouchableOpacity
              key={index}
              style={styles.box}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.boxTitle}>{title}</Text>
              <Text style={styles.boxValue}>{[0, 2, 10, 26][index]}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 22.5057,
              longitude: 88.3567,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{ latitude: 22.5057, longitude: 88.3567 }}
              title="Vauras Advisory Services"
              description="Lake Gardens, Kolkata"
            />
          </MapView>
        </View>

        <TouchableOpacity style={styles.markButton} onPress={handleMarkPresent}>
          <Text style={styles.markButtonText}>Mark Present</Text>
        </TouchableOpacity>

        <View style={styles.attendanceDetails}>
          <Text style={styles.statusText}>IN : {inTime || '0:00'}</Text>
          <Text style={styles.statusText}>OUT : {outTime || '0:00'}</Text>
          <Text style={styles.statusText}>STATUS - {status}</Text>
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Attendance Calendar</Text>

            <View style={styles.pickerRow}>
              <Picker
                selectedValue={selectedMonth}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedMonth(itemValue)}
              >
                {MONTHS.map((month) => (
                  <Picker.Item key={month} label={month} value={month} />
                ))}
              </Picker>
              <Picker
                selectedValue={selectedYear}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedYear(itemValue)}
              >
                {YEARS.map((year) => (
                  <Picker.Item key={year} label={year.toString()} value={year.toString()} />
                ))}
              </Picker>
            </View>

            <Calendar
              current={getCalendarDate()}
              onDayPress={(day) => {
                console.log('Selected day', day.dateString);
                setModalVisible(false);
              }}
              markedDates={{
                '2025-01-06': { selected: true, selectedColor: '#004aad' },
                '2025-01-24': { selected: true, selectedColor: '#004aad' },
              }}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#000',
                selectedDayBackgroundColor: '#004aad',
                selectedDayTextColor: '#fff',
                todayTextColor: '#004aad',
                dayTextColor: '#000',
                textDisabledColor: '#d9e1e8',
                arrowColor: '#004aad',
                monthTextColor: '#004aad',
                indicatorColor: '#004aad',
                textDayFontWeight: '500',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: 'bold',
                textDayFontSize: 14,
                textMonthFontSize: 16,
              }}
              dayComponent={({ date, state }) => {
                const isSunday = moment(date.dateString).day() === 0;
                return (
                  <View>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: isSunday
                          ? 'red'
                          : state === 'disabled'
                          ? '#ccc'
                          : '#000',
                      }}
                    >
                      {date.day}
                    </Text>
                  </View>
                );
              }}
            />

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.confirmButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomNav}>
        <BottomNavigation />
      </View>
    </View>
  );
};

export default AttendanceScreen;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding:30
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 60,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,

  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  picker: {
    flex: 1,
  },
  confirmButton: {
    backgroundColor: '#004aad',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  monthContainer: {
    alignItems: 'center',
    backgroundColor: '#004aad',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 30,
    marginHorizontal: 20,
  },
  monthText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 5,
    padding: 15,
  },
  box: {
    width: width * 0.42,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  boxTitle: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
  },
  boxValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  mapContainer: {
    height: 150,
    marginHorizontal: 40,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 0,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markButton: {
    backgroundColor: '#004aad',
    borderRadius: 10,
    marginHorizontal: 100,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  markButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  attendanceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});