import { combineReducers } from "redux";
import web3 from './web3';
import cvr from './cvr';
import keeper from './keeper';

export default combineReducers({
  web3,
  cvr,
  keeper
});
