import { spawn, all, take, call, put } from 'redux-saga/effects';

import {
  FETCH_ALL_IDEAS,
  FETCH_ALL_IDEAS_SUCCESS,
  FETCH_ALL_IDEAS_ERROR,
  SAVE_IDEA,
  SAVE_IDEA_SUCCESS,
  UPDATE_IDEA,
  UPDATE_IDEA_SUCCESS,
  REMOVE_IDEA,
  REMOVE_IDEA_SUCCESS,
} from './../types';

import { cancelIdea } from './../actions';

import { ApiCaller, ProtectedCall } from './../utils';

function* fetchIdeas() {
  while (true) {
    try {
      yield take(FETCH_ALL_IDEAS);
      const { response, error } = yield ProtectedCall(ApiCaller.get, 'ideas', { page: 1 });
      if (error) {

      } else {
        yield put({ type: FETCH_ALL_IDEAS_SUCCESS, payload: response });
      }
    } catch (e) { }
  }
}

function* saveIdea() {
  while (true) {
    try {
      const { payload } = yield take(SAVE_IDEA);
      const { response, error } = yield ProtectedCall(ApiCaller.post, 'ideas', payload);
      if (error) {
        /** HANDLE AN ERROR */
      } else {
        yield put({ type: SAVE_IDEA_SUCCESS, payload: response });
        yield put(cancelIdea());
      }
    } catch (e) {
      console.error(e);
    }
  }
}

function* updateIdea() {
  while (true) {
    try {
      const { payload } = yield take(UPDATE_IDEA);
      const { response, error } = yield ProtectedCall(ApiCaller.put, `ideas/${payload.id}`, payload);

      if (error) {
        /** HANDLE AN ERROR */
      } else {
        yield put(cancelIdea());
        yield put({ type: UPDATE_IDEA_SUCCESS, payload: response });
      }
    } catch (e) {
      console.error(e);
    }
  }
}

function* removeIdea() {
  while (true) {
    try {
      const { payload } = yield take(REMOVE_IDEA);

      const { error } = yield ProtectedCall(ApiCaller.delete, `ideas/${payload}`);
      if (error) {
        /** HANDLE AN ERROR */
      } else {
        yield put({ type: REMOVE_IDEA_SUCCESS, payload });
      }
    } catch (e) {
      console.error(e);
    }
  }
}



export const IdeaSaga = function* () {
  yield all([
    spawn(fetchIdeas),
    spawn(saveIdea),
    spawn(updateIdea),
    spawn(removeIdea),
  ]);
}
