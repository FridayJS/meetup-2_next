import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import withRedux from 'next-redux-wrapper';
import nextReduxSaga from 'next-redux-saga';
import rootReducer from './CombineReducers';
import rootSaga from './CombineSagas';

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(
      applyMiddleware(sagaMiddleware),
      applyMiddleware(createLogger({ collapsed: true })),
    ),
  );

  store.sagaTask = sagaMiddleware.run(rootSaga)
  return store;
}

export const WithReduxSaga = BaseComponent =>
  withRedux(configureStore)(nextReduxSaga(BaseComponent));

