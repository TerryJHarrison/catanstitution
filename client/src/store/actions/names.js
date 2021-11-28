import * as actions from '../actions';

export const getUserNames = () => ({
  type: actions.GET_USER_NAMES,
  meta: {
    throttle: 1000
  }
});

export const setUserNames = (names, addresses) => ({
  type: actions.SET_USER_NAMES,
  names: names,
  addresses: addresses
});

export const setUserName = name => ({
  type: actions.SET_USER_NAME,
  name: name
});
