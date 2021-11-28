import * as actions from '../actions';
import {
  addRecordedTwoPlayerGame,
  addRecordedThreePlayerGame,
  addRecordedFourPlayerGame,
  addRecordedFivePlayerGame,
  addRecordedSixPlayerGame,
  getRecordedTwoPlayerGames,
  getRecordedSixPlayerGames,
  getRecordedFivePlayerGames,
  getRecordedFourPlayerGames,
  getRecordedThreePlayerGames
} from "../actions/keeper";

const keeper = store => next => async action => {
  //Must be connected to network
  const {web3, keeper} = store.getState();
  const {connection, contracts, accounts} = web3;
  if(!connection){return next(action);}

  switch(action.type){
    case actions.GET_RECORDED_TWO_PLAYER_GAMES:
      const twoPlayerGameId = await contracts.keeper.methods.twoPlayerGameId().call();
      if(twoPlayerGameId !== 0 && Object.keys(keeper.games.two).length !== twoPlayerGameId){
        for(let i = Object.keys(keeper.games.two).length; i < twoPlayerGameId; i++){
          const game = await contracts.keeper.methods.recordedTwoPlayerGames(i).call();
          store.dispatch(addRecordedTwoPlayerGame(i, game));
        }
      }
      break;
    case actions.GET_RECORDED_THREE_PLAYER_GAMES:
      const threePlayerGameId = await contracts.keeper.methods.threePlayerGameId().call();
      if(threePlayerGameId !== 0 && Object.keys(keeper.games.three).length !== threePlayerGameId){
        for(let i = Object.keys(keeper.games.three).length; i < threePlayerGameId; i++){
          const game = await contracts.keeper.methods.recordedThreePlayerGames(i).call();
          store.dispatch(addRecordedThreePlayerGame(i, game));
        }
      }
      break;
    case actions.GET_RECORDED_FOUR_PLAYER_GAMES:
      const fourPlayerGameId = await contracts.keeper.methods.fourPlayerGameId().call();
      if(fourPlayerGameId !== 0 && Object.keys(keeper.games.four).length !== fourPlayerGameId){
        for(let i = Object.keys(keeper.games.four).length; i < fourPlayerGameId; i++){
          const game = await contracts.keeper.methods.recordedFourPlayerGames(i).call();
          store.dispatch(addRecordedFourPlayerGame(i, game));
        }
      }
      break;
    case actions.GET_RECORDED_FIVE_PLAYER_GAMES:
      const fivePlayerGameId = await contracts.keeper.methods.fivePlayerGameId().call();
      if(fivePlayerGameId !== 0 && Object.keys(keeper.games.five).length !== fivePlayerGameId){
        for(let i = Object.keys(keeper.games.five).length; i < fivePlayerGameId; i++){
          const game = await contracts.keeper.methods.recordedFivePlayerGames(i).call();
          store.dispatch(addRecordedFivePlayerGame(i, game));
        }
      }
      break;
    case actions.GET_RECORDED_SIX_PLAYER_GAMES:
      const sixPlayerGameId = await contracts.keeper.methods.sixPlayerGameId().call();
      if(sixPlayerGameId !== 0 && Object.keys(keeper.games.six).length !== sixPlayerGameId){
        for(let i = Object.keys(keeper.games.six).length; i < sixPlayerGameId; i++){
          const game = await contracts.keeper.methods.recordedSixPlayerGames(i).call();
          store.dispatch(addRecordedSixPlayerGame(i, game));
        }
      }
      break;
    case actions.RECORD_TWO_PLAYER_GAME:
      await contracts.keeper.methods.recordTwoPlayerGame({
        player_1: action.game.p1,
        player_2: action.game.p2,
        player_1_vp: action.game.p1Vp,
        player_2_vp: action.game.p2Vp,
        variation: action.game.variation
      }).send({
        from: accounts[0],
        gasLimit: 500000
      });
      //Reload relevant data
      store.dispatch(getRecordedTwoPlayerGames());
      break;
    case actions.RECORD_THREE_PLAYER_GAME:
      await contracts.keeper.methods.recordThreePlayerGame({
        player_1: action.game.p1,
        player_2: action.game.p2,
        player_3: action.game.p3,
        player_1_vp: action.game.p1Vp,
        player_2_vp: action.game.p2Vp,
        player_3_vp: action.game.p3Vp,
        variation: action.game.variation
      }).send({
        from: accounts[0],
        gasLimit: 500000
      });
      //Reload relevant data
      store.dispatch(getRecordedThreePlayerGames());
      break;
    case actions.RECORD_FOUR_PLAYER_GAME:
      await contracts.keeper.methods.recordFourPlayerGame({
        player_1: action.game.p1,
        player_2: action.game.p2,
        player_3: action.game.p3,
        player_4: action.game.p4,
        player_1_vp: action.game.p1Vp,
        player_2_vp: action.game.p2Vp,
        player_3_vp: action.game.p3Vp,
        player_4_vp: action.game.p4Vp,
        variation: action.game.variation
      }).send({
        from: accounts[0],
        gasLimit: 500000
      });
      //Reload relevant data
      store.dispatch(getRecordedFourPlayerGames());
      break;
    case actions.RECORD_FIVE_PLAYER_GAME:
      await contracts.keeper.methods.recordFivePlayerGame({
        player_1: action.game.p1,
        player_2: action.game.p2,
        player_3: action.game.p3,
        player_4: action.game.p4,
        player_5: action.game.p5,
        player_1_vp: action.game.p1Vp,
        player_2_vp: action.game.p2Vp,
        player_3_vp: action.game.p3Vp,
        player_4_vp: action.game.p4Vp,
        player_5_vp: action.game.p5Vp,
        variation: action.game.variation
      }).send({
        from: accounts[0],
        gasLimit: 500000
      });
      //Reload relevant data
      store.dispatch(getRecordedFivePlayerGames());
      break;
    case actions.RECORD_SIX_PLAYER_GAME:
      await contracts.keeper.methods.recordSixPlayerGame({
        player_1: action.game.p1,
        player_2: action.game.p2,
        player_3: action.game.p3,
        player_4: action.game.p4,
        player_5: action.game.p5,
        player_6: action.game.p6,
        player_1_vp: action.game.p1Vp,
        player_2_vp: action.game.p2Vp,
        player_3_vp: action.game.p3Vp,
        player_4_vp: action.game.p4Vp,
        player_5_vp: action.game.p5Vp,
        player_6_vp: action.game.p6Vp,
        variation: action.game.variation
      }).send({
        from: accounts[0],
        gasLimit: 500000
      });
      //Reload relevant data
      store.dispatch(getRecordedSixPlayerGames());
      break;
    default:
      break;
  }
  return next(action);
};

export default keeper;
