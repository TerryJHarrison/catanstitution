import React, {useEffect} from "react";
import {CardGroup, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import {getRecordedThreePlayerGames} from "../../store/actions/keeper";
import GameCard3Player from "./GameCard3Player";

const GamesSegment3Player = ({
  threePlayerGames,
  getRecordedThreePlayerGames,
  playerFilter,
  playerFilterOption,
  variationFilter,
  hidden = false
}) => {

  useEffect(() => {
    getRecordedThreePlayerGames();
  }, []);

  if(hidden){
    return null;
  }

  const games = Object.values(threePlayerGames);

  //Filter by players
  if(playerFilter.length === 0){threePlayerGames = games}
  else if(playerFilter.length > 3 && playerFilterOption === 'hasAll'){threePlayerGames = []}
  else {
    switch (playerFilterOption) {
      case 'hasAny':
        threePlayerGames = games.filter(g => (
          playerFilter.includes(g.player_1) || playerFilter.includes(g.player_2) || playerFilter.includes(g.player_3)
        ));
        break;
      case 'hasAll':
      default:
        if(playerFilter.length === 1){
          threePlayerGames = games.filter(g => (
            playerFilter.includes(g.player_1) || playerFilter.includes(g.player_2) || playerFilter.includes(g.player_3)
          ));
        } else if(playerFilter.length === 2){
          threePlayerGames = games.filter(g => (
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2)) ||
            (playerFilter.includes(g.player_1) && playerFilter.includes(g.player_3)) ||
            (playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3))
          ));
        } else {
          threePlayerGames = games.filter(g => (
            playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2) && playerFilter.includes(g.player_3)
          ));
        }
        break;
    }
  }

  //Filter by game type
  if(variationFilter.length !== 0) {
    threePlayerGames = threePlayerGames.filter(g => (
      variationFilter.includes(g.variation)
    ));
  }

  return (
      <Segment>
        <CardGroup>
          {Object.keys(threePlayerGames).length > 0 ? Object.values(threePlayerGames).map(g => <GameCard3Player game={g}/>) : <span>No Games</span>}
        </CardGroup>
      </Segment>
  );
}

const actionCreators = {
  getRecordedThreePlayerGames
};

const mapStateToProps = state => ({
  threePlayerGames: state.keeper.games.three,
  playerFilter: state.keeper.filters.players,
  playerFilterOption: state.keeper.filters.playerOptions,
  variationFilter: state.keeper.filters.variations,
})

export default connect(mapStateToProps, actionCreators)(GamesSegment3Player);
