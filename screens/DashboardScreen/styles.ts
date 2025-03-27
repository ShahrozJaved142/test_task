import { StyleSheet } from "react-native";
import appColors from "../../utils/appColors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.white,
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: appColors.primary,
        backgroundColor: appColors.white,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        marginTop: 20
    },
    itemContainer: {
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 2,
        backgroundColor: appColors.white
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
})