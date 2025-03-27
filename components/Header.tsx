import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import AvatarComponent from './AvatarComponent';
import { placeHolderFunction } from '../utils';

interface HeaderProps {
    LeftIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
    RightIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
    LeftSecondaryIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
    RightSecondaryIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
    headerTitle?: string;
    avatarSource?: string;
    userName?: string;
    showDivider?: boolean;
    onLeftIconPress?: () => void;
    onRightIconPress?: () => void;
    onLeftSecondaryIconPress?: () => void;
    onRightSecondaryIconPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
    LeftIcon = null,
    RightIcon = null,
    LeftSecondaryIcon = null,
    RightSecondaryIcon = null,
    headerTitle = "",
    avatarSource = "",
    userName = "",
    showDivider = false,
    onLeftIconPress = placeHolderFunction,
    onRightIconPress = placeHolderFunction,
    onLeftSecondaryIconPress = placeHolderFunction,
    onRightSecondaryIconPress = placeHolderFunction,
}) => {

    const renderLeftIcon = () => {
        if (LeftIcon) {
            return (
                <TouchableOpacity onPress={onLeftIconPress} style={styles.iconContainer}>
                    <LeftIcon />
                </TouchableOpacity>
            );
        }
        return null;
    };
    const renderLeftSecondaryIcon = () => {
        if (LeftSecondaryIcon) {
            return (
                <TouchableOpacity onPress={onLeftSecondaryIconPress} style={styles.iconContainer}>
                    <LeftSecondaryIcon />
                </TouchableOpacity>
            );
        }
        return null;
    };
    const renderRightIcon = () => {
        if (RightIcon) {
            return (
                <TouchableOpacity onPress={onRightIconPress} style={styles.iconContainer}>
                    <RightIcon />
                </TouchableOpacity>
            );
        }
        return null;
    };
    const renderRightSecondaryIcon = () => {
        if (RightSecondaryIcon) {
            return (
                <TouchableOpacity onPress={onRightSecondaryIconPress} style={styles.iconContainer}>
                    <RightSecondaryIcon />
                </TouchableOpacity>
            );
        }
        return null;
    };
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={[styles.header, showDivider && styles.divider]}>
                <View style={styles.leftContainer}>

                    {renderLeftIcon()}

                    {renderLeftSecondaryIcon()}

                    {avatarSource && (
                        <View style={styles.avatarContainer}>
                            <AvatarComponent source={{ uri: avatarSource }} style={styles.avatar} />
                            {userName && (
                                <View style={styles.userInfo}>
                                    <Text style={styles.userName}>{userName}</Text>
                                    <Text style={styles.greeting}>Good Morning</Text>
                                </View>
                            )}
                        </View>
                    )}
                </View>

                {headerTitle && (
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{headerTitle}</Text>
                    </View>
                )}

                <View style={styles.rightContainer}>
                    {renderRightIcon()}
                    {renderRightSecondaryIcon()}

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 10,
        paddingTop: 5
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        marginHorizontal: 8,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    userInfo: {
        marginLeft: 8,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    greeting: {
        fontSize: 12,
        color: '#666',
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Header;