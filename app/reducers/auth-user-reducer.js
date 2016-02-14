import { SUCCESS_SIGN_IN, ERROR_SIGN_IN, SIGN_OUT } from '../constants/auth-user-actions-constants';

const initialState = {
  isSignedIn: false
};

export default function authUser(state = initialState, action) {
  switch (action.type) {

    case SUCCESS_SIGN_IN:
      let { name, email, photo } = action.user;
      return Object.assign({}, {isSignedIn: true, name, email, photo });
    case ERROR_SIGN_IN:
    case SIGN_OUT:
      return Object.assign({}, initialState);
    default:
      return state
  }
}
