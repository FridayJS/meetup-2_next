import { spawn, all, take, call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import moment from 'moment';
import axios from 'axios';

import { TOKEN_EXPIRED_TIME, BASE_API_URL } from './../config';
import { ApiCaller, AuthService } from './../utils';

import {
  SIGNUP,
  SIGNUP_SUCCESS,
  LOGIN,
  LOGIN_SUCCESS,
  CHECK_TOKEN,
  UPDATE_TOKEN,
  UPDATE_TOKEN_SUCCESS,
  LOGOUT,
  CHANGE_USER_AUTH,
} from './../types';
import {
  signupError,
  clearSignupError,
  loginError,
  clearLoginError,
  fetchUser,
  clearUser,
  clearIdeas,
} from './../actions';

function* signup() {
  while (true) {
    try {
      const { payload, onSuccess } = yield take(SIGNUP);
      yield put(clearSignupError());

      const { response: { jwt, refresh_token }, error } = yield call(ApiCaller.post, 'users', payload);
      if (error) {
        yield put(signupError(error.reason));
      } else {
        yield call(AuthService.setTokens, jwt, refresh_token);
        yield put({ type: SIGNUP_SUCCESS });
        yield call(onSuccess);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

function* login() {
  while (true) {
    try {
      const { payload, onSuccess } = yield take(LOGIN);
      yield put(clearLoginError());

      const { response, error } =
        yield call(ApiCaller.post, 'access-tokens', payload);
      if (error) {
        yield put(loginError(error.reason));
      } else {
        yield call(AuthService.setTokens, response.jwt, response.refresh_token);
        yield put({ type: CHANGE_USER_AUTH, payload: true });
        yield put({ type: LOGIN_SUCCESS });
        yield call(onSuccess);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

function* updateToken() {
  while (true) {
    try {
      yield take(UPDATE_TOKEN);

      const { refresh_token } = yield call(AuthService.getTokens);
      const { response: { jwt }, error } =
        yield call(ApiCaller.post, 'refresh-token', { refresh_token });
      if (error) {
        /** LOGOUT USER OR SHOW AN ERROR MESSAGE */
      } else {
        yield call(AuthService.updateToken, jwt);
        yield put({ type: UPDATE_TOKEN_SUCCESS });
      }
    } catch (e) {
      console.error(e);
    }
  }
}

function* logout() {
  while (true) {
    try {
      const { onSuccess } = yield take(LOGOUT);

      yield put(clearUser());
      yield put(clearIdeas());
      yield call(AuthService.unsetTokens);
      if (onSuccess instanceof Function) yield call(onSuccess);

      if (error) {
        /** HANDLE AN ERROR */
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export const AuthSaga = function* () {
  yield all([
    spawn(signup),
    spawn(login),
    spawn(updateToken),
    spawn(logout),
  ]);
}
