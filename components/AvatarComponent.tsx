import React, { FC, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    View,
    StyleSheet,
} from 'react-native';
import FastImage, { ImageStyle, ResizeMode } from 'react-native-fast-image';
import { SvgUri } from 'react-native-svg';
import appColors from '../utils/appColors';
import Typography from './Typography';
import _ from 'lodash';

type Source = { uri: string; headers?: { [key: string]: string } };

interface AvatarComponentProps {
    source?: Source;
    svgUri?: string;
    name?: string;
    size?: "small" | "large";
    style?: ImageStyle;
    resizeMode?: ResizeMode;
    isSvgUri?: boolean;
    showCount?: number; 
}

const AvatarComponent: FC<AvatarComponentProps> = (props) => {
    const {
        source = null,
        svgUri = "",
        name = "",
        size,
        style,
        resizeMode = FastImage.resizeMode.cover,
        isSvgUri = false,
        showCount,
    } = props;

    const [loading, setLoading] = useState(false);
    const [imageSource, setImageSource] = useState<Source | null>(source);

    useEffect(() => {
        setImageSource(source);
    }, [source]);

    const renderLoaderView = () => {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator animating={loading} color={appColors.primary} size={size ? size : 'large'} />
            </View>
        );
    };

    if ((_.isNil(imageSource) || _.isNil(imageSource?.uri) || imageSource?.uri == "undefined") && name?.length > 0) {
        let fontSize: number = 20;
        if (style?.height && typeof style?.height === "number") {
            fontSize = style?.height * 0.6;
        } else if (style?.width && typeof style?.width === "number") {
            fontSize = style?.width * 0.6;
        }
        return (
            <View {...props} style={[styles.avatarContainer, style]}>
                <Typography style={{ fontSize }}>
                    {showCount ? `+${showCount}` : `${name?.trim()?.charAt(0).toUpperCase()}`}
                </Typography>
            </View>
        );
    } else if (isSvgUri) {
        return (
            <View {...props} style={style}>
                <SvgUri width={"100%"} height={"100%"} uri={svgUri} />
                {renderLoaderView()}
            </View>
        );
    } else if (imageSource) {
        return (
            <FastImage
                {...props}
                style={[styles.avatarImage, style]}
                source={imageSource}
                resizeMode={resizeMode}
                onError={() => setImageSource(null)}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
            >
                {renderLoaderView()}
            </FastImage>
        );
    }
};

const styles = StyleSheet.create({
    avatarContainer: {
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appColors.grayE2,
        borderRadius: 50,
    },
    avatarImage: {
        borderRadius: 50,
    },
    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AvatarComponent;
