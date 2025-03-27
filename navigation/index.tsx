import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavKeys, { RootStackParamList } from './NavKeys';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import BottomTabBarNavigation from './BottomTabBarNavigation';
import SignUpScreen from '../screens/SignUpScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationStack = () => {

    const isSignedIn = useSelector((state: RootState) => state.session.isSignedIn);

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            {!isSignedIn ?
                <>
                    <Stack.Screen name={NavKeys.LandingScreen} component={LandingScreen} />
                    <Stack.Screen name={NavKeys.LoginScreen} component={LoginScreen} />
                    <Stack.Screen name={NavKeys.SignUpScreen} component={SignUpScreen} />
                </>
                :
                <>
                    <Stack.Screen name={NavKeys.BottomTabBarNavigation} component={BottomTabBarNavigation} />
                </>}

        </Stack.Navigator>
    )
}

export default NavigationStack