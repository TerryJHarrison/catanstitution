import React from "react";
import {Button, Grid} from "semantic-ui-react";
import {connect} from "react-redux";
import {getCurrentProposalsVotes, voteOnProposedAmendment} from "../../store/actions/cvr";

const VoteOnProposalModal = ({voteOnProposedAmendment, getCurrentProposalsVotes, amendmentNum, author, closeContainer, votes, address}) => {
  const voteFor = () => {
    voteOnProposedAmendment(true, author).then(() => {
      getCurrentProposalsVotes();
    });
    closeContainer();
  };

  const voteAgainst = () => {
    voteOnProposedAmendment(false, author).then(() => {
      getCurrentProposalsVotes();
    });
    closeContainer();
  };

  if(author === address){
    return <Button fluid disabled={true} color="green">Author</Button>;
  }

  if(votes[amendmentNum][address] === "1"){
    return <Button fluid disabled={true} color="green">Voted For</Button>;
  }

  if(votes[amendmentNum][address] === "2"){
    return <Button fluid disabled={true} color="red">Voted Against</Button>;
  }

  return (
    <Grid columns={2}>
      <Grid.Column><Button fluid onClick={voteFor} color="green">For</Button></Grid.Column>
      <Grid.Column><Button fluid onClick={voteAgainst} color="red">Against</Button></Grid.Column>
    </Grid>
  );
};

const mapStateToProps = state => ({
  votes: state.cvr.votes,
  address: state.web3.accounts[0]
});

const actionCreators = {
  voteOnProposedAmendment,
  getCurrentProposalsVotes
}

export default connect(mapStateToProps, actionCreators)(VoteOnProposalModal);
