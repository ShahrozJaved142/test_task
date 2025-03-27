import { StyleSheet } from "react-native";
import appColors from "../../utils/appColors";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: appColors.white,
        paddingHorizontal: 10,
        alignContent: "center"
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    forgotPasswordBtn: {
        alignSelf: "flex-end",
        marginVertical: 7.5
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginBottom: 20
    },
    dontHaveAccountContainer: {
        justifyContent: "center",
        alignItems: "flex-end",
        flexDirection: 'row',
    }
})