import { useNavigation } from '@react-navigation/native'
import NavKeys, { NavigationProp } from '../../navigation/NavKeys'

const useController = () => {

    const navigation = useNavigation<NavigationProp>()

    const onPressLogin = () => {
        navigation.navigate(NavKeys.LoginScreen)
    }

    return {
        onPressLogin
    }
}


export default useController