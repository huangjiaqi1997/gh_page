import { combineReducers } from 'redux';
// import global from './global';
import play from './play';
import user from './user';

export default combineReducers({
  play,
  user
})