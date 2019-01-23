import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators/main';

// Start with two routes: The Main screen, with the Login screen on top.
const initialAction = AppNavigator.router.getActionForPathAndParams('Login');
const initialState = AppNavigator.router.getStateForAction(initialAction);

export default navigationReducers = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};
