import * as actions from '../actions';
import getWeb3 from "../../getWeb3";
import CatanstitutionVotingRights from "../../contracts/CatanstitutionVotingRights.json";
import CatanKeeper from "../../contracts/CatanKeeper.json";
import FluidVoteTitleV1 from "../../contracts/FluidVoteTitleV1.json";
import {setup} from "../actions/web3";

const web3 = store => next => async action => {
  switch(action.type){
    case actions.CONNECT_TO_CHAIN:
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();

        const networkId = await web3.eth.getChainId();
        if(!(networkId in CatanstitutionVotingRights.networks)){
          console.info('Unsupported network', networkId);
          break;
        }

        const cvr = new web3.eth.Contract(
          CatanstitutionVotingRights.abi,
          CatanstitutionVotingRights.networks[networkId] && CatanstitutionVotingRights.networks[networkId].address,
        );

        const rulerOfCatan = new web3.eth.Contract(
          FluidVoteTitleV1.abi,
          await cvr.methods.rulerOfCatan().call()
        );

        const keeperOfTheCatanstitution = new web3.eth.Contract(
          FluidVoteTitleV1.abi,
          await cvr.methods.keeperOfTheCatanstitution().call()
        );

        const keeper = new web3.eth.Contract(
          CatanKeeper.abi,
          CatanKeeper.networks[networkId] && CatanKeeper.networks[networkId].address,
        );

        await store.dispatch(setup(web3, accounts, {cvr, keeper, rulerOfCatan, keeperOfTheCatanstitution}));
      } catch (e) {
        console.error(e);
      }
      break;
    default:
      break;
  }
  return next(action);
};

export default web3;
