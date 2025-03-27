import { StyleSheet } from "react-native";
import appColors from "../../utils/appColors";
import { deviceHeight, deviceWidth } from "../../utils/appDimensions";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.white,
    },
    slideContainer: {
        width: deviceWidth,
        height: deviceHeight,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "90%",
        marginHorizontal: 10,
        height: 237,
    },
    title: {
        fontSize: 24,
        color: appColors.black,
        marginTop: 40,
    },
    description: {
        color: appColors.grey8D,
        textAlign: "center",
        marginHorizontal: 20,
        marginTop: 20,
        lineHeight: 20,
        letterSpacing: 0.25
    },
    paginationContainer: {
        position: "absolute",
        bottom: 100,
        flexDirection: "row",
        alignSelf: "center",
    },
    dot: {
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        width: deviceWidth - 40,
        alignSelf: "center",
    },
    skipText: {
        fontSize: 14,
        color: appColors.black,
    },
    nextText: {
        fontSize: 14,
        color: appColors.primary,

    },
    getStartedBtn: {
    }
})