import React from "react";
import {Button, Header, Modal} from "semantic-ui-react";
import {connect} from "react-redux";
import {resolveAmendment} from "../../store/actions/catanstitution";
import {useFormModal} from "../../hooks/useFormModal";
import CurrentProposalVotes from "./CurrentProposalVotes";

const ResolveProposalModal = ({proposal, closeContainer, resolveAmendment}) => {
  const [isOpen, open, close] = useFormModal();

  const submit = () => {
    close();
    closeContainer();
    resolveAmendment(proposal.author);
  }

  return (
    <Modal onClose={close} onOpen={open} open={isOpen}  trigger={<Button>Resolve Proposal</Button>}>
      <Modal.Header>Resolve Proposal</Modal.Header>
      <Modal.Content>
        <Header as="h4">{proposal.text}</Header>
        <CurrentProposalVotes amendmentNum={proposal.amendmentNum}/>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={close}>Cancel</Button>
        <Button onClick={submit} color="green">Resolve Proposal</Button>
      </Modal.Actions>
    </Modal>
  )
};

const actionCreators = {
  resolveAmendment
}


export default connect(null, actionCreators)(ResolveProposalModal);
