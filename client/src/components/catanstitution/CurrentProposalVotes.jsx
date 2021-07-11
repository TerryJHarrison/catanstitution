import React from "react";
import {Dimmer, Divider, Grid, Icon, Loader, Segment} from "semantic-ui-react";
import {connect} from "react-redux";

const CurrentProposalVotes = ({amendmentNum, votes}) => {
  if(!(amendmentNum in votes)){
    return (
      <Dimmer>
        <Loader size="tiny"/>
      </Dimmer>
    );
  }

  const castVotes = Object.values(votes[amendmentNum]);
  return (
    <Segment raised textAlign="center">
      <Grid columns={3} relaxed='very'>
        <Grid.Column><Icon name="thumbs up"/> {castVotes.filter(v => v === "1").length}</Grid.Column>
        <Grid.Column><Divider vertical>VOTES</Divider></Grid.Column>
        <Grid.Column><Icon name="thumbs down"/> {castVotes.filter(v => v === "2").length}</Grid.Column>
      </Grid>
    </Segment>
  );
};

const mapStateToProps = state => ({
  votes: state.cvr.votes
});

export default connect(mapStateToProps)(CurrentProposalVotes);
