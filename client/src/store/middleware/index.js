import {applyMiddleware} from 'redux';
import throttle from './throttle';
import web3 from './web3';
import cvr from './cvr';
import keeper from './keeper';

export default applyMiddleware(...[throttle, web3, cvr, keeper]);
