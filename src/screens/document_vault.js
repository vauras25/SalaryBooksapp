import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from "react-native-linear-gradient";
import Navbar from './Dashboardscreen/navbar';
import BottomNavigation from './BottomNavigation';
import { useRoute } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const DocumentVaultScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("Personal");

  const personalDocs = [
    { id: 1, title: "PAN Card" },
    { id: 2, title: "Adhaar Card" },
    { id: 3, title: "Driver’s License" },
  ];

  const otherDocs = [
    { id: 1, title: "Appointment Letter" },
    { id: 2, title: "Offer Letter" },
    { id: 3, title: "Revision Letter" },
  ];

  const route = useRoute();
  const screenTitle = route.params?.title;

  return (
    <LinearGradient colors={["#0B132B", "#1c68beff"]} style={styles.gradient}>
      <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
        
        <Navbar title={screenTitle} />

        {/* Tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "Personal" && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab("Personal")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Personal" && styles.tabTextActive,
              ]}
            >
              Personal
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "Others" && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab("Others")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Others" && styles.tabTextActive,
              ]}
            >
              Others
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>


          {/* PERSONAL TAB */}
          {activeTab === "Personal" && (
            <>
              <View style={styles.titleRow}>
                <Text style={styles.sectionTitle}>Personal Documents</Text>

                <TouchableOpacity style={styles.uploadBtn}>
                  <Text style={styles.uploadText}>Upload File</Text>
                </TouchableOpacity>
              </View>

              {personalDocs.map((doc) => (
                <View key={doc.id} style={styles.card}>
                  <View style={styles.cardLeft}>
                    <Text style={styles.cardIcon}>🪪</Text>
                    <Text style={styles.cardTitle}>{doc.title}</Text>
                  </View>

                  <View style={styles.cardRight}>
                    <Text style={styles.cardAction}>⬇️</Text>
                    <Text style={styles.cardAction}>🗑️</Text>
                  </View>
                </View>
              ))}
            </>
          )}

          {/* OTHERS TAB */}
          {activeTab === "Others" && (
            <>
              <View style={styles.titleRow}>
                <Text style={styles.sectionTitle}>Others</Text>

                <TouchableOpacity style={styles.uploadBtn}>
                  <Text style={styles.uploadText}>Upload File</Text>
                </TouchableOpacity>
              </View>

              {otherDocs.map((doc) => (
                <View key={doc.id} style={styles.card}>
                  <View style={styles.cardLeft}>
                    <Text style={styles.cardIcon}>📄</Text>
                    <Text style={styles.cardTitle}>{doc.title}</Text>
                  </View>

                  <View style={styles.cardRight}>
                    <Text style={styles.cardAction}>⬇️</Text>
                    <Text style={styles.cardAction}>🗑️</Text>
                  </View>
                </View>
              ))}
            </>
          )}

          <View style={{ height: 90 }} />

        </ScrollView>

        <BottomNavigation />

      </SafeAreaView>
    </LinearGradient>
  );
};

export default DocumentVaultScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },

  /* Tabs */
  tabRow: {
    flexDirection: "row",
    backgroundColor: "#0f1b33",
    padding: 0,
    borderRadius: 25,
    marginTop: 0,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 20,
  },
  tabButtonActive: {
    backgroundColor: "#1c68be",
  },
  tabText: {
    color: "#788a9e",
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#fff",
  },

  /* Section */
  titleRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  uploadBtn: {
    backgroundColor: "#1c68be",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  uploadText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

  /* Cards */
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 15,
    borderRadius: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardIcon: {
    fontSize: 22,
    marginRight: 10,
    color: "#fff",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  cardRight: {
    flexDirection: "row",
    width: 55,
    justifyContent: "space-between",
  },
  cardAction: {
    fontSize: 20,
    color: "#fff",
  },
});
