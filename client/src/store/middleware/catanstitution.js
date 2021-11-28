import * as actions from '../actions';
import {
  getBalance,
  getBalances,
  getCatanstitution,
  getCurrentProposals,
  getCurrentProposalsVotes,
  getKeeperOfTheCatanstitutionVotes,
  getRoles,
  getRulerOfCatanVotes, getTrophyHolders,
  setBalance,
  setBalances,
  setCatanstitution,
  setCurrentProposals,
  setCurrentProposalsVotes,
  setKeeperOfTheCatanstitutionVotes,
  setRoles,
  setRulerOfCatanVotes, setTrophyHolders,
} from "../actions/catanstitution";
import {AMENDMENT_PROPOSED, CKG_TOKEN_ID, CVR_TOKEN_ID} from "../../constants";
import {formatBytes32String} from "ethers/lib/utils";

const catanstitution = store => next => async action => {
  const {web3} = store.getState();
  const {connection, accounts, contracts} = web3;
  if(!connection){return next(action);}

  switch(action.type){
    case actions.GET_ROLES:
      const rulerOfCatan = await (await contracts.rulerOfCatan.methods.holder.call()).call();
      const keeperOfTheCatanstitution = await (await contracts.keeperOfTheCatanstitution.methods.holder.call()).call();

      store.dispatch(setRoles({
        rulerOfCatan: rulerOfCatan,
        keeperOfTheCatanstitution: keeperOfTheCatanstitution
      }));
      break;
    case actions.GET_BALANCE: {
      const cvrBalance = await contracts.catanstitution.methods.balanceOf(accounts[0], CVR_TOKEN_ID).call();
      const ckgBalance = await contracts.catanstitution.methods.balanceOf(accounts[0], CKG_TOKEN_ID).call();
      store.dispatch(setBalance(cvrBalance, ckgBalance));
      break;
    }
    case actions.GET_BALANCES: {
      const numVoters = await contracts.voterPool.methods.numVoters().call();
      const balances = [];
      for (let i = 0; i < numVoters; i++) {
        const voter = await contracts.voterPool.methods.getVoter(i).call();
        const cvrBalance = await contracts.catanstitution.methods.balanceOf(voter, CVR_TOKEN_ID).call();
        const ckgBalance = await contracts.catanstitution.methods.balanceOf(voter, CKG_TOKEN_ID).call();
        balances.push({
          address: voter,
          cvr: cvrBalance,
          ckg: ckgBalance
        });
      }
      store.dispatch(setBalances(balances));
      break;
    }
    case actions.GET_CATANSTITUTION:
      const numAmendments = await contracts.constitution.methods.numAcceptedAmendments().call();
      const amendments = [];
      for (let i = 1; i <= numAmendments; i++) {
        amendments.push(await contracts.constitution.methods.amendments(i).call());
      }
      store.dispatch(setCatanstitution({
        amendments,
        numAmendments
      }));
      break;
    case actions.GET_CURRENT_PROPOSALS: {
      const {catanstitution} = store.getState();
      const currentProposals = [];
      for (const voter of catanstitution.balances) {
        const proposal = await contracts.constitution.methods.proposals(voter.address).call();
        if (proposal.status === AMENDMENT_PROPOSED) {
          currentProposals.push(proposal);
        }
      }
      store.dispatch(setCurrentProposals(currentProposals));
      break;
    }
    case actions.GET_CURRENT_PROPOSALS_VOTES: {
      const {catanstitution: {proposals, balances}} = store.getState();
      const votes = {};
      for (const proposal of proposals) {
        votes[proposal.amendmentNum] = {};
        for(const voter of balances){
          votes[proposal.amendmentNum][voter.address] = await contracts.constitution.methods.proposalVotes(voter.address, proposal.amendmentNum).call();
        }
      }
      store.dispatch(setCurrentProposalsVotes(votes));
      break;
    }
    case actions.REGISTER_TO_VOTE:
      await contracts.catanstitution.methods.registerForTrophies().send({
        from: accounts[0],
        gasLimit: 500000
      });
      await store.dispatch(getBalances());
      store.dispatch(getRoles());
      break;
    case actions.SEND_VOTER_TOKEN:
      await contracts.catanstitution.methods.safeTransferFrom(accounts[0], action.address, CVR_TOKEN_ID, 1, formatBytes32String("CVR")).send({
        from: accounts[0],
        gasLimit: 500000
      });
      break;
    case actions.MINT_TOKEN: {
      await contracts.catanstitution.methods.mintVoterToken(action.address, action.amount).send({
        from: accounts[0],
        gasLimit: 500000
      });
      //reload relevant data
      await store.dispatch(getBalances());
      store.dispatch(getRoles());
      store.dispatch(getKeeperOfTheCatanstitutionVotes());
      store.dispatch(getRulerOfCatanVotes());
      store.dispatch(getCurrentProposalsVotes());
      break;
    }
    case actions.BURN_TOKEN:
      await contracts.catanstitution.methods.burn(accounts[0], CVR_TOKEN_ID, action.amount).send({
        from: accounts[0],
        gasLimit: 500000
      });
      //reload relevant data
      await store.dispatch(getBalance());
      store.dispatch(getRoles());
      store.dispatch(getBalances());
      break;
    case actions.RESOLVE_AMENDMENT:
      await contracts.constitution.methods.resolveAmendment(action.author).send({
        from: accounts[0],
        gasLimit: 500000
      });
      //Reload relevant data
      store.dispatch(getCatanstitution());
      await store.dispatch(getCurrentProposals());
      store.dispatch(getCurrentProposalsVotes());
      break;
    case actions.PROPOSE_AMENDMENT:
      await contracts.constitution.methods.proposeAmendment(action.amendment).send({
        from: accounts[0],
        gasLimit: 500000
      });
      //Reload relevant data
      await store.dispatch(getCurrentProposals());
      store.dispatch(getCurrentProposalsVotes());
      break;
    case actions.VOTE_ON_PROPOSED_AMENDMENT:
      await contracts.constitution.methods.voteOnProposedAmendment(Boolean(action.vote), action.amendment).send({
        from: accounts[0],
        gasLimit: 500000
      });
      //Reload relevant data
      store.dispatch(getCurrentProposalsVotes());
      break;
    case actions.GET_KEEPER_OF_THE_CATANSTITUTION_VOTES: {
      const {catanstitution: {balances}} = store.getState();
      const votes = {};
      for(const voter of balances){
        votes[voter.address] = await contracts.keeperOfTheCatanstitution.methods.voteCounts(voter.address).call();
      }
      //Reload relevant data
      store.dispatch(setKeeperOfTheCatanstitutionVotes(votes));
      break;
    }
    case actions.SET_VOTE_FOR_KEEPER_OF_THE_CATANSTITUTION:
      await contracts.keeperOfTheCatanstitution.methods.voteOnTitle(action.address).send({
        from: accounts[0],
        gasLimit: 500000
      });
      //Reload relevant data
      store.dispatch(getKeeperOfTheCatanstitutionVotes());
      break;
    case actions.GET_RULER_OF_CATAN_VOTES: {
      const {catanstitution: {balances}} = store.getState();
      const votes = {};
      for(const voter of balances){
        votes[voter.address] = await contracts.rulerOfCatan.methods.voteCounts(voter.address).call();
      }
      //Reload relevant data
      store.dispatch(setRulerOfCatanVotes(votes));
      break;
    }
    case actions.SET_VOTE_FOR_RULER_OF_CATAN:
      await contracts.rulerOfCatan.methods.voteOnTitle(action.address).send({
        from: accounts[0],
        gasLimit: 500000
      });
      //Reload relevant data
      store.dispatch(getRulerOfCatanVotes());
      break;
    case actions.GET_TROPHY_HOLDERS:
      const RRoC = await contracts.catanstitution.methods.deFactoRRoC().call();
      const PH = await contracts.catanstitution.methods.deFactoPH().call();
      const JaS = await contracts.catanstitution.methods.deFactoJaS().call();
      store.dispatch(setTrophyHolders(RRoC, PH, JaS));
      break;
    case actions.UPDATE_TROPHIES:
      await contracts.catanstitution.methods.transferClaimableTrophies().send({
        from: accounts[0],
        gasLimit: 500000
      });
      store.dispatch(getTrophyHolders());
      break;
    default:
      break;
  }
  return next(action);
};

export default catanstitution;
