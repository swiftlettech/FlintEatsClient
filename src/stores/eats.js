import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducers from '../reducers/index'

function getMiddlewareThatLogActions() {
  return createLogger({ predicate: (getState, action) => __DEV__ });
}

function getMiddlewareToLetUsDispatchFunctions() {
  return thunkMiddleware;
}

function configureAndGetStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      getMiddlewareToLetUsDispatchFunctions(),
      getMiddlewareThatLogActions(),
    ),
  );
  return createStore(reducers, initialState, enhancer);
}

const initialState = {
  eats: {
    me: null,
    avatars: {},
    faveMode: false,
    feeds: {},
    focus: null,
    query: '',
    queryText: ''
  }
};

export default configureAndGetStore(initialState);
