import { useNavigation } from '@react-navigation/native'
import NavKeys, { NavigationProp } from '../../navigation/NavKeys'
import { useRef, useState } from 'react';
import { FlatList, NativeScrollEvent } from 'react-native';
import { Slide } from '../../utils/appModels';
import { slides } from '../../utils/appData';
import { deviceWidth } from '../../utils/appDimensions';

const useController = () => {

    const navigation = useNavigation<NavigationProp>()
    const flatListRef = useRef<FlatList<Slide>>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const onPressLogin = () => {
        navigation.navigate(NavKeys.LoginScreen)
    }

    const onPressHandleNext = () => {
        if (currentIndex < slides.length - 1) {
            setCurrentIndex(currentIndex + 1);
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
        } else {
            navigation.replace(NavKeys.LoginScreen);

        }
    };

    const handleScroll = (event: { nativeEvent: NativeScrollEvent }) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / deviceWidth);
        setCurrentIndex(newIndex);
    };

    const onPressHandleSkip = () => {
        navigation.replace(NavKeys.LoginScreen);
    }

    return {
        currentIndex,
        flatListRef,

        onPressLogin,
        onPressHandleNext,
        setCurrentIndex,
        handleScroll,
        onPressHandleSkip
    }
}


export default useController