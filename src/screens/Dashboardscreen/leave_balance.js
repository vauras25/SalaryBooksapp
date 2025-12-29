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
const { width } = Dimensions.get("window");
const Leave_Balance = () => {
    return (
        <View style={styles.barchart}>
            <BarChart
                stackData={[
                    {
                        label: "Paid",
                        stacks: [
                            { value: 7, color: "#4FC3F7" },
                        ],
                    },
                    {
                        label: "",
                        stacks: [
                            { value: 10, color: "#000000" },
                        ],
                    },
                    {
                        label: "Casual",
                        stacks: [
                            { value: 6, color: "#4FC3F7" },
                        ],
                    },
                    {
                        label: "",
                        stacks: [
                            { value: 9, color: "#000000" },
                        ],
                    },
                    {
                        label: "Sick",
                        stacks: [
                            { value: 4, color: "#4FC3F7" },
                        ],
                    },
                    {
                        label: "",
                        stacks: [
                            { value: 11, color: "#000000" },
                        ],
                    },
                ]}
                horizontal
                height={110}
                width={width * 0.38}
                barWidth={16}
                spacing={3}


                maxValue={14}
                noOfSections={7}
                stepValue={2}

                hideRules
                yAxisThickness={0}
                xAxisThickness={0}
                showValuesAsTopLabel
                topLabelComponent={(item) => {
                    const total =item.value
                        // item.stacks.reduce((sum, s) => sum + s.value, 0);
                    return (
                        <Text style={{ color: "#fff", fontSize: 12, left: -20 }}>
                            {total}
                        </Text>
                    );
                }}
                xAxisLabelTextStyle={{
                    color: "#AFC3D6",
                    fontSize: 9,
                    left: 0
                }}

                labelTextStyle={{
                    color: "#FFFFFF",
                    fontSize: 12,
                    width: 48,
                    textAlign: "right",
                    marginRight: 8,
                }}

                yAxisTextStyle={{
                    color: "#AFC3D6",
                    fontSize: 10,
                }}

                isAnimated
                animationDuration={700}
            />

        </View>
    );
}
const styles = StyleSheet.create({
    //   barchart: {
    //     marginTop: -29,
    //     marginLeft: -31,
    //     margin: -20,

    // },
})
export default Leave_Balance;