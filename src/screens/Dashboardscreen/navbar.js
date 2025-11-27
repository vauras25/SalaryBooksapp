import React, { useState } from "react";
import { View, Text, StyleSheet,ScrollView } from "react-native";
const Navbar = ({title}) => {
    return(
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
              <Text style={styles.headerTitle}>{title}</Text>
              <View style={styles.headerIcons}>
                <Text style={styles.icon}>🔍</Text>
                <Text style={styles.icon}>🔔</Text>
              </View>
            </View>
        </ScrollView>
    );
};

const styles=StyleSheet.create({
header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
headerIcons: { flexDirection: "row", gap: 10 },
headerTitle: { color: "#fff", fontSize: 20, fontWeight: "700" },
icon: { fontSize: 18, color: "#fff" , flexDirection: "row", },
  
})
export default Navbar;