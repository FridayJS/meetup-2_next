import { spawn, all } from 'redux-saga/effects';
import {
  AuthSaga as auth,
  UserSaga as user,
  IdeaSaga as idea,
} from './../sagas';

const rootSaga = function* () {
  yield all([
    spawn(auth),
    spawn(user),
    spawn(idea),
  ]);
}

export default rootSaga;
