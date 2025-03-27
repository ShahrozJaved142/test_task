import { useNavigation } from '@react-navigation/native'
import NavKeys, { NavigationProp } from '../../navigation/NavKeys'
import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { defaultValidationRules } from '../../utils/FormValidation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { showErrorMsg, showSuccessMsg } from '../../utils/appMessages';
import { loginUser } from '../../reducers/session';

const useController = () => {
    const users = useSelector((state: RootState) => state.session.userData);
    console.log(JSON.stringify(users,null,2));
    const dispatch =useDispatch()
    const navigation = useNavigation<NavigationProp>()
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true);

    const { values, errors, handleChange, handleSubmit } = useForm({
        initialValues: { email: "", password: "" },
        validationRules: {
            email: defaultValidationRules.email,
            password: defaultValidationRules.password
        },
        onSubmit: (values) => {
            const user = users.find(user => user.email === values.email);
            if (!user) {
                showErrorMsg("User does not exist");
                return;
            }

            if (user.password !== values.password) {
                showErrorMsg("Incorrect password");
                return;
            }

            dispatch(loginUser(values));
            showSuccessMsg("Login successful");
            navigation.navigate(NavKeys.BottomTabBarNavigation);
        }
    });



    const onPressSignUp = () => {
        navigation.navigate(NavKeys.SignUpScreen)
    }

    const _setEmail = (value: string) => {
        handleChange('email', value)
    }

    const _setPassword = (value: string) => {
        handleChange("password", value)
    }

    const onEyePress = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    return {
        email: values.email,
        password: values.password,
        errors,
        isPasswordVisible,

        setEmail: _setEmail,
        setPassword: _setPassword,
        onPressSignUp,
        onEyePress,
        handleSubmit,
    }
}


export default useController
