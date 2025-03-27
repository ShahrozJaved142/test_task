import { NativeStackNavigationProp } from '@react-navigation/native-stack';


export type RootStackParamList = {
    LoginScreen: undefined
    LandingScreen: undefined
    SignUpScreen: undefined
    BottomTabBarNavigation: undefined
    DashboardScreen: undefined
    NotificationScreen: undefined
    ProfileScreen: undefined
    OfferScreen: undefined
};

const NavKeys = {
    LandingScreen: 'LandingScreen' as const,
    LoginScreen: 'LoginScreen' as const,
    SignUpScreen: 'SignUpScreen' as const,
    DashboardScreen: 'DashboardScreen' as const,
    NotificationScreen: 'NotificationScreen' as const,
    ProfileScreen: 'ProfileScreen' as const,
    MessageScreen: 'MessageScreen' as const,
    BottomTabBarNavigation: 'BottomTabBarNavigation' as const,
    OfferScreen: 'OfferScreen' as const,
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type {
    NavigationProp
}

export default NavKeys
