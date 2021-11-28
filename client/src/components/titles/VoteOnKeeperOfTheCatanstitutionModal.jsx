import React from "react";
import {Button, Dropdown, Header, Modal} from "semantic-ui-react";
import {connect} from "react-redux";
import {setVoteForKeeperOfTheCatanstitution} from "../../store/actions/catanstitution";
import {useFormModal} from "../../hooks/useFormModal";
import {useFormState} from "../../hooks/useFormState";

const VoteOnKeeperOfTheCatanstitutionModal = ({setVoteForKeeperOfTheCatanstitution, votes, names}) => {
  const [isOpen, open, close] = useFormModal();
  const [keeperOfTheCatanstitutionVote, handleKeeperOfTheCatanstitutionVoteChange] = useFormState('');

  const submit = () => {
    close();
    setVoteForKeeperOfTheCatanstitution(keeperOfTheCatanstitutionVote);
  };

  const options = Object.keys(votes).map(v => ({
    key: v,
    text: names.hasOwnProperty(v) ? names[v] : v,
    value: v
  }));

  return (
    <Modal onClose={close} onOpen={open} open={isOpen} trigger={<Button>Change Vote</Button>}>
      <Modal.Header>Change Vote</Modal.Header>
      <Modal.Content>
        <Header as="h2">Keeper of the Catanstitution</Header>
        <Dropdown placeholder='Address to vote for' search selection options={options} value={keeperOfTheCatanstitutionVote} onChange={handleKeeperOfTheCatanstitutionVoteChange}/>
        <p>May mint new CVR.</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={close} color='black'>Cancel</Button>
        <Button onClick={submit} color="green">Vote</Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => ({
  votes: state.catanstitution.keeperOfTheCatanstitutionVotes,
  names: state.names.names
});

const actionCreators = {
  setVoteForKeeperOfTheCatanstitution
};

export default connect(mapStateToProps, actionCreators)(VoteOnKeeperOfTheCatanstitutionModal);
