import React, {useEffect} from "react";
import {CardGroup, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import {getRecordedFourPlayerGames} from "../../store/actions/keeper";
import GameCard4Player from "./GameCard4Player";

const GamesSegment4Player = ({
  fourPlayerGames,
  getRecordedFourPlayerGames,
  playerFilter,
  playerFilterOption,
  variationFilter,
  hidden = false
}) => {

  useEffect(() => {
    getRecordedFourPlayerGames();
  }, []);

  if(hidden){
    return null;
  }

  const games = Object.values(fourPlayerGames);

  //Filter by players
  if(playerFilter.length === 0){fourPlayerGames = games}
  else if(playerFilter.length > 4 && playerFilterOption === 'hasAll'){fourPlayerGames = []}
  else {
    switch (playerFilterOption) {
      case 'hasAny':
        fourPlayerGames = games.filter(g => (
          playerFilter.includes(g.player_1) ||
          playerFilter.includes(g.player_2) ||
          playerFilter.includes(g.player_3) ||
          playerFilter.includes(g.player_4)
        ));
        break;
      case 'hasAll':
      default:
        if(playerFilter.length === 1){
          fourPlayerGames = games.filter(g => (
            playerFilter.includes(g.player_1) ||
            playerFilter.includes(g.player_2) ||
            playerFilter.includes(g.player_3) ||
            playerFilter.includes(g.player_4)
          ));
        } else if(playerFilter.length === 2){
          fourPlayerGames = games.filter(g => (
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_3)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_4)) ||
            (playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3)) ||
            (playerFilter.includes(g.player_2) && playerFilter.includes(g.player_4)) ||
            (playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4))
          ));
        } else if(playerFilter.length === 3){
          fourPlayerGames = games.filter(g => (
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2) && playerFilter.includes(g.player_4)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4)) ||
            (playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3) && playerFilter.includes(g.player_4))
          ));
        } else {
          fourPlayerGames = games.filter(g => (
            playerFilter.includes(g.player_1) &&
            playerFilter.includes(g.player_2) &&
            playerFilter.includes(g.player_3) &&
            playerFilter.includes(g.player_4)
          ));
        }
        break;
    }
  }

  //Filter by game type
  if(variationFilter.length !== 0) {
    fourPlayerGames = fourPlayerGames.filter(g => (
      variationFilter.includes(g.variation)
    ));
  }

  return (
      <Segment>
        <CardGroup>
          {Object.keys(fourPlayerGames).length > 0 ? Object.values(fourPlayerGames).map(g => <GameCard4Player game={g}/>) : <span>No Games</span>}
        </CardGroup>
      </Segment>
  );
}

const actionCreators = {
  getRecordedFourPlayerGames
};

const mapStateToProps = state => ({
  fourPlayerGames: state.keeper.games.four,
  playerFilter: state.keeper.filters.players,
  playerFilterOption: state.keeper.filters.playerOptions,
  variationFilter: state.keeper.filters.variations,
})

export default connect(mapStateToProps, actionCreators)(GamesSegment4Player);
