import * as actions from '../actions';

function catanstitution(state = {}, action) {
  switch(action.type){
    case actions.SET_ROLES:
      return Object.assign({}, state, {
        roles: action.roles
      });
    case actions.SET_CATANSTITUTION:
      return Object.assign({}, state, {
        catanstitution: action.catanstitution
      });
    case actions.SET_BALANCE:
      return Object.assign({}, state, {
        cvrBalance: action.cvr,
        ckgBalance: action.ckg
      });
    case actions.SET_BALANCES:
      return Object.assign({}, state, {
        balances: action.balances
      });
    case actions.SET_CURRENT_PROPOSALS:
      return Object.assign({}, state, {
        proposals: action.proposals
      });
    case actions.SET_CURRENT_PROPOSALS_VOTES:
      return Object.assign({}, state, {
        votes: action.votes
      });
    case actions.SET_KEEPER_OF_THE_CATANSTITUTION_VOTES:
      return Object.assign({}, state, {
        keeperOfTheCatanstitutionVotes: action.votes
      });
    case actions.SET_RULER_OF_CATAN_VOTES:
      return Object.assign({}, state, {
        rulerOfCatanVotes: action.votes
      });
    case actions.SET_TROPHY_HOLDERS:
      return Object.assign({}, state, {
        RRoC: action.RRoC,
        PH: action.PH,
        JaS: action.JaS
      });
    default:
      return state;
  }
}

export default catanstitution;
