import * as actions from '../actions';
import getWeb3 from "../../getWeb3";
import Catanstitution from "../../contracts/Catanstitution.json";
import CatanKeeper from "../../contracts/CatanKeeper.json";
import FluidVoteTitle from "../../contracts/FluidVoteTitle.json";
import Constitution from "../../contracts/Constitution.json";
import VoterPool from "../../contracts/VoterPool.json";
import UserNameRegistry from "../../contracts/UserNameRegistry.json";
import {setup} from "../actions/web3";

const web3 = store => next => async action => {
  switch(action.type){
    case actions.CONNECT_TO_CHAIN:
      try {
        const [web3, modal] = await getWeb3();
        const accounts = await web3.eth.getAccounts();

        const networkId = await web3.eth.getChainId();
        if(!(networkId in Catanstitution.networks)){
          console.info('Unsupported network', networkId);
          break;
        }

        const catanstitution = new web3.eth.Contract(
            Catanstitution.abi,
            Catanstitution.networks[networkId] && Catanstitution.networks[networkId].address,
        );

        const rulerOfCatan = new web3.eth.Contract(
          FluidVoteTitle.abi,
          await catanstitution.methods.rulerOfCatan().call()
        );

        const keeperOfTheCatanstitution = new web3.eth.Contract(
          FluidVoteTitle.abi,
          await catanstitution.methods.keeperOfTheCatanstitution().call()
        );

        const constitution = new web3.eth.Contract(
            Constitution.abi,
            await catanstitution.methods.constitution().call()
        );

        const voterPool = new web3.eth.Contract(
            VoterPool.abi,
            await catanstitution.methods.cvrHolders().call()
        );

        const keeper = new web3.eth.Contract(
          CatanKeeper.abi,
          await catanstitution.methods.catanKeeper().call()
        );

        const names = new web3.eth.Contract(
            UserNameRegistry.abi,
            await catanstitution.methods.userNames().call()
        );

        await store.dispatch(setup(web3, accounts, {
          catanstitution,
          keeper,
          rulerOfCatan,
          keeperOfTheCatanstitution,
          constitution,
          voterPool,
          names,
          modal
        }));
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
