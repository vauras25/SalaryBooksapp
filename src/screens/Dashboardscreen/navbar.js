import React from "react";
import { View, Text, StyleSheet, Image,Dimensions } from "react-native";
import search from "../../assets/search.png";
import notification from "../../assets/notification.png"
const { width } = Dimensions.get("window");
import GlobalFont from "../../theme/GlobalFont";
const Navbar = ({ title }) => {
  return (
    <View style={styles.nav}>
      <View style={styles.header}>
      <Text style={[GlobalFont.bold, styles.headerTitle]}>{title}</Text>
      </View>
      <View style={styles.headerIcons}>
        <Image source={search} style={styles.imageIcon} />
        <Image source={notification} style={styles.imageIcon} />
      </View>
    </View>
  );
};

export default Navbar;

// const styles = StyleSheet.create({
//   nav: {
//     height: 52,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 12,
//     width: "100%",
//   },

//   header: {
//     flex: 1,
//     justifyContent: "center",
//   },

//   headerTitle: {
//     color: "#fff",
//     fontSize: 17,
//     fontWeight: "600",
//   },

//   headerIcons: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//   },

//   imageIcon: {
//     width: 22,
//     height: 22,
//     resizeMode: "contain",
//     tintColor: "#fff",
//   },
// });


const styles = StyleSheet.create({
  nav: {
    marginTop:10,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 5,
    width: width*.77,
  },

  header: {
    flex: 1,
    alignItems: "flex-start",   
    justifyContent: "flex-start",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 17,
    // fontWeight: "600",
  },

  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
  },

  imageIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    tintColor: "#fff",
  },
});
