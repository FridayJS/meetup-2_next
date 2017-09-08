import { spawn, all, take, call, put } from 'redux-saga/effects';
import { ProtectedCall } from './../utils';
import { USER_FETCH, USER_FETCH_SUCCESS } from './../types';

import { ApiCaller } from './../utils';

function* fetchUser() {
  while (true) {
    try {
      const { onSuccess } = yield take(USER_FETCH);

      const { response, error } = yield ProtectedCall(ApiCaller.get, 'me');
      if (error) {
        /** HANDLE AN ERROR */
      } else {
        yield put({ type: USER_FETCH_SUCCESS, payload: response });
        if (onSuccess) yield call(onSuccess);
      }
    } catch (e) { 
      console.error(e);
    }
  }
}

export const UserSaga = function* () {
  yield all([
    spawn(fetchUser),
  ]);
}
