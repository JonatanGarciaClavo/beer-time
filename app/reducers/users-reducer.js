import { ADD_USER, UPDATE_USER } from '../constants/user-actions-constants';

const initialState = [];

export default function users(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return [
        action.user,
        ...state
      ];
    case UPDATE_USER:
      return state.map(user=>
        user.email === action.user.email ?
          Object.assign({}, user, {...action.user}) :
          user
        );
    default:
      return state
  }
}
