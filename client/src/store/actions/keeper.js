import * as actions from '../actions';

export const getRecordedTwoPlayerGames = () => ({
  type: actions.GET_RECORDED_TWO_PLAYER_GAMES,
  meta: {
    throttle: 3000
  }
});

export const getRecordedThreePlayerGames = () => ({
  type: actions.GET_RECORDED_THREE_PLAYER_GAMES,
  meta: {
    throttle: 3000
  }
});

export const getRecordedFourPlayerGames = () => ({
  type: actions.GET_RECORDED_FOUR_PLAYER_GAMES,
  meta: {
    throttle: 3000
  }
});

export const getRecordedFivePlayerGames = () => ({
  type: actions.GET_RECORDED_FIVE_PLAYER_GAMES,
  meta: {
    throttle: 3000
  }
});

export const getRecordedSixPlayerGames = () => ({
  type: actions.GET_RECORDED_SIX_PLAYER_GAMES,
  meta: {
    throttle: 3000
  }
});

export const addRecordedTwoPlayerGame = (index, game) => ({
  type: actions.ADD_RECORDED_TWO_PLAYER_GAME,
  index: index,
  game: game
});

export const addRecordedThreePlayerGame = (index, game) => ({
  type: actions.ADD_RECORDED_THREE_PLAYER_GAME,
  index: index,
  game: game
});

export const addRecordedFourPlayerGame = (index, game) => ({
  type: actions.ADD_RECORDED_FOUR_PLAYER_GAME,
  index: index,
  game: game
});

export const addRecordedFivePlayerGame = (index, game) => ({
  type: actions.ADD_RECORDED_FIVE_PLAYER_GAME,
  index: index,
  game: game
});

export const addRecordedSixPlayerGame = (index, game) => ({
  type: actions.ADD_RECORDED_SIX_PLAYER_GAME,
  index: index,
  game: game
});

export const recordTwoPlayerGame = game => ({
  type: actions.RECORD_TWO_PLAYER_GAME,
  game: game
});

export const recordThreePlayerGame = game => ({
  type: actions.RECORD_THREE_PLAYER_GAME,
  game: game
});

export const recordFourPlayerGame = game => ({
  type: actions.RECORD_FOUR_PLAYER_GAME,
  game: game
});

export const recordFivePlayerGame = game => ({
  type: actions.RECORD_FIVE_PLAYER_GAME,
  game: game
});

export const recordSixPlayerGame = game => ({
  type: actions.RECORD_SIX_PLAYER_GAME,
  game: game
});

export const setGamePlayerFilters = players => ({
  type: actions.SET_GAME_PLAYER_FILTERS,
  players: players
});

export const setGameVariationFilters = variations => ({
  type: actions.SET_GAME_VARIATION_FILTERS,
  variations: variations
});

export const setGamePlayerFiltersOptions = options => ({
  type: actions.SET_GAME_PLAYER_FILTERS_OPTIONS,
  options: options
});
