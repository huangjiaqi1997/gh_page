import {createStore, applyMiddleware} from 'redux';
import reducer from './Picker/reducer';
import {createLogger} from 'redux-logger';


const loggerMiddleware = createLogger();

const initialState = {
  rgb: [0, 0, 0],
  hsl: [0, 1, 0],
  hex: '#000000'
}
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(loggerMiddleware)
)
export {store};