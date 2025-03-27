import React, { FC } from "react";
import {
    StyleSheet,
    Text,
    TextProps,
    Dimensions,
    PixelRatio
} from "react-native";
import appColors from "../utils/appColors";

const { width } = Dimensions.get("window");

const getGuidelineBaseWidth = () => {
    if (width <= 320) return 320;
    if (width <= 375) return 375;
    if (width <= 414) return 414;
    return 430;
};

const scaleFont = (size: number) => {
    const baseWidth = getGuidelineBaseWidth();
    const scale = width / baseWidth;
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const moderateScale = (size: number, factor = 0.5) => {
    return size + (scaleFont(size) - size) * factor;
};

const Typography: FC<TextProps> = (props) => {
    const { children, style } = props;

    const customFontSize = (style as any)?.fontSize || 14;
    const adjustedFontSize = moderateScale(customFontSize);

    return (
        <Text allowFontScaling={false} {...props} style={[styles.textStyle, { fontSize: adjustedFontSize }, style]}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: moderateScale(14),
        fontWeight: "400",
        color: appColors.text,
    },
});

export default Typography;
