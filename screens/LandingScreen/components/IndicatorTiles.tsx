import React from "react";
import { View, StyleSheet } from "react-native";
import appColors from "../../../utils/appColors";

interface IndicatorDotsProps {
    currentIndex: number;
    totalSlides: number;
}

const IndicatorDots: React.FC<IndicatorDotsProps> = ({ currentIndex, totalSlides }) => {
    return (
        <View style={styles.paginationContainer}>
            {Array.from({ length: totalSlides }).map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        {
                            backgroundColor: currentIndex === index ? appColors.primary : appColors.gray,
                        },
                    ]}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    paginationContainer: {
        position: "absolute",
        bottom: 150,
        flexDirection: "row",
        alignSelf: "center",
    },
    dot: {
        width: 10,
        height: 10,
        marginHorizontal: 4,
        borderRadius: 5,
    },
});

export default IndicatorDots;
