import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  AuthReducer as auth,
  UserReducer as user,
  IdeaReducer as idea,
} from './../reducers';

const rootReducer = combineReducers({
  auth,
  user,
  idea,
  form: formReducer,
});

export default rootReducer;
