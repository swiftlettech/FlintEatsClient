import { combineReducers } from 'redux';
import eatsReducers from './eats';
import navigationReducers from './navigation';

export default combineReducers({
  eats: eatsReducers,
  nav: navigationReducers,
});
