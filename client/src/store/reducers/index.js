import { combineReducers } from "redux";
import web3 from './web3';
import catanstitution from './catanstitution';
import keeper from './keeper';
import names from './names';

export default combineReducers({
  web3,
  catanstitution,
  keeper,
  names
});
