import React, {useEffect, useState} from "react";
import {Button, Header, Icon, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import {
  getRecordedTwoPlayerGames,
  getRecordedThreePlayerGames,
  getRecordedFourPlayerGames,
  getRecordedFivePlayerGames,
  getRecordedSixPlayerGames
} from "../store/actions/keeper";
import {useFormState} from "../hooks/useFormState";
import Record2PlayerGameModal from "../components/score-keeping/Record2PlayerGameModal";
import Record3PlayerGameModal from "../components/score-keeping/Record3PlayerGameModal";
import Record4PlayerGameModal from "../components/score-keeping/Record4PlayerGameModal";
import Record5PlayerGameModal from "../components/score-keeping/Record5PlayerGameModal";
import Record6PlayerGameModal from "../components/score-keeping/Record6PlayerGameModal";
import GameFilters from "../components/score-keeping/GameFilters";
import {getBalances} from "../store/actions/catanstitution";
import {getUserNames} from "../store/actions/names";
import GamesSegment2Player from "../components/score-keeping/GamesSegment2Player";
import GamesSegment3Player from "../components/score-keeping/GamesSegment3Player";
import GamesSegment4Player from "../components/score-keeping/GamesSegment4Player";
import GamesSegment5Player from "../components/score-keeping/GamesSegment5Player";
import GamesSegment6Player from "../components/score-keeping/GamesSegment6Player";

const CatanKeeper = ({
  getRecordedTwoPlayerGames,
  getRecordedThreePlayerGames,
  getRecordedFourPlayerGames,
  getRecordedFivePlayerGames,
  getRecordedSixPlayerGames,
  getBalances,
  getUserNames
}) => {

  useEffect(() => {
    getBalances().then(() => {
      getUserNames();
    });
  }, []);

  const toggleHiddenIconStates = {
    true: "caret up",
    false: "caret down"
  }

  const [p1, handleP1Change] = useFormState('');
  const [p2, handleP2Change] = useFormState('');
  const [p3, handleP3Change] = useFormState('');
  const [p4, handleP4Change] = useFormState('');
  const [p5, handleP5Change] = useFormState('');
  const [p6, handleP6Change] = useFormState('');
  const [p1Vp, handleP1VpChange] = useFormState(0);
  const [p2Vp, handleP2VpChange] = useFormState(0);
  const [p3Vp, handleP3VpChange] = useFormState(0);
  const [p4Vp, handleP4VpChange] = useFormState(0);
  const [p5Vp, handleP5VpChange] = useFormState(0);
  const [p6Vp, handleP6VpChange] = useFormState(0);
  const [variation, handleVariationChange] = useFormState('The Settlers of Catan');

  const [areFiltersHidden, setAreFiltersHidden] = useState(false);
  const toggleFiltersHidden = () => {setAreFiltersHidden(!areFiltersHidden)};

  const [areP2GamesHidden, setAreP2GamesHidden] = useState(false);
  const [areP3GamesHidden, setAreP3GamesHidden] = useState(false);
  const [areP4GamesHidden, setAreP4GamesHidden] = useState(false);
  const [areP5GamesHidden, setAreP5GamesHidden] = useState(false);
  const [areP6GamesHidden, setAreP6GamesHidden] = useState(false);
  const toggleP2GamesHidden = () => {setAreP2GamesHidden(!areP2GamesHidden)};
  const toggleP3GamesHidden = () => {setAreP3GamesHidden(!areP3GamesHidden)};
  const toggleP4GamesHidden = () => {setAreP4GamesHidden(!areP4GamesHidden)};
  const toggleP5GamesHidden = () => {setAreP5GamesHidden(!areP5GamesHidden)};
  const toggleP6GamesHidden = () => {setAreP6GamesHidden(!areP6GamesHidden)};

  return (
    <Segment>
      <Header as="h1" textAlign="center">Recorded Games</Header>
      <Header as="h2">Filters</Header>
      <Button compact icon={toggleHiddenIconStates[areFiltersHidden]} onClick={toggleFiltersHidden}/>
      <GameFilters hidden={areFiltersHidden}/>
      <Header as="h2">Two player games</Header>
        <Button compact icon={toggleHiddenIconStates[areP2GamesHidden]} onClick={toggleP2GamesHidden}/>
        <Record2PlayerGameModal
          p1={p1} p2={p2}
          p1Vp={p1Vp} p2Vp={p2Vp}
          variation={variation}
          handleP1Change={handleP1Change} handleP2Change={handleP2Change}
          handleP1VpChange={handleP1VpChange} handleP2VpChange={handleP2VpChange}
          handleVariationChange={handleVariationChange}/>
        <Button color="blue" compact icon="refresh" onClick={getRecordedTwoPlayerGames}/>
        <GamesSegment2Player hidden={areP2GamesHidden}/>
      <Header as="h2">Three player games</Header>
        <Button compact icon={toggleHiddenIconStates[areP3GamesHidden]} onClick={toggleP3GamesHidden}/>
        <Record3PlayerGameModal
          p1={p1} p2={p2} p3={p3}
          p1Vp={p1Vp} p2Vp={p2Vp} p3Vp={p3Vp}
          variation={variation}
          handleP1Change={handleP1Change} handleP2Change={handleP2Change} handleP3Change={handleP3Change}
          handleP1VpChange={handleP1VpChange} handleP2VpChange={handleP2VpChange} handleP3VpChange={handleP3VpChange}
          handleVariationChange={handleVariationChange}/>
        <Button color="blue" compact icon="refresh" onClick={getRecordedThreePlayerGames}/>
        <GamesSegment3Player hidden={areP3GamesHidden}/>
      <Header as="h2">Four player games</Header>
        <Button compact icon={toggleHiddenIconStates[areP4GamesHidden]} onClick={toggleP4GamesHidden}/>
        <Record4PlayerGameModal
          p1={p1} p2={p2} p3={p3} p4={p4}
          p1Vp={p1Vp} p2Vp={p2Vp} p3Vp={p3Vp} p4Vp={p4Vp}
          variation={variation}
          handleP1Change={handleP1Change} handleP2Change={handleP2Change} handleP3Change={handleP3Change}
          handleP4Change={handleP4Change}
          handleP1VpChange={handleP1VpChange} handleP2VpChange={handleP2VpChange} handleP3VpChange={handleP3VpChange}
          handleP4VpChange={handleP4VpChange}
          handleVariationChange={handleVariationChange}/>
        <Button color="blue" compact icon="refresh" onClick={getRecordedFourPlayerGames}/>
        <GamesSegment4Player hidden={areP4GamesHidden}/>
      <Header as="h2">Five player games</Header>
        <Button compact icon={toggleHiddenIconStates[areP5GamesHidden]} onClick={toggleP5GamesHidden}/>
        <Record5PlayerGameModal
          p1={p1} p2={p2} p3={p3} p4={p4} p5={p5}
          p1Vp={p1Vp} p2Vp={p2Vp} p3Vp={p3Vp} p4Vp={p4Vp} p5Vp={p5Vp}
          variation={variation}
          handleP1Change={handleP1Change} handleP2Change={handleP2Change} handleP3Change={handleP3Change}
          handleP4Change={handleP4Change} handleP5Change={handleP5Change}
          handleP1VpChange={handleP1VpChange} handleP2VpChange={handleP2VpChange} handleP3VpChange={handleP3VpChange}
          handleP4VpChange={handleP4VpChange} handleP5VpChange={handleP5VpChange}
          handleVariationChange={handleVariationChange}/>
        <Button color="blue" compact icon="refresh" onClick={getRecordedFivePlayerGames}/>
        <GamesSegment5Player hidden={areP5GamesHidden}/>
      <Header as="h2">Six player games</Header>
        <Button compact icon={toggleHiddenIconStates[areP6GamesHidden]} onClick={toggleP6GamesHidden}/>
        <Record6PlayerGameModal
          p1={p1} p2={p2} p3={p3} p4={p4} p5={p5} p6={p6}
          p1Vp={p1Vp} p2Vp={p2Vp} p3Vp={p3Vp} p4Vp={p4Vp} p5Vp={p5Vp} p6Vp={p6Vp}
          variation={variation}
          handleP1Change={handleP1Change} handleP2Change={handleP2Change} handleP3Change={handleP3Change}
          handleP4Change={handleP4Change} handleP5Change={handleP5Change} handleP6Change={handleP6Change}
          handleP1VpChange={handleP1VpChange} handleP2VpChange={handleP2VpChange} handleP3VpChange={handleP3VpChange}
          handleP4VpChange={handleP4VpChange} handleP5VpChange={handleP5VpChange} handleP6VpChange={handleP6VpChange}
          handleVariationChange={handleVariationChange}/>
        <Button color="blue" compact icon="refresh" onClick={getRecordedSixPlayerGames}/>
        <GamesSegment6Player hidden={areP6GamesHidden}/>
    </Segment>
  );
}

const actionCreators = {
  getRecordedTwoPlayerGames,
  getRecordedThreePlayerGames,
  getRecordedFourPlayerGames,
  getRecordedFivePlayerGames,
  getRecordedSixPlayerGames,
  getBalances,
  getUserNames
};

export default connect(null, actionCreators)(CatanKeeper);
