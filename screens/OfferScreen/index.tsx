//import liraries
import React, { FC } from 'react';
import { SafeAreaView } from 'react-native';
import styles from './styles';
import { OfferScreenProps } from './models';
import useController from './useController';
import { Button, Typography } from '../../components/index';

const OfferScreen: FC<OfferScreenProps> = () => {

    const {
        onPressLogin
    } = useController()

    return (
        <SafeAreaView style={styles.container}>
            <Typography>
                {`OfferScreen`}
            </Typography>
        </SafeAreaView>
    );
};


export default OfferScreen