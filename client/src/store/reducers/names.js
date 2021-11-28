import * as actions from '../actions';

function names(state = {}, action) {
  switch(action.type){
    case actions.SET_USER_NAMES:
      return Object.assign({}, state, {
        names: action.names,
        addresses: action.addresses
      });
    default:
      return state;
  }
}

export default names;
