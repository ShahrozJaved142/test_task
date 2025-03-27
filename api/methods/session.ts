import { getRequest, postRequest } from '../index';
import { getProductsUrl, signInUrl } from '../urlHelpers';




export const singinAPI = (payload: any) => postRequest(signInUrl(), payload);
export const getProductAPI = (payload: any) => getRequest(getProductsUrl(payload));
export const getSearchProductAPI = (payload: any) => getRequest(getProductsUrl(payload));
