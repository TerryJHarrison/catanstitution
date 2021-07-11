import * as actions from '../actions';

function keeper(state = {}, action) {
  const getWinner = (numPlayers, game) => {
    let winner, winnerScore;

    if(parseInt(game.player_1_vp) > parseInt(game.player_2_vp)){
      winner = game.player_1;
      winnerScore = game.player_1_vp;
    } else {
      winner = game.player_2;
      winnerScore = game.player_2_vp;
    }

    if(numPlayers > 2) {
      if(parseInt(game.player_3_vp) > winnerScore){
        winner = game.player_3;
        winnerScore = game.player_3_vp;
      }
    }

    if(numPlayers > 3) {
      if(parseInt(game.player_4_vp) > winnerScore){
        winner = game.player_4;
        winnerScore = game.player_4_vp;
      }
    }

    if(numPlayers > 4) {
      if(parseInt(game.player_5_vp) > winnerScore){
        winner = game.player_5;
        winnerScore = game.player_5_vp;
      }
    }

    if(numPlayers > 5) {
      if(parseInt(game.player_6_vp) > winnerScore){
        winner = game.player_6;
      }
    }

    return winner;
  }

  switch(action.type){
    case actions.ADD_RECORDED_TWO_PLAYER_GAME:
      return Object.assign({}, state, {
        games: Object.assign({}, state.games, {
          two: Object.assign({}, state.games.two, {
            [action.index]: Object.assign({}, action.game, {
              winner: getWinner(2, action.game)
            })
          })
        })
      });
    case actions.ADD_RECORDED_THREE_PLAYER_GAME:
      return Object.assign({}, state, {
        games: Object.assign({}, state.games, {
          three: Object.assign({}, state.games.three, {
            [action.index]: Object.assign({}, action.game, {
              winner: getWinner(3, action.game)
            })
          })
        })
      });
    case actions.ADD_RECORDED_FOUR_PLAYER_GAME:
      return Object.assign({}, state, {
        games: Object.assign({}, state.games, {
          four: Object.assign({}, state.games.four, {
            [action.index]: Object.assign({}, action.game, {
              winner: getWinner(4, action.game)
            })
          })
        })
      });
    case actions.ADD_RECORDED_FIVE_PLAYER_GAME:
      return Object.assign({}, state, {
        games: Object.assign({}, state.games, {
          five: Object.assign({}, state.games.five, {
            [action.index]: Object.assign({}, action.game, {
              winner: getWinner(5, action.game)
            })
          })
        })
      });
    case actions.ADD_RECORDED_SIX_PLAYER_GAME:
      return Object.assign({}, state, {
        games: Object.assign({}, state.games, {
          six: Object.assign({}, state.games.six, {
            [action.index]: Object.assign({}, action.game, {
              winner: getWinner(6, action.game)
            })
          })
        })
      });
    default:
      return state;
  }
}

export default keeper;
