import { placeHolderFunction } from '../utils';
import {
    SINGIN_REQUEST,
} from './types';

const signinRequest = (payload: any, onSuccess = placeHolderFunction) => ({
    type: SINGIN_REQUEST,
    payload,
    onSuccess,
});



export {
    signinRequest,
}