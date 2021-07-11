import React, {useEffect} from "react";
import {Button, CardGroup, Header, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import {
  getRecordedTwoPlayerGames,
  getRecordedThreePlayerGames,
  getRecordedFourPlayerGames,
  getRecordedFivePlayerGames,
  getRecordedSixPlayerGames
} from "../store/actions/keeper";
import GameCard2Player from "../components/score-keeping/GameCard2Player";
import GameCard3Player from "../components/score-keeping/GameCard3Player";
import GameCard4Player from "../components/score-keeping/GameCard4Player";
import GameCard5Player from "../components/score-keeping/GameCard5Player";
import GameCard6Player from "../components/score-keeping/GameCard6Player";
import {useFormInput} from "../hooks/useFormState";
import Record2PlayerGameModal from "../components/score-keeping/Record2PlayerGameModal";
import Record3PlayerGameModal from "../components/score-keeping/Record3PlayerGameModal";
import Record4PlayerGameModal from "../components/score-keeping/Record4PlayerGameModal";
import Record5PlayerGameModal from "../components/score-keeping/Record5PlayerGameModal";
import Record6PlayerGameModal from "../components/score-keeping/Record6PlayerGameModal";

const CatanKeeper = (
  {
    twoPlayerGames,
    threePlayerGames,
    fourPlayerGames,
    fivePlayerGames,
    sixPlayerGames,
    getRecordedTwoPlayerGames,
    getRecordedThreePlayerGames,
    getRecordedFourPlayerGames,
    getRecordedFivePlayerGames,
    getRecordedSixPlayerGames
  }) => {

  useEffect(() => {
    getRecordedTwoPlayerGames();
    getRecordedThreePlayerGames();
    getRecordedFourPlayerGames();
    getRecordedFivePlayerGames();
    getRecordedSixPlayerGames();
  });

  const [p1, handleP1Change] = useFormInput('');
  const [p2, handleP2Change] = useFormInput('');
  const [p3, handleP3Change] = useFormInput('');
  const [p4, handleP4Change] = useFormInput('');
  const [p5, handleP5Change] = useFormInput('');
  const [p6, handleP6Change] = useFormInput('');
  const [p1Vp, handleP1VpChange] = useFormInput(0);
  const [p2Vp, handleP2VpChange] = useFormInput(0);
  const [p3Vp, handleP3VpChange] = useFormInput(0);
  const [p4Vp, handleP4VpChange] = useFormInput(0);
  const [p5Vp, handleP5VpChange] = useFormInput(0);
  const [p6Vp, handleP6VpChange] = useFormInput(0);
  const [variation, handleVariationChange] = useFormInput('Base');

  return (
    <Segment>
      <Header as="h1" textAlign="center">Recorded Games</Header>
      <Header as="h2">Two player games</Header>
      <Record2PlayerGameModal
        p1={p1} p2={p2}
        p1Vp={p1Vp} p2Vp={p2Vp}
        variation={variation}
        handleP1Change={handleP1Change} handleP2Change={handleP2Change}
        handleP1VpChange={handleP1VpChange} handleP2VpChange={handleP2VpChange}
        handleVariationChange={handleVariationChange}/>
      <Button color="blue" compact icon="refresh" onClick={getRecordedTwoPlayerGames}/>
      <Segment>
        <CardGroup>
          {Object.keys(twoPlayerGames).length > 0 ? Object.values(twoPlayerGames).map(g => <GameCard2Player game={g}/>) : <span>No Games</span>}
        </CardGroup>
      </Segment>
      <Header as="h2">Three player games</Header>
      <Record3PlayerGameModal
        p1={p1} p2={p2} p3={p3}
        p1Vp={p1Vp} p2Vp={p2Vp} p3Vp={p3Vp}
        variation={variation}
        handleP1Change={handleP1Change} handleP2Change={handleP2Change} handleP3Change={handleP3Change}
        handleP1VpChange={handleP1VpChange} handleP2VpChange={handleP2VpChange} handleP3VpChange={handleP3VpChange}
        handleVariationChange={handleVariationChange}/>
      <Button color="blue" compact icon="refresh" onClick={getRecordedThreePlayerGames}/>
      <Segment>
        <CardGroup>
          {Object.keys(threePlayerGames).length > 0 ? Object.values(threePlayerGames).map(g => <GameCard3Player game={g}/>) : <span>No Games</span>}
        </CardGroup>
      </Segment>
      <Header as="h2">Four player games</Header>
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
      <Segment>
        <CardGroup>
          {Object.keys(fourPlayerGames).length > 0 ? Object.values(fourPlayerGames).map(g => <GameCard4Player game={g}/>) : <span>No Games</span>}
        </CardGroup>
      </Segment>
      <Header as="h2">Five player games</Header>
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
      <Segment>
        <CardGroup>
          {Object.keys(fivePlayerGames).length > 0 ? Object.values(fivePlayerGames).map(g => <GameCard5Player game={g}/>) : <span>No Games</span>}
        </CardGroup>
      </Segment>
      <Header as="h2">Six player games</Header>
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
      <Segment>
        <CardGroup>
          {Object.keys(sixPlayerGames).length > 0 ? Object.values(sixPlayerGames).map(g => <GameCard6Player game={g}/>) : <span>No Games</span>}
        </CardGroup>
      </Segment>
    </Segment>
  );
}

const actionCreators = {
  getRecordedTwoPlayerGames,
  getRecordedThreePlayerGames,
  getRecordedFourPlayerGames,
  getRecordedFivePlayerGames,
  getRecordedSixPlayerGames,
};

const mapStateToProps = state => ({
  twoPlayerGames: state.keeper.games.two,
  threePlayerGames: state.keeper.games.three,
  fourPlayerGames: state.keeper.games.four,
  fivePlayerGames: state.keeper.games.five,
  sixPlayerGames: state.keeper.games.six
})

export default connect(mapStateToProps, actionCreators)(CatanKeeper);
