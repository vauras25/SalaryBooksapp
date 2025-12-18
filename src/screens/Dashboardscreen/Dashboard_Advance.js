import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
const { width } = Dimensions.get("window");

const Advance = ({ updateTitle }) => {
    const navigation = useNavigation();
    const progress = 0.75; // 75%

    const handlePress = (item) => {
        if (item === "Attendance Management") {
            navigation.navigate("AttendanceScreen", { title: "Attendance" });
        }
        else if (item === "Payslips") {
            navigation.navigate("Payslips", { title: item });
        }
        else if (item === "Expense Management") {
            navigation.navigate("Expense", { title: item });
        }
        else if (item === "Advance Management") {
            navigation.navigate("Advance", { title: item });
        }
        else if (item === "Document Vault") {
            navigation.navigate("document_vault", { title: item });
        }
        else if (item === "Leave Management") {
            navigation.navigate("Leave_Management", { title: item });
        }
    }

    return (
        <View>
            <LinearGradient
                colors={["#122441ff", "#0c3058ff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
            >
                <View style={styles.advance_card}>
                    <Text style={styles.sectionTitle}>Advance</Text>

                    <View style={styles.progressRow}>
                        <View style={styles.progressBarContainer}>
                            <View style={styles.progressBarBackground}>
                                <View
                                    style={[
                                        styles.progressBarFill,
                                        { width: `${progress * 100}%` }
                                    ]}
                                />
                            </View>
                        </View>

                        {/* Percentage */}
                        <Text style={styles.percentage}>75%</Text>
                    </View>
                </View>
                <View style={styles.advanceText}>
                    <View style={styles.amountItem}>
                        <Text style={styles.label}>Remaining</Text>
                        <Text style={styles.labelRight}>Total</Text>
                    </View>
                    <View style={styles.amountItemRight}>
                        <Text style={styles.amount}>₹5000</Text>
                        <Text style={styles.amountRight}>₹20000</Text>
                    </View>
                </View>


            </LinearGradient>

            {/* Buttons Grid */}
            <LinearGradient
                colors={["#122441ff", "#143f70ff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card2}
            >
                <View style={styles.grid}>
                    {["Attendance Management", "Advance Management", "Document Vault", "Payslips", "Expense Management", "Leave Management"].map(
                        (item, index) => (
                            <TouchableOpacity key={index} style={styles.gridItem} onPress={() => handlePress(item)}>
                                <Text style={styles.gridText}>{item}</Text>
                            </TouchableOpacity>
                        )
                    )}
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: "#1C2541",
        borderRadius: 20,
        padding: 15,
        marginBottom: 50,
        marginTop: -35,
        flexDirection: "row",
        paddingVertical: 1
    },
    card2: {
        flex: 1,
        backgroundColor: "#1C2541",
        borderRadius: 20,
        padding: 15,
        marginBottom: 50,
        marginTop: -35,
        flexDirection: "row",

    },
    advance_card: {
        marginTop:5,
        flexDirection: "column"
    },
    sectionTitle: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "400",
        alignSelf: "flex-start",
        marginBottom: 4,
        marginTop: 7
    },
    progressRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        width: width * 0.54
    },
    progressBarContainer: {
        flex: 1,
        marginRight: 16,
    },
    progressBarBackground: {
        width: "100%",
        height: 8,
        backgroundColor: "#0a1929",
        borderRadius: 4,
        overflow: "hidden",
    },
    progressBarFill: {
        height: "100%",
        backgroundColor: "#00d9ff",
        borderRadius: 4,
    },
    percentage: {
        color: "#ffffff",
        fontSize: 15,
        fontWeight: "500",
        minWidth: 50,
        textAlign: "right",
        right: 30
    },
    advanceText: {
        top: -8,
        // marginLeft:-30,
        right: 18,
        backgroundColor: "#144770ff",
        borderRadius: 15,
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "48%",
        paddingVertical: 10
    },
    amountItem: {
        // flex: 1,
        flexDirection: "column",
        left: 10
    },
    amountItemRight: {
        // flex: 1,
        // alignItems: "flex-end",
        // marginRight:60,
        justifyContent: "flex-start",
        right: 7

    },
    label: {
        color: "#fff",
        fontSize: 13,
        marginBottom: 2,
    },
    labelRight: {
        color: "#fff",
        fontSize: 13,
        marginBottom: 2,
        textAlign: "left",
    },
    amount: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "500",
        textAlign: "right"
    },
    amountRight: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "500",
        textAlign: "right",
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    gridItem: {
        width: "48%",
        backgroundColor: "#144770ff",
        paddingVertical: 15,
        borderRadius: 15,
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