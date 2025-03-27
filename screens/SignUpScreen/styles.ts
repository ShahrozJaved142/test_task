import { StyleSheet } from "react-native";
import appColors from "../../utils/appColors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.white,
    },
    contentContainer: {
        marginHorizontal: 16,
        justifyContent: "center",
        flex: 1
    },
    headerTitle: {
        marginHorizontal: 16,
        fontSize: 20,
        fontWeight: "600",
        color: appColors.black,
        marginTop: 10
    },
    dontHaveAccountContainer: {
        justifyContent: "center",
        alignItems: "flex-end",
        flexDirection: 'row',
    }
})