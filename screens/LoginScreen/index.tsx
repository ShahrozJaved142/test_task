//import liraries
import React, { FC } from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';
import styles from './styles';
import { LoginScreenProps } from './models';
import { InputField, Button, Typography, AvatarComponent } from '../../components';
import useController from './useController';
import { AppLogo, EyeClosed } from '../../assets/icons';
import appColors from '../../utils/appColors';

const LoginScreen: FC<LoginScreenProps> = () => {

    const {
        email,
        password,
        isPasswordVisible,
        errors,

        setEmail,
        setPassword,

        onPressSignUp,
        onEyePress,
        handleSubmit
    } = useController()

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <AppLogo />
                <InputField
                    title='Email address'
                    placeholder='Email'
                    keyboardType='email-address'
                    onChangeText={setEmail}
                    value={email}
                    error={errors.email}
                />
                <InputField
                    title='Password'
                    placeholder='Password'
                    onChangeText={setPassword}
                    secureTextEntry={isPasswordVisible}
                    onEyePress={onEyePress}
                    isPassword={true}
                    value={password}
                    error={errors.password}

                />

                <Button
                    title='Login'
                    onPress={handleSubmit}
                    container={{ marginTop: 20 }}
                />
            </View>
            <View style={styles.dontHaveAccountContainer}>
                <Typography>
                    {`Don't have an account?`}{" "}
                </Typography>
                <Pressable onPress={onPressSignUp}>
                    <Typography style={{ color: appColors.primary }}>
                        {`Sign Up`}
                    </Typography>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};


export default LoginScreen