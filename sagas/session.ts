import { put, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import NavKeys from '../navigation/NavKeys';
import { handleResponse } from './responseManager';
import { singinAPI } from '../api/methods/session';
import { API_STATUS } from '../utils/appEnums';
import { CommonPayload } from '../utils/appModels';
import { resetLoading, setLoading } from '../reducers/loading';
import { signinRequest } from '../actions/session';

export function* signinAsync({ payload, onSuccess }: CommonPayload) {
    try {
        yield put(setLoading(true))
        const response: AxiosResponse = yield call(signinRequest, payload);
        const responseData = handleResponse(response.data, true)
        if (responseData.success) {
            // console.log("response.data?.data?.userToken", JSON.stringify(response.data?.data?.userToken))
            // resetStackTo(responseData.data.onboardingData)
        } else {
            yield put(resetLoading())
        }
    } catch (error: any) {
        console.log('signinAsync', 'error', error);
        yield put(resetLoading())
        if (error?.response?.data) {
            onSuccess({ status: API_STATUS.ERROR, ...error?.response?.data })
        }
    }
}