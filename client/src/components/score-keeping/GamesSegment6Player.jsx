import React, {useEffect} from "react";
import {CardGroup, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import {getRecordedSixPlayerGames} from "../../store/actions/keeper";
import GameCard6Player from "./GameCard6Player";

const GamesSegment6Player = ({
  sixPlayerGames,
  getRecordedSixPlayerGames,
  playerFilter,
  playerFilterOption,
  variationFilter,
  hidden = false
}) => {

  useEffect(() => {
    getRecordedSixPlayerGames();
  }, []);

  if(hidden){
    return null;
  }

  const games = Object.values(sixPlayerGames);

  //Filter by players
  if(playerFilter.length === 0){sixPlayerGames = games}
  else if(playerFilter.length > 6 && playerFilterOption === 'hasAll'){sixPlayerGames = []}
  else {
    switch (playerFilterOption) {
      case 'hasAny':
        sixPlayerGames = games.filter(g => (
          playerFilter.includes(g.player_1) ||
          playerFilter.includes(g.player_2) ||
          playerFilter.includes(g.player_3) ||
          playerFilter.includes(g.player_4) ||
          playerFilter.includes(g.player_5) ||
          playerFilter.includes(g.player_6)
        ));
        break;
      case 'hasAll':
      default:
        if(playerFilter.length === 1){
          sixPlayerGames = games.filter(g => (
            playerFilter.includes(g.player_1) ||
            playerFilter.includes(g.player_2) ||
            playerFilter.includes(g.player_3) ||
            playerFilter.includes(g.player_4) ||
            playerFilter.includes(g.player_5) ||
            playerFilter.includes(g.player_6)
          ));
        } else if(playerFilter.length === 2){
          sixPlayerGames = games.filter(g => (
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_3)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_4)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_5)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_6)) ||
            (playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3)) ||
            (playerFilter.includes(g.player_2) && playerFilter.includes(g.player_4)) ||
            (playerFilter.includes(g.player_2) && playerFilter.includes(g.player_5)) ||
            (playerFilter.includes(g.player_2) && playerFilter.includes(g.player_6)) ||
            (playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4)) ||
            (playerFilter.includes(g.player_3) && playerFilter.includes(g.player_5)) ||
            (playerFilter.includes(g.player_3) && playerFilter.includes(g.player_6)) ||
            (playerFilter.includes(g.player_4) && playerFilter.includes(g.player_5)) ||
            (playerFilter.includes(g.player_4) && playerFilter.includes(g.player_6)) ||
            (playerFilter.includes(g.player_5) && playerFilter.includes(g.player_6))
          ));
        } else if(playerFilter.length === 3){
          sixPlayerGames = games.filter(g => (
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2) && playerFilter.includes(g.player_4)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2) && playerFilter.includes(g.player_5)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2) && playerFilter.includes(g.player_6)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_5)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_6)) ||
            (playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4)) ||
            (playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_5)) ||
            (playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_6)) ||
            (playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4) && playerFilter.includes(g.player_5)) ||
            (playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4) && playerFilter.includes(g.player_6)) ||
            (playerFilter.includes(g.player_4) && playerFilter.includes(g.player_5) && playerFilter.includes(g.player_6))
          ));
        } else if(playerFilter.length === 4){
          sixPlayerGames = games.filter(g => (
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_5)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_6)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2) && playerFilter.includes(g.player_4) && playerFilter.includes(g.player_5)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2) && playerFilter.includes(g.player_4) && playerFilter.includes(g.player_6)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4) && playerFilter.includes(g.player_5)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4) && playerFilter.includes(g.player_6)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_4) && playerFilter.includes(g.player_5) && playerFilter.includes(g.player_6)) ||
            (playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4) && playerFilter.includes(g.player_5)) ||
            (playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4) && playerFilter.includes(g.player_6)) ||
            (playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4) && playerFilter.includes(g.player_5) && playerFilter.includes(g.player_6))
          ));
        } else if(playerFilter.length === 5){
          sixPlayerGames = games.filter(g => (
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4) && playerFilter.includes(g.player_5)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4) && playerFilter.includes(g.player_6)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_5) && playerFilter.includes(g.player_6)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2) && playerFilter.includes(g.player_4) && playerFilter.includes(g.player_5) && playerFilter.includes(g.player_6)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4) && playerFilter.includes(g.player_5) && playerFilter.includes(g.player_6)) ||
            (playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4) && playerFilter.includes(g.player_5) && playerFilter.includes(g.player_6))
          ));
        } else {
          sixPlayerGames = games.filter(g => (
            playerFilter.includes(g.player_1) &&
            playerFilter.includes(g.player_2) &&
            playerFilter.includes(g.player_3) &&
            playerFilter.includes(g.player_4) &&
            playerFilter.includes(g.player_5) &&
            playerFilter.includes(g.player_6)
          ));
        }
        break;
    }
  }

  //Filter by game type
  if(variationFilter.length !== 0) {
    sixPlayerGames = sixPlayerGames.filter(g => (
      variationFilter.includes(g.variation)
    ));
  }

  return (
      <Segment>
        <CardGroup>
          {Object.keys(sixPlayerGames).length > 0 ? Object.values(sixPlayerGames).map(g => <GameCard6Player game={g}/>) : <span>No Games</span>}
        </CardGroup>
      </Segment>
  );
}

const actionCreators = {
  getRecordedSixPlayerGames
};

const mapStateToProps = state => ({
  sixPlayerGames: state.keeper.games.six,
  playerFilter: state.keeper.filters.players,
  playerFilterOption: state.keeper.filters.playerOptions,
  variationFilter: state.keeper.filters.variations,
})

export default connect(mapStateToProps, actionCreators)(GamesSegment6Player);
