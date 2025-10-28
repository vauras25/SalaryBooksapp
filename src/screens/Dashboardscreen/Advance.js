import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import AttendanceScreen from '../AttendanceScreen';
import { useNavigation } from '@react-navigation/native';
const Advance = () => {
    const { width } = Dimensions.get("window");
 const navigation = useNavigation();

      const handlePress = (item) => {
    if (item === "Attendance Management") {
      navigation.navigate("AttendanceScreen");
    }
    else if (item === "Payslips") {
      navigation.navigate("Payslips");
    }
    
  }

    return (

        <View >
            {/* Advance */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Advance</Text>
                <Progress.Bar progress={0.75} width={width * 0.7} color="#00BFFF" />
                <View style={styles.advanceText}>
                    <Text style={styles.subText}>Remaining: ₹5000</Text>
                    <Text style={styles.subText}>Total: ₹20000</Text>
                </View>
            </View>

            {/* Buttons Grid */}
            <View style={styles.card}>
                <View style={styles.grid}>
                    {["Attendance Management", "Advance Management", "Document Vault", "Payslips", "Expense Management", "Leave Management"].map(
                        (item, index) => (
                            <TouchableOpacity key={index} style={styles.gridItem} onPress={() => handlePress(item)}>
                                <Text style={styles.gridText}>{item}</Text>
                            </TouchableOpacity>
                        )
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    card: {
        backgroundColor: "#1C2541",
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        alignItems: "center",
        marginTop: 10,
    },

    sectionTitle: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "500",
        alignSelf: "flex-start",
    },
    advanceText: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 10,
        marginTop: 10,
    },
    subText: {
        color: "#aaa",
        fontSize: 13,
        marginTop: 8,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    gridItem: {
        width: "48%",
        backgroundColor: "#254469ff",
        paddingVertical: 20,
        borderRadius: 25,
        alignItems: "center",
        marginBottom: 10,

    },
    gridText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 12,
    },
});

export default Advance;