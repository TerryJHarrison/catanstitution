import React, {useEffect} from "react";
import {CardGroup, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import {
  getRecordedTwoPlayerGames
} from "../../store/actions/keeper";
import GameCard2Player from "../../components/score-keeping/GameCard2Player";

const GamesSegment2Player = ({
  twoPlayerGames,
  getRecordedTwoPlayerGames,
  playerFilter,
  playerFilterOption,
  variationFilter,
  hidden = false
}) => {

  useEffect(() => {
    getRecordedTwoPlayerGames();
  }, []);

  if(hidden){
    return null;
  }

  const games = Object.values(twoPlayerGames);

  //Filter by players
  if(playerFilter.length === 0){twoPlayerGames = games}
  else if(playerFilter.length > 2 && playerFilterOption === 'hasAll'){twoPlayerGames = []}
  else {
    switch (playerFilterOption) {
      case 'hasAny':
        twoPlayerGames = games.filter(g => (
          playerFilter.includes(g.player_1) || playerFilter.includes(g.player_2)
        ));
        break;
      case 'hasAll':
      default:
        if(playerFilter.length === 1){
          twoPlayerGames = games.filter(g => (
            playerFilter.includes(g.player_1) || playerFilter.includes(g.player_2)
          ));
        } else {
          twoPlayerGames = games.filter(g => (
            playerFilter.includes(g.player_1) && playerFilter.includes(g.player_2)
          ));
        }
        break;
    }
  }

  //Filter by game type
  if(variationFilter.length !== 0) {
    twoPlayerGames = twoPlayerGames.filter(g => (
      variationFilter.includes(g.variation)
    ));
  }

  return (
      <Segment>
        <CardGroup>
          {twoPlayerGames.length > 0 ? twoPlayerGames.map(g => <GameCard2Player game={g}/>) : <span>No Games</span>}
        </CardGroup>
      </Segment>
  );
}

const actionCreators = {
  getRecordedTwoPlayerGames
};

const mapStateToProps = state => ({
  twoPlayerGames: state.keeper.games.two,
  playerFilter: state.keeper.filters.players,
  playerFilterOption: state.keeper.filters.playerOptions,
  variationFilter: state.keeper.filters.variations,
})

export default connect(mapStateToProps, actionCreators)(GamesSegment2Player);
