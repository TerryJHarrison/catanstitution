const throttled = {};

const throttle = store => next => action => {
  const time = action.meta && action.meta.throttle;
  if (!time) {
    return next(action);
  }

  if(throttled[action.type]){
    // eslint-disable-next-line consistent-return
    return next({type: ''});
  }

  throttled[action.type] = true;
  setTimeout(() => {throttled[action.type] = false}, time);

  return next(action);
};

export default throttle;
