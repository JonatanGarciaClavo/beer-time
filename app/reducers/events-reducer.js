import { ADD_SOFT_BEER, ADD_BEER, ADD_SHOOT, ADD_COKTAIL, ORDER_BY_TOTAL } from '../constants/events-actions-constants';

const SOFT_BEER_AMOUNT = 0.8;
const BEER_AMOUNT = 1;
const SHOOT_AMOUNT = 1.5;
const COKTAIL_AMOUNT = 2;

const initialState = [];

export default function users(state = initialState, action) {
  switch (action.type) {

    case ADD_SOFT_BEER:
      return state.map(user =>
        user.email === action.email ?
          Object.assign({}, user, { total: user.total + SOFT_BEER_AMOUNT }) :
          user
      );

    case ADD_BEER:
      return state.map(user =>
        user.email === action.email ?
          Object.assign({}, user, { total: user.total + BEER_AMOUNT }) :
          user
      );

    case ADD_SHOOT:
      return state.map(user =>
        user.email === action.email ?
          Object.assign({}, user, { total: user.total + SHOOT_AMOUNT}) :
          user
      );
    case ADD_COKTAIL:
      return state.map(user =>
        user.email === action.email ?
          Object.assign({}, user, { total: user.total + COKTAIL_AMOUNT}) :
          user
      );

    case ORDER_BY_TOTAL:
      return state.sort((a, b)=> {
        if (a.total < b.total) {
          return 1;
        } else if(a.total > b.total) {
          return -1;
        }
        return 0;
      });
    default:
      return state
  }
}
