import * as actions from '../actions';

export const getRoles = () => ({
  type: actions.GET_ROLES
});

export const setRoles = roles => ({
  type: actions.SET_ROLES,
  roles: roles
});

export const getCatanstitution = () => ({
  type: actions.GET_CATANSTITUTION
});

export const setCatanstitution = catanstitution => ({
  type: actions.SET_CATANSTITUTION,
  catanstitution: catanstitution
});

export const getCurrentProposals = () => ({
  type: actions.GET_CURRENT_PROPOSALS
});

export const setCurrentProposals = proposals => ({
  type: actions.SET_CURRENT_PROPOSALS,
  proposals: proposals
});

export const getCurrentProposalsVotes = () => ({
  type: actions.GET_CURRENT_PROPOSALS_VOTES
})

export const setCurrentProposalsVotes = votes => ({
  type: actions.SET_CURRENT_PROPOSALS_VOTES,
  votes: votes
});

export const mintToken = (address, amount) => ({
  type: actions.MINT_TOKEN,
  address: address,
  amount: amount,
  meta: {
    throttle: 500
  }
});

export const burnToken = amount => ({
  type: actions.BURN_TOKEN,
  amount: amount,
  meta: {
    throttle: 500
  }
});

export const resolveAmendment = amendmentNum => ({
  type: actions.RESOLVE_AMENDMENT,
  amendmentNum: amendmentNum,
  meta: {
    throttle: 500
  }
});

export const proposeAmendment = amendment => ({
  type: actions.PROPOSE_AMENDMENT,
  amendment: amendment,
  meta: {
    throttle: 500
  }
});

export const voteOnProposedAmendment = (vote, amendment) => ({
  type: actions.VOTE_ON_PROPOSED_AMENDMENT,
  vote: vote,
  amendment: amendment,
  meta: {
    throttle: 500
  }
});

export const getBalance = () => ({
  type: actions.GET_BALANCE
});

export const setBalance = amount => ({
  type: actions.SET_BALANCE,
  amount: amount
});

export const getBalances = () => ({
  type: actions.GET_BALANCES
});

export const setBalances = balances => ({
  type: actions.SET_BALANCES,
  balances: balances
});

export const getKeeperOfTheCatanstitutionVotes = () => ({
  type: actions.GET_KEEPER_OF_THE_CATANSTITUTION_VOTES
});

export const setKeeperOfTheCatanstitutionVotes = votes => ({
  type: actions.SET_KEEPER_OF_THE_CATANSTITUTION_VOTES,
  votes: votes
});

export const setVoteForKeeperOfTheCatanstitution = address => ({
  type: actions.SET_VOTE_FOR_KEEPER_OF_THE_CATANSTITUTION,
  address: address
});

export const getRulerOfCatanVotes = () => ({
  type: actions.GET_RULER_OF_CATAN_VOTES
});

export const setRulerOfCatanVotes = votes => ({
  type: actions.SET_RULER_OF_CATAN_VOTES,
  votes: votes
});

export const setVoteForRulerOfCatan = address => ({
  type: actions.SET_VOTE_FOR_RULER_OF_CATAN,
  address: address
});
