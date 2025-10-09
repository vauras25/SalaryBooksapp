import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from './ThemeContext';
import BottomNavigation from './BottomNavigation';

const Settings = ({ navigation }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const insets = useSafeAreaInsets();

  const themeColors = {
    background: isDarkMode ? '#000' : '#fff',
    card: isDarkMode ? '#1c1c1e' : '#f4f4f4',
    text: isDarkMode ? '#fff' : '#000',
    label: isDarkMode ? '#ccc' : '#555',
    border: isDarkMode ? '#333' : '#ddd',
    backgroundColor: isDarkMode ? '#444' : '#ccc',
    bcolor: isDarkMode ? '#111' : '#E8E8E8',
    colr: isDarkMode ? '#fff' : '#111',
  };

  const HorizontalLine = () => <View style={styles.line} />;

  const handleLogout = () => {
    Alert.alert('Logout', 'Do you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          navigation.replace('SignUpScreen');
        },
      },
    ]);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColors.background,
          paddingTop: insets.top,
        },
      ]}
    >
      {/* Full Width Header */}
      <View style={[styles.fullWidthHeader, { backgroundColor: themeColors.bcolor }]}>
        <Text style={[styles.title, { color: themeColors.colr }]}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.contentPadding}>
          {/* Profile section */}
          <View style={[styles.profileCard, { backgroundColor: themeColors.card }]}>
            <Image source={require('../assets/photo.jpg')} style={styles.avatar} />
            <TouchableOpacity style={styles.editIcon}>
              <Image
                source={require('../assets/settings.png')}
                style={{ width: 14, height: 14, tintColor: '#fff' }}
              />
            </TouchableOpacity>
            <View style={styles.profileText}>
              <Text style={[styles.nameText, { color: themeColors.text }]}>Employee{"\n"}Name</Text>
              <Text style={[styles.codeText, { color: themeColors.label }]}>AXIHYJ8090</Text>
            </View>
          </View>

          {/* Dark Mode Toggle */}
          <View style={[styles.infoBlock, { borderColor: themeColors.border, backgroundColor: themeColors.card }]}>
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: themeColors.label }]}>DarkMode</Text>
              <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
            </View>
          </View>

          {/* Info block */}
          <View style={[styles.infoBlock, { borderColor: themeColors.border, backgroundColor: themeColors.card }]}>
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: themeColors.label }]}>E-mail</Text>
              <Text style={[styles.value, { color: themeColors.text }]}>sadgywwduq@gmail.com</Text>
            </View>
            <HorizontalLine />
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: themeColors.label }]}>Phone</Text>
              <Text style={[styles.value, { color: themeColors.text }]}>9837432797</Text>
            </View>
            <HorizontalLine />
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: themeColors.label }]}>PAN</Text>
              <Text style={[styles.value, { color: themeColors.text }]}>FSGDC5745K</Text>
            </View>
          </View>

          {/* Bank Accounts */}
          <View style={[styles.card, { backgroundColor: themeColors.card }]}>
            <Text style={[styles.label, { color: themeColors.label }]}>Bank Accounts</Text>
            <HorizontalLine />
            <View style={styles.infoRow}>
              <Text style={[styles.value, { color: themeColors.text }]}>HDFC Bank</Text>
              <Text style={[styles.value, { color: themeColors.text }]}>*7636</Text>
            </View>
          </View>

          {/* Support and Logout */}
          <View style={[styles.card, { backgroundColor: themeColors.card }]}>
            <Text style={[styles.value, { color: themeColors.text }]}>SUPPORT</Text>
            <HorizontalLine />
            <TouchableOpacity onPress={handleLogout}>
              <Text style={[styles.value, { color: themeColors.text }]}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomNavigation />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentPadding: {
    paddingHorizontal: 16,
  },
  fullWidthHeader: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    elevation: 2,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  editIcon: {
    position: 'absolute',
    bottom: 12,
    left: 48,
    backgroundColor: '#004aad',
    borderRadius: 12,
    padding: 4,
  },
  profileText: {
    marginLeft: 16,
  },
  nameText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 100,
    textAlign: 'right',
  },
  codeText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 155,
  },
  infoBlock: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  card: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  line: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
