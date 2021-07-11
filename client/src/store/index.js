import { createStore } from "redux";
import rootReducer from "./reducers";
import middleware from './middleware';

const initialState = {
  web3: {
    connection: null,
    accounts: [],
    contracts: {}
  },
  cvr: {
    balances: [],
    ckg: 0,
    catanstitution: {
      amendments: [],
      numAmendments: 0
    },
    proposals: [],
    votes: {},
    keeperOfTheCatanstitutionVotes: {},
    rulerOfCatanVotes: {},
    roles: {
      RULER_OF_CATAN: false,
      KEEPER_OF_THE_CATANSTITUTION: false,
      SETTLER: false
    }
  },
  keeper: {
    games: {
      two: [],
      three: [],
      four: [],
      five: [],
      six: []
    }
  }
};

const store = createStore(rootReducer, initialState, middleware);

export default store;
