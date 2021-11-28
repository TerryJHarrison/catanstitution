import React from "react";
import {Button, Dropdown, Header, Modal} from "semantic-ui-react";
import {connect} from "react-redux";
import {setVoteForRulerOfCatan} from "../../store/actions/catanstitution";
import {useFormModal} from "../../hooks/useFormModal";
import {useFormState} from "../../hooks/useFormState";

const VoteOnRulerOfCatanModal = ({setVoteForRulerOfCatan, votes, names}) => {
  const [isOpen, open, close] = useFormModal();
  const [rulerOfCatanVote, handleRulerOfCatanVoteChange] = useFormState('');

  const submit = () => {
    close();
    setVoteForRulerOfCatan(rulerOfCatanVote);
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
        <Header as="h2">Ruler of Catan</Header>
        <Dropdown placeholder='Choose ruler' search selection options={options} value={rulerOfCatanVote} onChange={handleRulerOfCatanVoteChange}/>
        <p>May resolve active proposals that have hit the required quorum of votes and can initiate a vote to nullify a passed amendment. Decides tiebreakers for other elected positions.</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={close} color='black'>Cancel</Button>
        <Button onClick={submit} color="green">Vote</Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => ({
  votes: state.catanstitution.rulerOfCatanVotes,
  names: state.names.names
});

const actionCreators = {
  setVoteForRulerOfCatan
};

export default connect(mapStateToProps, actionCreators)(VoteOnRulerOfCatanModal);
