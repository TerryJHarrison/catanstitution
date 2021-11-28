import {applyMiddleware} from 'redux';
import throttle from './throttle';
import web3 from './web3';
import catanstitution from './catanstitution';
import keeper from './keeper';
import names from './names';

export default applyMiddleware(...[throttle, web3, catanstitution, keeper, names]);
