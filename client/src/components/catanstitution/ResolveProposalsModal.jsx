import React from "react";
import {Button, Card, CardGroup, Modal, Popup} from "semantic-ui-react";
import {connect} from "react-redux";
import {useFormModal} from "../../hooks/useFormModal";
import CurrentProposalVotes from "./CurrentProposalVotes";
import ResolveProposalModal from "./ResolveProposalModal";

const ResolveProposalsModal = ({proposals}) => {
  const [isOpen, open, close] = useFormModal();

  return (
    <Modal onClose={close} onOpen={open} open={isOpen} trigger={<Button>Resolve Proposals</Button>}>
      <Modal.Header>Active Proposals</Modal.Header>
      <Modal.Content>
        <CardGroup>
        {proposals.map(p =>
          <Card key={p.author}>
            <Card.Header>{p.text}</Card.Header>
            <Card.Meta>Proposed by <Popup content={p.author} trigger={<span>{p.author.slice(0, 5)}...{p.author.slice(-3)}</span>}/></Card.Meta>
            <Card.Content>
              <ResolveProposalModal proposal={p} closeContainer={close}/>
              <CurrentProposalVotes amendmentNum={p.amendmentNum}/>
            </Card.Content>
          </Card>
        )}
        </CardGroup>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={close}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  )
};

const mapStateToProps = state => ({
  proposals: state.cvr.proposals
});

export default connect(mapStateToProps)(ResolveProposalsModal);
