//import liraries
import React, { FC } from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';
import styles from './styles';
import { SignUpScreenProps } from './models';
import useController from './useController';
import { Button, Header, InputField, Typography } from '../../components';
import { LeftArrow } from '../../assets/icons';
import appColors from '../../utils/appColors';
import {
    KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';

const SignUpScreen: FC<SignUpScreenProps> = () => {

    const {
        name,
        age,
        email,
        password,
        confirmPassword,
        isPasswordVisible,
        isConfirmPasswordVisible,
        errors,

        setName,
        setAge,
        setEmail,
        setPassword,
        setConfirmPassword,
        onEyePress,
        onConfirmPasswordEyePress,
        onLeftIconPress,
        onPressLogin,
        handleSubmit
    } = useController()

    return (
        <SafeAreaView style={styles.container}>
             <KeyboardAwareScrollView
                keyboardShouldPersistTaps={"never"}
                >
            <Header
                LeftIcon={() => <LeftArrow />}
                onLeftIconPress={onLeftIconPress}
            />
            <Typography style={styles.headerTitle}>
                {`Signup`}
            </Typography>
            <View style={styles.contentContainer}>

                <InputField
                    title='Name'
                    placeholder='John Doe'
                    keyboardType='email-address'
                    onChangeText={setName}
                    value={name}
                    error={errors.name}
                />
                <InputField
                    title='Age'
                    placeholder='0'
                    keyboardType='email-address'
                    onChangeText={setAge}
                    value={age}
                    error={errors.age}
                />
                <InputField
                    title='Email address'
                    placeholder='johndoe@email.com'
                    keyboardType='email-address'
                    onChangeText={setEmail}
                    value={email}
                    error={errors.email}
                />
                <InputField
                    title='Password'
                    placeholder='•••••••••••••••'
                    onChangeText={setPassword}
                    secureTextEntry={isPasswordVisible}
                    onEyePress={onEyePress}
                    isPassword={true}
                    value={password}
                    error={errors.password}

                />
                <InputField
                    title='Confirm Password'
                    placeholder='•••••••••••••••'
                    onChangeText={setConfirmPassword}
                    secureTextEntry={isConfirmPasswordVisible}
                    onEyePress={onConfirmPasswordEyePress}
                    isPassword={true}
                    value={confirmPassword}
                    error={errors.confirmPassword}

                />

                <Button
                    title='Signup & Continue'
                    container={{ marginTop: 20 }}
                    onPress={handleSubmit}
                />
            </View>
            <View style={styles.dontHaveAccountContainer}>
                <Typography>
                    {`Already have an account?`}{" "}
                </Typography>
                <Pressable onPress={onPressLogin}>
                    <Typography style={{ color: appColors.primary }}>
                        {`Login`}
                    </Typography>
                </Pressable>
            </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};


export default SignUpScreen