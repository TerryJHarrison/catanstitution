import React, {useEffect} from "react";
import {CardGroup, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import {getRecordedFivePlayerGames} from "../../store/actions/keeper";
import GameCard5Player from "./GameCard5Player";

const GamesSegment5Player = ({
  fivePlayerGames,
  getRecordedFivePlayerGames,
  playerFilter,
  playerFilterOption,
  variationFilter,
  hidden = false
}) => {

  useEffect(() => {
    getRecordedFivePlayerGames();
  }, []);

  if(hidden){
    return null;
  }

  const games = Object.values(fivePlayerGames);

  //Filter by players
  if(playerFilter.length === 0){fivePlayerGames = games}
  else if(playerFilter.length > 5 && playerFilterOption === 'hasAll'){fivePlayerGames = []}
  else {
    switch (playerFilterOption) {
      case 'hasAny':
        fivePlayerGames = games.filter(g => (
          playerFilter.includes(g.player_1) ||
          playerFilter.includes(g.player_2) ||
          playerFilter.includes(g.player_3) ||
          playerFilter.includes(g.player_4) ||
          playerFilter.includes(g.player_5)
        ));
        break;
      case 'hasAll':
      default:
        if(playerFilter.length === 1){
          fivePlayerGames = games.filter(g => (
            playerFilter.includes(g.player_1) ||
            playerFilter.includes(g.player_2) ||
            playerFilter.includes(g.player_3) ||
            playerFilter.includes(g.player_4) ||
            playerFilter.includes(g.player_5)
          ));
        } else if(playerFilter.length === 2){
          fivePlayerGames = games.filter(g => (
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_3)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_4)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_5)) ||
            (playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3)) ||
            (playerFilter.includes(g.player_2) && playerFilter.includes(g.player_4)) ||
            (playerFilter.includes(g.player_2) && playerFilter.includes(g.player_5)) ||
            (playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4)) ||
            (playerFilter.includes(g.player_3) && playerFilter.includes(g.player_5)) ||
            (playerFilter.includes(g.player_4) && playerFilter.includes(g.player_5))
          ));
        } else if(playerFilter.length === 3){
          fivePlayerGames = games.filter(g => (
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2) && playerFilter.includes(g.player_4)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2) && playerFilter.includes(g.player_5)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_5)) ||
            (playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4)) ||
            (playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_5)) ||
            (playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4) && playerFilter.includes(g.player_5))
          ));
        } else if(playerFilter.length === 4){
          fivePlayerGames = games.filter(g => (
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_5)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2) && playerFilter.includes(g.player_4) && playerFilter.includes(g.player_5)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4) && playerFilter.includes(g.player_5))
          ));
        } else {
          fivePlayerGames = games.filter(g => (
            playerFilter.includes(g.player_1) &&
            playerFilter.includes(g.player_2) &&
            playerFilter.includes(g.player_3) &&
            playerFilter.includes(g.player_4) &&
            playerFilter.includes(g.player_5)
          ));
        }
        break;
    }
  }

  //Filter by game type
  if(variationFilter.length !== 0) {
    fivePlayerGames = fivePlayerGames.filter(g => (
      variationFilter.includes(g.variation)
    ));
  }

  return (
      <Segment>
        <CardGroup>
          {Object.keys(fivePlayerGames).length > 0 ? Object.values(fivePlayerGames).map(g => <GameCard5Player game={g}/>) : <span>No Games</span>}
        </CardGroup>
      </Segment>
  );
}

const actionCreators = {
  getRecordedFivePlayerGames
};

const mapStateToProps = state => ({
  fivePlayerGames: state.keeper.games.five,
  playerFilter: state.keeper.filters.players,
  playerFilterOption: state.keeper.filters.playerOptions,
  variationFilter: state.keeper.filters.variations,
})

export default connect(mapStateToProps, actionCreators)(GamesSegment5Player);
