import React from "react";
import {Button, Form, Modal} from "semantic-ui-react";
import {connect} from "react-redux";
import {
  getBalance,
  getBalances,
  getCurrentProposals,
  getCurrentProposalsVotes,
  getRoles,
  sendVoterToken
} from "../../store/actions/catanstitution";
import {useFormModal} from "../../hooks/useFormModal";
import {useFormState} from "../../hooks/useFormState";

const SendCVRModal = ({sendVoterToken, getRoles, getBalance, getBalances, getCurrentProposals, getCurrentProposalsVotes}) => {
  const [isOpen, open, close] = useFormModal();
  const [address, handleAddressChange] = useFormState('');

  const submit = () => {
    close();
    sendVoterToken(address).then(() => {
      getBalance();
      getRoles();
      getBalances().then(() => {
        getCurrentProposals().then(() => {
          getCurrentProposalsVotes();
        });
      });
    });
  };

  return (
    <Modal onClose={close} onOpen={open} open={isOpen}  trigger={<Button>Transfer CVR</Button>}>
      <Modal.Header>Transfer CVR</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Receiving Address</label>
            <Form.Input placeholder='0x0123...' name='address' value={address} onChange={handleAddressChange}/>
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={close}>Cancel</Button>
        <Button onClick={submit} color="green">Send</Button>
      </Modal.Actions>
    </Modal>
  )
};

const actionCreators = {
  sendVoterToken,
  getBalance,
  getBalances,
  getRoles,
  getCurrentProposals,
  getCurrentProposalsVotes
}

export default connect(null, actionCreators)(SendCVRModal);
