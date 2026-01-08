import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import search from "../../assets/search.png";
import notification from "../../assets/notification.png"
const Navbar = ({ title }) => {
  return (
    <View style={styles.nav}>
      <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.headerIcons}>
        <Image source={search} style={styles.imageIcon} />
        <Image source={notification} style={styles.imageIcon} />
      </View>
    </View>
  );
};

export default Navbar;
const styles = StyleSheet.create({
  header:{
    width:164
  },
  nav: {
    height: 52,                 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 17,               
    fontWeight: "600",
    marginLeft:-6
  },

  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginLeft:95
  },

  imageIcon: {
    width: 20,
    height: 30,
    resizeMode: "contain",
    tintColor: "#fff",
    // left:100
  },

  bellIcon: {
    fontSize: 18,
    color: "#fff",
  },
});
