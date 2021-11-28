import React from "react";
import {Dimmer, Icon, Loader} from "semantic-ui-react";
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
    <span>
      {castVotes.filter(v => v === "1").length}<Icon name="thumbs up"/> <Icon name="thumbs down"/>{castVotes.filter(v => v === "2").length}
    </span>
  );
};

const mapStateToProps = state => ({
  votes: state.catanstitution.votes
});

export default connect(mapStateToProps)(CurrentProposalVotes);
