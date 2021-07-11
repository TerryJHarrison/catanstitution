import * as actions from '../actions';
import {
  getBalance,
  getBalances,
  getCatanstitution,
  getCurrentProposals,
  getCurrentProposalsVotes,
  getKeeperOfTheCatanstitutionVotes,
  getRoles,
  getRulerOfCatanVotes,
  setBalance,
  setBalances,
  setCatanstitution,
  setCurrentProposals,
  setCurrentProposalsVotes,
  setKeeperOfTheCatanstitutionVotes,
  setRoles,
  setRulerOfCatanVotes,
} from "../actions/cvr";

const cvr = store => next => async action => {
  const {web3} = store.getState();
  const {connection, accounts, contracts} = web3;
  if(!connection){return next(action);}

  switch(action.type){
    case actions.GET_ROLES:
      const rulerOfCatan = await (await contracts.rulerOfCatan.methods.holder.call()).call();
      const keeperOfTheCatanstitution = await (await contracts.keeperOfTheCatanstitution.methods.holder.call()).call();

      const cvrBalance = await contracts.cvr.methods.balanceOf(accounts[0]).call();
      const decimals = await contracts.cvr.methods.decimals().call();
      store.dispatch(setBalance(cvrBalance / 10 ** decimals));

      store.dispatch(setRoles({
        RULER_OF_CATAN: accounts[0] === rulerOfCatan,
        KEEPER_OF_THE_CATANSTITUTION: accounts[0] === keeperOfTheCatanstitution,
        SETTLER: cvrBalance > 0, //TODO: check if balance over threshold? / use balance already pulled
        ANY: accounts[0] === rulerOfCatan || accounts[0] === keeperOfTheCatanstitution || cvrBalance > 0
      }))
      break;
    case actions.GET_BALANCE: {
      const amount = await contracts.cvr.methods.balanceOf(accounts[0]).call();
      const decimals = await contracts.cvr.methods.decimals().call();
      store.dispatch(setBalance(amount / 10 ** decimals));
      break;
    }
    case actions.GET_BALANCES: {
      const numVoters = await contracts.cvr.methods.numVoters().call();
      const decimals = await contracts.cvr.methods.decimals().call();
      const balances = [];
      for (let i = 0; i < numVoters; i++) {
        const voter = await contracts.cvr.methods.voterRegistrations(i).call();
        const amount = await contracts.cvr.methods.balanceOf(voter).call();
        balances.push({
          address: voter,
          balance: amount / 10 ** decimals
        });
      }
      store.dispatch(setBalances(balances))
      break;
    }
    case actions.GET_CATANSTITUTION:
      const numAmendments = await contracts.cvr.methods.numAcceptedAmendments().call();
      const amendments = [];
      for (let i = 1; i <= numAmendments; i++) {
        amendments.push(await contracts.cvr.methods.catanstitution(i).call());
      }
      store.dispatch(setCatanstitution({
        amendments,
        numAmendments
      }));
      break;
    case actions.GET_CURRENT_PROPOSALS: {
      const {cvr} = store.getState();
      const currentProposals = [];
      for (const voter of cvr.balances) {
        const proposal = await contracts.cvr.methods.proposals(voter.address).call();
        if (proposal.status === "2") {//TODO map enums from contract
          currentProposals.push(proposal);
        }
      }
      store.dispatch(setCurrentProposals(currentProposals));
      break;
    }
    case actions.GET_CURRENT_PROPOSALS_VOTES: {
      const {cvr: {proposals, balances}} = store.getState();
      const votes = {};
      for (const proposal of proposals) {
        votes[proposal.amendmentNum] = {};
        for(const voter of balances){
          votes[proposal.amendmentNum][voter.address] = await contracts.cvr.methods.proposalVotes(voter.address, proposal.amendmentNum).call();
        }
      }
      store.dispatch(setCurrentProposalsVotes(votes));
      break;
    }
    case actions.MINT_TOKEN: {
      await contracts.cvr.methods.mint(action.address, connection.utils.toWei(action.amount, 'ether')).send({
        from: accounts[0],
        gasLimit: 500000
      });
      //reload relevant data
      if(action.address === accounts[0]){
        //only if minting to self
        await store.dispatch(getBalance());
        store.dispatch(getRoles());
      }
      await store.dispatch(getBalances());
      store.dispatch(getKeeperOfTheCatanstitutionVotes());
      store.dispatch(getRulerOfCatanVotes());
      store.dispatch(getCurrentProposalsVotes());
      break;
    }
    case actions.BURN_TOKEN:
      await contracts.cvr.methods.burn(connection.utils.toWei(action.amount,'ether')).send({
        from: accounts[0],
        gasLimit: 500000
      });
      //reload relevant data
      await store.dispatch(getBalance());
      store.dispatch(getRoles());
      store.dispatch(getBalances());
      break;
    case actions.RESOLVE_AMENDMENT:
      await contracts.cvr.methods.resolveAmendment(action.amendmentNum).send({
        from: accounts[0],
        gasLimit: 500000
      });
      //Reload relevant data
      store.dispatch(getCatanstitution());
      await store.dispatch(getCurrentProposals());
      store.dispatch(getCurrentProposalsVotes());
      break;
    case actions.PROPOSE_AMENDMENT:
      await contracts.cvr.methods.proposeAmendment(action.amendment).send({
        from: accounts[0],
        gasLimit: 500000
      });
      //Reload relevant data
      await store.dispatch(getCurrentProposals());
      store.dispatch(getCurrentProposalsVotes());
      break;
    case actions.VOTE_ON_PROPOSED_AMENDMENT:
      await contracts.cvr.methods.voteOnProposedAmendment(Boolean(action.vote), action.amendment).send({
        from: accounts[0],
        gasLimit: 500000
      });
      //Reload relevant data
      store.dispatch(getCurrentProposalsVotes());
      break;
    case actions.GET_KEEPER_OF_THE_CATANSTITUTION_VOTES: {
      const {cvr: {balances}} = store.getState();
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
      const {cvr: {balances}} = store.getState();
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
    default:
      break;
  }
  return next(action);
};

export default cvr;
