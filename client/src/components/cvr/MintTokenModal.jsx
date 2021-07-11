import React from "react";
import {Button, Form, Modal} from "semantic-ui-react";
import {connect} from "react-redux";
import {
  getBalance,
  getBalances,
  getCurrentProposals,
  getCurrentProposalsVotes,
  getRoles,
  mintToken
} from "../../store/actions/cvr";
import {useFormModal} from "../../hooks/useFormModal";
import {useFormInput} from "../../hooks/useFormState";

const MintTokenModal = ({mintToken, getRoles, getBalance, getBalances, getCurrentProposals, getCurrentProposalsVotes}) => {
  const [isOpen, open, close] = useFormModal();
  const [address, handleAddressChange] = useFormInput('');
  const [amount, handleAmountChange] = useFormInput(0);

  const submit = () => {
    close();
    mintToken(address, amount).then(() => {
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
    <Modal onClose={close} onOpen={open} open={isOpen}  trigger={<Button>Mint CVR</Button>}>
      <Modal.Header>Mint CVR</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Receiving Address</label>
            <Form.Input placeholder='0x0123...' name='address' value={address} onChange={handleAddressChange}/>
          </Form.Field>
          <Form.Field>
            <label>Amount (whole CVR)</label>
            <Form.Input placeholder='1' name='amount' value={amount} onChange={handleAmountChange}/>
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={close}>Cancel</Button>
        <Button onClick={submit} color="green">Mint</Button>
      </Modal.Actions>
    </Modal>
  )
};

const actionCreators = {
  mintToken,
  getBalance,
  getBalances,
  getRoles,
  getCurrentProposals,
  getCurrentProposalsVotes
}

export default connect(null, actionCreators)(MintTokenModal);
