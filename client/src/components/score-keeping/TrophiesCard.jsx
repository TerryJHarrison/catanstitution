import {Button, Card, CardGroup, Header, Icon, Segment} from "semantic-ui-react";
import React from "react";
import {connect} from "react-redux";
import AddressLabel from "../AddressLabel";
import {registerToVote, updateTrophies} from "../../store/actions/catanstitution";


const TrophiesCard = ({RRoC, PH, JaS, updateTrophies, registerToVote}) => {
  return (
    <Segment>
      <Header as="h2"><Icon name="trophy"/> Trophies</Header>
      <CardGroup centered>
        <Card raised>
          <Card.Header textAlign="center"><Icon name="chess king"/>Rightful Ruler of Catan</Card.Header>
          <Card.Meta textAlign="center">Won the most games overall</Card.Meta>
          <Card.Content textAlign="center">
            {RRoC ? <AddressLabel address={RRoC}/> : null}
          </Card.Content>
        </Card>
        <Card raised>
          <Card.Header textAlign="center"><Icon name="lightning"/>Power House</Card.Header>
          <Card.Meta textAlign="center">Highest margin of victory across all games</Card.Meta>
          <Card.Content textAlign="center">
            {PH ? <AddressLabel address={PH}/> : null}
          </Card.Content>
        </Card>
        <Card raised>
          <Card.Header textAlign="center"><Icon name="cog"/>Just a Settler</Card.Header>
          <Card.Meta textAlign="center">Lost the most games overall</Card.Meta>
          <Card.Content textAlign="center">
            {JaS ? <AddressLabel address={JaS}/> : null}
          </Card.Content>
        </Card>
      </CardGroup>
      <Segment basic textAlign="right">
        <Button onClick={registerToVote}>Register for Trophies</Button>
        <Button onClick={updateTrophies}>Update Trophies</Button>
      </Segment>
    </Segment>
  )
}

const actionCreators = {
  updateTrophies,
  registerToVote
};

const mapStateToProps = state => ({
  RRoC: state.catanstitution.RRoC,
  PH: state.catanstitution.PH,
  JaS: state.catanstitution.JaS
});

export default connect(mapStateToProps, actionCreators)(TrophiesCard);