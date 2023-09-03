import {createStore, applyMiddleware} from 'redux';
import initialState from 'redux/initialState';
import apiMiddleware from 'middlewares/apiMiddleware';

import rootReducer from 'redux/reducers';


const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(apiMiddleware),
);

export {store};
