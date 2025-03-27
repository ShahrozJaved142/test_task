import { takeLatest, all, takeEvery } from 'redux-saga/effects';

import * as types from '../actions/types';
import { signinAsync } from './session';

export default function* watch() {
  yield all([

    // Generic
    takeEvery(types.SINGIN_REQUEST, signinAsync),
  ]);
}
