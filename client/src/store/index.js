import { createStore } from "redux";
import rootReducer from "./reducers";
import middleware from './middleware';

const initialState = {
  web3: {
    connection: null,
    accounts: [],
    contracts: {}
  },
  catanstitution: {
    balances: [],
    catanstitution: {
      amendments: [],
      numAmendments: 0
    },
    proposals: [],
    votes: {},
    keeperOfTheCatanstitutionVotes: {},
    rulerOfCatanVotes: {},
    roles: {
      rulerOfCatan: "",
      keeperOfTheCatanstitution: ""
    }
  },
  keeper: {
    games: {
      two: [],
      three: [],
      four: [],
      five: [],
      six: []
    },
    filters: {
      players: [],
      playerOptions: 'hasAll',
      variations: []
    }
  },
  names: {
    names: {},
    addresses: {}
  }
};

const store = createStore(rootReducer, initialState, middleware);

export default store;
