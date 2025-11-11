import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { PieChart } from "react-native-gifted-charts";
import { useNavigation } from '@react-navigation/native';

 const { width } = Dimensions.get("window");

const Reimbursement = () => {
 const navigation = useNavigation();



const approved = 5;
const pending = 2;
const rejected = 2;

const total = approved + pending + rejected;

const data = [
    { value: approved, color: "#37abe0ff", text: "Approved" },
    { value: pending, color: "#F76C6C", text: "Pending" },
    { value: rejected, color: "#5E29F0", text: "Rejected" },
];

    return (
        <View>

            <View style={styles.row}>

                <View style={styles.card}>
                    <Text style={styles.title}>Reimbursement</Text>

                    <View style={styles.chartRow}>
                        <View style={styles.circleContainer}>
                            <PieChart
                                donut
                                radius={35}
                                innerRadius={25}
                                data={data}
                                backgroundColor="#1C2541"
                            // centerLabelComponent={() => (
                            //     <Text style={{ color: "#fff", fontSize: 12, fontWeight: "600" }}>
                            //         {Math.round((approved / total) * 100)}%
                            //     </Text>
                            // )}
                            />
                        </View>

                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.subText}>
                                Approved: <Text style={[styles.value, { color: "#37abe0ff" }]}>{approved}</Text>
                            </Text>
                            <Text style={styles.subText}>
                                Pending: <Text style={[styles.value, { color: "#F76C6C" }]}>{pending}</Text>
                            </Text>
                            <Text style={styles.subText}>
                                Rejected: <Text style={[styles.value, { color: "#5E29F0" }]}>{rejected}</Text>
                            </Text>
                        </View>
                    </View>



                    <View style={styles.latestClaims}>
                        <Text style={styles.latestTitle}>Latest Claims</Text>
                        <View style={styles.claimRow}>
                            <Text style={styles.claimType}>Travel</Text>
                            <Text style={styles.claimAmount}>₹1200</Text>
                        </View>
                    </View>

                    {/* <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Apply Claim</Text>
                        </TouchableOpacity> */}

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Expense')}
                    >
                        <Text style={styles.buttonText}>Apply Claim</Text>
                    </TouchableOpacity>
                </View>



                <View style={styles.card2}>
                    <Text style={styles.title2}>Leave Balance</Text>

                    <BarChart
                        style={{ marginTop: -4 }}
                        stackData={[
                            {
                                label: "Paid",
                                stacks: [
                                    { value: 3, color: "#00B4D8" },
                                    { value: 7, color: "#0532b9ff" },
                                ],
                            },
                            {
                                label: "Casual",
                                stacks: [
                                    { value: 6, color: "#00B4D8" },
                                    { value: 8, color: "#c50909ff" },
                                ],
                            },
                            {
                                label: "Sick",
                                stacks: [
                                    { value: 4, color: "#00B4D8" },
                                    { value: 4, color: "#29a179ff" },
                                ],
                            },
                        ]}
                        horizontal
                        height={150}
                        width={width * 0.4}
                        barWidth={18}
                        hideRules
                        hideYAxisText
                        hideAxesAndRules
                        noOfSections={5}
                        isAnimated
                        animationDuration={800}
                        barBorderRadius={6}
                        showValuesAsTopLabel
                        topLabelComponent={(item) => {
                            const total =
                                item.stacks.reduce((sum, s) => sum + s.value, 0);
                            return (
                                <Text style={{ color: "#fff", fontSize: 12, marginLeft: 5 }}>
                                    {total}
                                </Text>
                            );
                        }}
                        labelTextStyle={{
                            color: "#fff",
                            fontSize: 12,
                            width: 55,
                            textAlign: "right",
                            marginRight: 10,
                        }}
                    />

                    <TouchableOpacity style={styles.button2}>
                        <Text style={styles.buttonText2}>Apply Leave</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    card: {
        width: width * 0.45,
        backgroundColor: "#1C2541",
        borderRadius: 20,
        padding: 15,
        marginHorizontal: 5,
    },
    title: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 10,
    },
    chartRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    circleContainer: {
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
    },

    subText: {
        color: "#9AA5C4",
        fontSize: 11,
        marginVertical: 2,
    },
    value: {
        color: "#FFFFFF",
        fontWeight: "600",
    },
    latestClaims: {
        marginTop: 6,
        backgroundColor: "#2d3b55ff",
        padding: 6,
        borderRadius: 12,
    },
    latestTitle: {
        color: "#FFFFFF",
        fontSize: 12,
        marginBottom: 5,
    },
    claimRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    claimType: {
        color: "#9AA5C4",
        fontSize: 13,
    },
    claimAmount: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "600",
    },
    button: {
        backgroundColor: "#005C99",
        borderRadius: 15,
        paddingVertical: 10,
        marginTop: 15,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "600",
    },


    card2: {
        width: width * 0.45,
        backgroundColor: "#1C2541",
        borderRadius: 20,
        padding: 15,
        marginHorizontal: 5,
        alignItems: "center",
    },
    title2: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 6,
        textAlign: "center",
    },
    button2: {
        backgroundColor: "#005C99",
        borderRadius: 15,
        paddingVertical: 10,
        // marginTop: 10,
        alignItems: "center",
        width: "80%",
    },
    buttonText2: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "600",
    },

});

export default Reimbursement;
