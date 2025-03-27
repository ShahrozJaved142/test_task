import { useNavigation } from '@react-navigation/native'
import NavKeys, { NavigationProp } from '../../navigation/NavKeys'
import { defaultValidationRules } from '../../utils/FormValidation';
import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addUser, loginUser, logout, updateUser } from '../../reducers/session';
import { showErrorMsg, showSuccessMsg } from '../../utils/appMessages';

const useController = () => {
    const users = useSelector((state: RootState) => state.session.currentUser);
    const dispatch = useDispatch()
    const navigation = useNavigation<NavigationProp>()

    const { values, errors, handleChange, handleSubmit } = useForm({
        initialValues: { name: users?.name || '', age: users?.age || '' },
        validationRules: {
            name: defaultValidationRules.name,
            age: defaultValidationRules.age,
        },
        onSubmit: (values: any) => {
            dispatch(updateUser(values));
            showSuccessMsg('Profile updated successfully!');
            navigation.navigate(NavKeys.DashboardScreen)
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

    const onPressLogin = () => {
        navigation.goBack()
    }

    const onPressLogout = () => {
        dispatch(logout())
    }


    return {
        users,
        name: values.name,
        age: values.age,
        errors,

        setName: _setName,
        setAge: _setAge,
        onPressLogin,
        onLeftIconPress,
        handleSubmit,
        onPressLogout
    }
}


export default useController