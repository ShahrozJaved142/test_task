import { Image, View } from 'react-native'
import React from 'react'
import { Slide } from '../../../utils/appModels'
import styles from '../styles'
import { Typography } from '../../../components'

type onBoardingItemProps = {
    item: Slide
}
const OnBoardingItem: React.FC<onBoardingItemProps> = ({ item }) => {
    return (
        <View style={styles.slideContainer}>
            <Image source={item.image} style={styles.image} />
            <Typography style={styles.title}>{item.title}</Typography>
            <Typography style={styles.description}>{item.description}</Typography>
        </View>
    )
}

export default OnBoardingItem