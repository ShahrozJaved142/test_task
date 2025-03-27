import React from "react";
import {
  View,
  FlatList,
  Pressable
} from "react-native";
import styles from "./styles";
import { slides } from "../../utils/appData";
import useController from "./useController";
import IndicatorDots from "./components/IndicatorTiles";
import { Button, Typography } from "../../components";
import OnBoardingItem from "./components/OnBoardingItem";


const LandingScreen: React.FC<{ navigation: any }> = () => {

  const {
    currentIndex,
    flatListRef,

    onPressHandleNext,
    onPressHandleSkip,
    handleScroll
  } = useController()

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OnBoardingItem item={item} />}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <IndicatorDots currentIndex={currentIndex} totalSlides={slides.length} />
      <View style={styles.buttonContainer}>
        {currentIndex != slides.length - 1 &&
          <Pressable onPress={onPressHandleSkip}>
            <Typography style={styles.skipText}>Skip</Typography>
          </Pressable>
        }
        {currentIndex != slides.length - 1 ?
          <Pressable
            style={currentIndex === slides.length - 1 && styles.getStartedBtn}
            onPress={onPressHandleNext}
          >
            <Typography style={styles.nextText}>
              {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
            </Typography>
          </Pressable>
          :
          <Button
            title={currentIndex === slides.length - 1 ? "Get Started" : "Next"}
            onPress={onPressHandleNext}
          />
        }
      </View>
    </View>
  );
};

export default LandingScreen;
