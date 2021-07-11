import * as actions from '../actions';

function web3(state = {}, action) {
  switch(action.type){
    case actions.SETUP:
      return Object.assign({}, state, {
        connection: action.connection,
        accounts: action.accounts,
        contracts: action.contracts
      });
    default:
      return state;
  }
}

export default web3;
