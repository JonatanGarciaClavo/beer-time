import { ADD_GROUP, ADD_GROUPS } from '../constants/groups-actions-constants';

const initialState = [];

export default function users(state = initialState, action) {
  switch (action.type) {
    case ADD_GROUP:
      return [
        action.user,
        ...state
      ];
    case ADD_GROUPS:
    	return action.groups;
    default:
      return state
  }
}
