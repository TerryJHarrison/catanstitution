import * as actions from '../actions';

export const connectToChain = () => ({
  type: actions.CONNECT_TO_CHAIN
});

export const setup = (connection, accounts, contracts) => ({
  type: actions.SETUP,
  connection: connection,
  accounts: accounts,
  contracts: contracts
});
