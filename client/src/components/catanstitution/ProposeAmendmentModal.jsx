import React from "react";
import {Button, Form, Modal} from "semantic-ui-react";
import {connect} from "react-redux";
import {getCurrentProposals, getCurrentProposalsVotes, proposeAmendment} from "../../store/actions/cvr";
import {useFormModal} from "../../hooks/useFormModal";
import {useFormInput} from "../../hooks/useFormState";

const ProposeAmendmentModal = ({proposeAmendment, getCurrentProposals, getCurrentProposalsVotes}) => {
  const [isOpen, open, close] = useFormModal();
  const [amendment, handleAmendmentChange] = useFormInput('');

  const submit = () => {
    close();
    proposeAmendment(amendment).then(() => {
      getCurrentProposals().then(() => {
        getCurrentProposalsVotes();
      });
    });
  };

  return (
    <Modal onClose={close} onOpen={open} open={isOpen}  trigger={<Button fluid>Propose Amendment</Button>}>
      <Modal.Header>Propose Amendment</Modal.Header>
      <Modal.Content>
    <Form>
      <Form.Field>
        <label>Amendment</label>
        <Form.Input placeholder='No Future Transferable Cards (FTCs) shall be allowed...' name='amendment' value={amendment} onChange={handleAmendmentChange}/>
      </Form.Field>
    </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={close}>Cancel</Button>
        <Button onClick={submit} color="green">Propose</Button>
      </Modal.Actions>
    </Modal>
  )
};

const actionCreators = {
  proposeAmendment,
  getCurrentProposals,
  getCurrentProposalsVotes
}

export default connect(null, actionCreators)(ProposeAmendmentModal);
