import React from "react";
import {Button, Dropdown, Modal} from "semantic-ui-react";
import {connect} from "react-redux";
import {setVoteForKeeperOfTheCatanstitution} from "../../store/actions/cvr";
import {useFormModal} from "../../hooks/useFormModal";
import {useFormInput} from "../../hooks/useFormState";

const VoteOnKeeperOfTheCatanstitutionModal = ({setVoteForKeeperOfTheCatanstitution, closeContainer, votes}) => {
  const [isOpen, open, close] = useFormModal();
  const [keeperOfTheCatanstitutionVote, handleKeeperOfTheCatanstitutionVoteChange] = useFormInput('');

  const submit = () => {
    close();
    closeContainer();
    setVoteForKeeperOfTheCatanstitution(keeperOfTheCatanstitutionVote);
  };

  const options = Object.keys(votes).map(v => ({
    key: v,
    text: v,
    value: v
  }));

  return (
    <Modal onClose={close} onOpen={open} open={isOpen} trigger={<Button>Vote for Keeper of the Catanstitution</Button>}>
      <Modal.Header>Current Keeper</Modal.Header>
      <Modal.Description>Keeper of the Catanstitution</Modal.Description>
      <Modal.Content>
        <Dropdown placeholder='Address to vote for' search selection options={options} value={keeperOfTheCatanstitutionVote} onChange={handleKeeperOfTheCatanstitutionVoteChange}/>
        <Button fluid onClick={submit} color="green">Vote</Button>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={close}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => ({
  votes: state.cvr.keeperOfTheCatanstitutionVotes
});

const actionCreators = {
  setVoteForKeeperOfTheCatanstitution
};

export default connect(mapStateToProps, actionCreators)(VoteOnKeeperOfTheCatanstitutionModal);
