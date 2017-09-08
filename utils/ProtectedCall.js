import { call, put, take } from 'redux-saga/effects';
import moment from 'moment';

import { UPDATE_TOKEN, UPDATE_TOKEN_SUCCESS } from './../types';
import { TOKEN_EXPIRED_TIME } from './../config';
import { AuthService } from './';

/**
 * Wrapped `call` effect
 * @description check token expiration before each `call` 
 *  and update it if necessary.
 * @param {*} args 
 */
export const ProtectedCall = function* (...args) {

  const { refresh_token_expired } = yield call(AuthService.getTokens);

  if (moment().diff(parseInt(refresh_token_expired, 10), 'seconds') >= TOKEN_EXPIRED_TIME) {
    yield put({ type: UPDATE_TOKEN });
    yield take(UPDATE_TOKEN_SUCCESS);
  }
  return yield call(...args);
}