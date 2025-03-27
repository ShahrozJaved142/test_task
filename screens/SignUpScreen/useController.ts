import { useNavigation } from '@react-navigation/native'
import NavKeys, { NavigationProp } from '../../navigation/NavKeys'
import { defaultValidationRules } from '../../utils/FormValidation';
import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addUser, updateUser } from '../../reducers/session';
import { showErrorMsg, showSuccessMsg } from '../../utils/appMessages';

const useController = () => {
    const users = useSelector((state: RootState) => state.session.userData || []);
    const dispatch = useDispatch()
    console.log("useController signup ", users);
    const navigation = useNavigation<NavigationProp>()
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(true);

    const { values, errors, handleChange, handleSubmit } = useForm({
        initialValues: { name: "", age: "", email: "", password: "", confirmPassword: "" },
        validationRules: {
            name: defaultValidationRules.name,
            age: defaultValidationRules.age,
            email: defaultValidationRules.email,
            password: defaultValidationRules.password,
            confirmPassword: defaultValidationRules.confirmPassword,
        },
        onSubmit: (values: any) => {
            const userExists = users.some(user => user.email === values.email);
            if (userExists) {
                console.log("userExists",userExists);
                showErrorMsg("User already exists with this email");
                return;
            }

            dispatch(updateUser(values));
            showSuccessMsg("User registered successfully");
            navigation.goBack();
        }
    });

    const onLeftIconPress = () => {
        navigation.goBack()
    }



    const _setName = (value: string) => {
        handleChange("name", value)
    }

    const _setAge = (value: string) => {
        handleChange("age", value)
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

    const onConfirmPasswordEyePress = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
    }

    const _setConfirmPassword = (val: string) => {
        handleChange("confirmPassword", val)
    }

    const onPressLogin = () => {
        navigation.goBack()
    }


    return {
        name: values.name,
        age: values.age,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        errors,
        isPasswordVisible,
        isConfirmPasswordVisible,

        setName: _setName,
        setAge: _setAge,
        setEmail: _setEmail,
        setPassword: _setPassword,
        setConfirmPassword: _setConfirmPassword,
        onPressLogin,
        onEyePress,
        onLeftIconPress,
        onConfirmPasswordEyePress,
        _setConfirmPassword,
        handleSubmit
    }
}


export default useController