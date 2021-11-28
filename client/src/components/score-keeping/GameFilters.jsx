import React, {Fragment} from 'react';
import {Dropdown, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import {setGamePlayerFilters, setGamePlayerFiltersOptions, setGameVariationFilters} from "../../store/actions/keeper";
import {useControlledFormState} from "../../hooks/useControlledFormState";

const GameFilters = ({voters, names, playerFilter, variationFilter, playerFilterOptions, setGamePlayerFilters, setGameVariationFilters, setGamePlayerFiltersOptions, hidden = false}) => {

  const [selectedPlayers, handleSelectedPlayersChange] = useControlledFormState(playerFilter, setGamePlayerFilters);
  const [selectedVariations, handleSelectedVariationsChange] = useControlledFormState(variationFilter, setGameVariationFilters);
  const [selectedPlayerOptions, handleSelectedPlayerOptions] = useControlledFormState(playerFilterOptions, setGamePlayerFiltersOptions);

  if(hidden){
    return null;
  }

  const players = voters.map(voter => ({
    key: voter.address,
    text: names.hasOwnProperty(voter.address) ? names[voter.address] : voter.address,
    value: voter.address
  }));

  const variations = [
    {key: 'The Settlers of Catan', text: 'The Settlers of Catan', value: 'The Settlers of Catan'},
    {key: 'Seafarers', text: 'Seafarers', value: 'Seafarers'},
    {key: 'Cities & Knights', text: 'Cities & Knights', value: 'Cities & Knights'},
    {key: 'Cities & Knights + Seafarers', text: 'Cities & Knights + Seafarers', value: 'Cities & Knights + Seafarers'},
    {key: 'Traders & Barbarians', text: 'Traders & Barbarians', value: 'Traders & Barbarians'},
    {key: 'Explorers & Pirates', text: 'Explorers & Pirates', value: 'Explorers & Pirates'},
    {key: 'Oil Springs', text: 'Oil Springs', value: 'Oil Springs'},
    {key: 'Frenemies of Catan', text: 'Frenemies of Catan', value: 'Frenemies of Catan'},
    {key: 'Settlers of the Stone Age', text: 'Settlers of the Stone Age', value: 'Settlers of the Stone Age'},
    {key: 'Struggle for Rome', text: 'Struggle for Rome', value: 'Struggle for Rome'},
    {key: 'Settlers of America: Trails to Rails', text: 'Settlers of America: Trails to Rails', value: 'Settlers of America: Trails to Rails'},
    {key: 'Merchants of Europe', text: 'Merchants of Europe', value: 'Merchants of Europe'},
    {key: 'Rise of the Inkas', text: 'Rise of the Inkas', value: 'Rise of the Inkas'}
  ];

  const playerFilterChoices  = [
    {key: 'hasAll', text: 'All selected players', value: 'hasAll'},
    {key: 'hasAny', text: 'Has any player', value: 'hasAny'}
  ];

  return (
    <Segment basic>
      <Dropdown placeholder='Has Player' fluid selection options={playerFilterChoices} onChange={handleSelectedPlayerOptions} defaultValue="hasAll"/>
      <Dropdown placeholder='Players' fluid multiple selection options={players} onChange={handleSelectedPlayersChange}/>
      <Dropdown placeholder='Game Variations' fluid multiple selection options={variations} onChange={handleSelectedVariationsChange}/>
    </Segment>
  );
};

const actionCreators = {
  setGamePlayerFilters,
  setGameVariationFilters,
  setGamePlayerFiltersOptions
}

const mapStateToProps = state => ({
  playerFilter: state.keeper.filters.players,
  playerFilterOptions: state.keeper.filters.playerOptions,
  variationFilter: state.keeper.filters.variations,
  voters: state.catanstitution.balances,
  names: state.names.names
});

export default connect(mapStateToProps, actionCreators)(GameFilters);
