import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { userRegisterReducer } from './reducers/UserReducers';

const initialState = {};

const reducer = combineReducers({
  userRegister: userRegisterReducer
});

const composeEnhancer = compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
