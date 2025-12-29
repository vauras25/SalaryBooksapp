import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import search from "../../assets/search.png";
import notification from "../../assets/notification.png"
const Navbar = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>

      <View style={styles.headerIcons}>
        <Image source={search} style={styles.imageIcon} />
        <Image source={notification} style={styles.imageIcon} />
        {/* <Text style={styles.bellIcon}>🔔</Text> */}
      </View>
    </View>
  );
};

export default Navbar;
const styles = StyleSheet.create({
  header: {
    height: 52,                 // 👈 reduced height
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 17,               // 👈 smaller but readable
    fontWeight: "600",
  },

  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  imageIcon: {
    width: 20,
    height: 30,
    resizeMode: "contain",
    tintColor: "#fff",
    left:100
  },

  bellIcon: {
    fontSize: 18,
    color: "#fff",
  },
});
