import * as actions from '../actions';
import {getUserNames, setUserNames} from "../actions/names";

const names = store => next => async action => {
  //Must be connected to network
  const {web3, catanstitution} = store.getState();
  const {connection, contracts, accounts} = web3;
  if(!connection){return next(action);}

  switch(action.type){
    case actions.GET_USER_NAMES:
      const userNames = {};
      const userAddresses = {};

      for (const voter of catanstitution.balances) {
        const voterName = await contracts.names.methods.names(voter.address).call();
        if(voterName) {
          userNames[voter.address] = voterName;
          userAddresses[voterName] = voter.address;
        }
      }
      store.dispatch(setUserNames(userNames, userAddresses));
      break;
    case actions.SET_USER_NAME:
      await contracts.names.methods.updateName(action.name).send({
        from: accounts[0],
        gasLimit: 500000
      });
      store.dispatch(getUserNames());
      break;
    default:
      break;
  }
  return next(action);
};

export default names;
