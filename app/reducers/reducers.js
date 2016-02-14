import { combineReducers } from 'redux';
import { users, authUser, groups, events } from './index';

const beerTimeApp = combineReducers({
  users,
  authUser,
  groups,
  events
});

export default beerTimeApp;