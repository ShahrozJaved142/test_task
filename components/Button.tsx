import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    TextStyle,
    View,
    ActivityIndicator
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import appColors from '../utils/appColors';
import { placeHolderFunction } from '../utils/index';
import _ from "lodash"

interface ButtonProps {
    onPress?: () => void;
    container?: ViewStyle;
    LeftIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
    title?: string;
    isPrimary?: boolean;
    titleStyle?: TextStyle;
    isActive?: boolean;
    isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    title = "",
    isPrimary = true,
    isLoading,
    onPress = placeHolderFunction,
    container = {},
    titleStyle = {},
    LeftIcon = null,
    isActive = true,
}) => {
    const backgroundColor = isPrimary ? appColors.primaryButtonBg : appColors.secondaryButtonBg
    const textColor = isPrimary ? appColors.primaryButtonText : appColors.secondaryButtonText

    const opacity = isActive ? 1 : 0.3

    const { isLoading: globalLoading } = useSelector((state: RootState) => state.loading)

    const buttonLoading = _.isNil(isLoading) ? globalLoading : isLoading

    const renderIcon = () => {
        if (LeftIcon) {
            return (
                <View style={styles.iconContainer}>
                    <LeftIcon />
                </View>
            )
        } return null
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            disabled={!isActive || buttonLoading}
            style={[styles.button, { backgroundColor, opacity }, container]}>
            {renderIcon()}
            <Text allowFontScaling={false} style={[styles.buttonText, { color: textColor }, titleStyle]}>
                {`${title}`}
            </Text>
            {buttonLoading &&
                <ActivityIndicator style={{ marginLeft: 10 }} color={isPrimary ? appColors.white : appColors.primary} />
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 37,
        width: '100%',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 7.5
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '400',
    },
    iconContainer: {
        width: 20,
        height: 20,
        marginRight: 10
    }
});

export default Button;
