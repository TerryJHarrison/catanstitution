import React from "react";
import {Button, Grid, Modal, Popup} from "semantic-ui-react";
import {connect} from "react-redux";
import {getCurrentProposalsVotes, voteOnProposedAmendment} from "../../store/actions/catanstitution";
import {useFormModal} from "../../hooks/useFormModal";
import {VOTED_AGAINST, VOTED_FOR} from "../../constants";

const VoteOnProposalModal = ({voteOnProposedAmendment, getCurrentProposalsVotes, amendmentNum, author, votes, address, text}) => {
  const [isOpen, open, close] = useFormModal();

  const voteFor = () => {
    voteOnProposedAmendment(true, author).then(() => {
      getCurrentProposalsVotes();
    });
    close();
  };

  const voteAgainst = () => {
    voteOnProposedAmendment(false, author).then(() => {
      getCurrentProposalsVotes();
    });
    close();
  };

  if(author === address){
    return <Popup content="You wrote this proposal" trigger={<Button fluid disabled={true} compact color="green">Author</Button>}/>;
  }

  if(!votes[amendmentNum]){return null;}

  if(votes[amendmentNum][address] === VOTED_FOR){
    return <Popup content="You voted for this proposal" trigger={<Button fluid disabled={true} compact color="green">For</Button>}/>;
  }

  if(votes[amendmentNum][address] === VOTED_AGAINST){
    return <Popup content="You voted against this proposal" trigger={<Button fluid disabled={true} compact color="red">Against</Button>}/>;
  }

  return (
    <Modal onClose={close} onOpen={open} open={isOpen} trigger={<Button>Vote</Button>}>
      <Modal.Header>Amendment #{amendmentNum}</Modal.Header>
      <Modal.Content>
        <p>{text}</p>
        <Grid columns={2}>
          <Grid.Column><Button fluid onClick={voteFor} color="green">For</Button></Grid.Column>
          <Grid.Column><Button fluid onClick={voteAgainst} color="red">Against</Button></Grid.Column>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={close}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => ({
  votes: state.catanstitution.votes,
  address: state.web3.accounts[0]
});

const actionCreators = {
  voteOnProposedAmendment,
  getCurrentProposalsVotes
}

export default connect(mapStateToProps, actionCreators)(VoteOnProposalModal);
