import { StyleSheet } from "react-native";
import appColors from "../../utils/appColors";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: appColors.white,
    },
    header: {
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    formGroup: {
        marginBottom: 20,
        backgroundColor: "pink",
    },
    label: {
        marginBottom: 8,
        color: '#666',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 12,
        fontSize: 16,
    },
    contentContainer: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        marginTop: 20,
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: appColors.red
    },
})