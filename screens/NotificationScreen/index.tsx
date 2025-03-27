//import liraries
import React, { FC } from 'react';
import { SafeAreaView } from 'react-native';
import styles from './styles';
import { NotificationScreenProps } from './models';
import useController from './useController';
import { Button, Typography } from '../../components/index';

const NotificationScreen: FC<NotificationScreenProps> = () => {

    const {
        onPressLogin
    } = useController()

    return (
        <SafeAreaView style={styles.container}>
            <Typography>
                {`notification Screen`}
            </Typography>
        </SafeAreaView>
    );
};


export default NotificationScreen