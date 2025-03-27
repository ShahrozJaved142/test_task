//import liraries
import React, { FC } from 'react';
import { SafeAreaView } from 'react-native';
import styles from './styles';
import { ProfileScreenProps } from './models';
import useController from './useController';
import { Button, Typography } from '../../components/index';

const ProfileScreen: FC<ProfileScreenProps> = () => {

    const {
        onPressLogin
    } = useController()

    return (
        <SafeAreaView style={styles.container}>
            <Typography>
                {`Profile Screen`}
            </Typography>
        </SafeAreaView>
    );
};


export default ProfileScreen