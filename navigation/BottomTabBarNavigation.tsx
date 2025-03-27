import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import NavKeys, { RootStackParamList } from './NavKeys';
import appColors from '../utils/appColors';
import {
    TabChat,
    TabDashboard,
    TabNotification,
    TabProfile
} from '../assets/icons';
import DashboardScreen from '../screens/DashboardScreen';
import { BOTTOM_TAB_BAR_HEIGHT, useInsets } from '../utils/appDimensions';
import Typography from '../components/Typography';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OfferScreen from '../screens/OfferScreen';

const Tab = createBottomTabNavigator<RootStackParamList>();

interface TabButtonProps {
    focused?: boolean;
    label?: string;
    ActiveIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
    InActiveIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

const TabButton: FC<TabButtonProps> = (props) => {
    const {
        focused,
        label,
        ActiveIcon,
        InActiveIcon,
    } = props
    return (
        <View style={styles.tabButton}>
            <View style={styles.tabIcon}>
                {ActiveIcon && <ActiveIcon />}
            </View>
            <Typography
                style={{
                    marginTop: 5,
                    fontSize: 13,
                    color: focused ? appColors.primary : appColors.gray3
                }}>
                {`${label}`}
            </Typography>
        </View>
    )
}

const BottomTabBarNavigation = () => {
    const { bottom } = useInsets()

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: appColors.white,
                    height: BOTTOM_TAB_BAR_HEIGHT + bottom
                },
            }}>
            <Tab.Screen
                name={NavKeys.DashboardScreen}
                component={DashboardScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabButton
                            label='Home'
                            focused={focused}
                            ActiveIcon={TabDashboard}
                        />
                    )
                }}
            />
            <Tab.Screen
                name={NavKeys.NotificationScreen}
                component={NotificationScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabButton
                            label='Notification'
                            focused={focused}
                            ActiveIcon={TabNotification}
                        />
                    )
                }}
            />
            <Tab.Screen
                name={NavKeys.OfferScreen}
                component={OfferScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabButton
                            label='Offer'
                            focused={focused}
                            ActiveIcon={TabChat}
                        />
                    )
                }}
            />
            <Tab.Screen
                name={NavKeys.ProfileScreen}
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabButton
                            label='Profile'
                            focused={focused}
                            ActiveIcon={TabProfile}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBar: {
        backgroundColor: appColors.baseDark,
    },
    tabButton: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    tabIcon: {
        marginTop: 25,
        height: 15,
        width: 25,
        alignItems: "center",
        justifyContent: "center"
    },
});

export default BottomTabBarNavigation;
