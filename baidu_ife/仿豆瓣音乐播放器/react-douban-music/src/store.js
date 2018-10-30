import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer/rootReducer';
import thunk from 'redux-thunk';


const win = window;

const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(thunk);
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f
);


export default createStore(rootReducer, storeEnhancers); 