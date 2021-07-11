import React from "react";
import {Button, Dropdown, Modal} from "semantic-ui-react";
import {connect} from "react-redux";
import {setVoteForRulerOfCatan} from "../../store/actions/cvr";
import {useFormModal} from "../../hooks/useFormModal";
import {useFormInput} from "../../hooks/useFormState";

const VoteOnRulerOfCatanModal = ({setVoteForRulerOfCatan, closeContainer, votes}) => {
  const [isOpen, open, close] = useFormModal();
  const [rulerOfCatanVote, handleRulerOfCatanVoteChange] = useFormInput('');

  const submit = () => {
    close();
    closeContainer();
    setVoteForRulerOfCatan(rulerOfCatanVote);
  };

  const options = Object.keys(votes).map(v => ({
    key: v,
    text: v,
    value: v
  }));

  return (
    <Modal onClose={close} onOpen={open} open={isOpen} trigger={<Button>Vote for Ruler of Catan</Button>}>
      <Modal.Header>Current Ruler</Modal.Header>
      <Modal.Description>Ruler of Catan</Modal.Description>
      <Modal.Content>
        <Dropdown placeholder='Address to vote for' search selection options={options} value={rulerOfCatanVote} onChange={handleRulerOfCatanVoteChange}/>
        <Button fluid onClick={submit} color="green">Vote</Button>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={close}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => ({
  votes: state.cvr.rulerOfCatanVotes
});

const actionCreators = {
  setVoteForRulerOfCatan
};

export default connect(mapStateToProps, actionCreators)(VoteOnRulerOfCatanModal);
