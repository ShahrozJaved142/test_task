import { combineReducers } from '@reduxjs/toolkit';

import sessionReducer from './session';
import loadingReducer from './loading';

export default combineReducers({
    session: sessionReducer,
    loading: loadingReducer,
});
