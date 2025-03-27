//import liraries
import React, { FC } from 'react';
import { SafeAreaView, View } from 'react-native';
import styles from './styles';
import { ProfileScreenProps } from './models';
import useController from './useController';
import { Button, Header, InputField } from '../../components/index';

const ProfileScreen: FC<ProfileScreenProps> = () => {
    const {
        name,
        age,
        users,
        errors,

        setName,
        setAge,
        handleSubmit,
        onPressLogout
    } = useController()

    return (
        <SafeAreaView style={styles.container}>

            <Header
                avatarSource="https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg"
                userName={users?.name}
            />
            <View style={styles.contentContainer}>
                <InputField
                    title="Name"
                    placeholder='John Doe'
                    value={name}
                    onChangeText={setName}
                    error={errors.name}

                />
                
                <InputField
                    title="Age"
                    placeholder='0'
                    value={age}
                    onChangeText={setAge}
                    error={errors.age}
                />
                <Button
                    title="Save Changes"
                    onPress={handleSubmit}
                    container={styles.button}
                />
                <Button
                    title="Logout"
                    onPress={onPressLogout}
                    container={styles.logoutButton}
                />
            </View>

        </SafeAreaView>
    );
};

export default ProfileScreen;