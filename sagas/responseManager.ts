import { API_STATUS } from "../utils/appEnums";
import { showErrorMsg } from "../utils/appMessages";

interface ApiResponse<T = any> {
    data: T | null;
    message: string;
    status: API_STATUS;
}

interface DataResponse<T = any> {
    data: T | null;
    message: string;
    success: boolean;
}

const handleResponse = (response: ApiResponse, showError: boolean = false): DataResponse => {
    const responseMsg = response?.message || 'Something went wrong'
    let success = false
    if (response.status === API_STATUS.FAILURE || response.status === API_STATUS.ERROR) {
        if (showError) showErrorMsg(responseMsg)
    } else if (response.status === API_STATUS.SUCCESS) {
        success = true
    }

    return {
        success,
        data: response?.data,
        message: responseMsg,
    };
};

export {
    handleResponse
}