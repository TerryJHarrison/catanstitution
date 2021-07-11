import React, {useEffect} from "react";
import {Button, Card, CardGroup, Header, Modal} from "semantic-ui-react";
import {useFormModal} from "../../hooks/useFormModal";
import VoteOnRulerOfCatanModal from "./VoteOnRulerOfCatanModal";
import AddressLabel from "../AddressLabel";
import {connect} from "react-redux";
import {getKeeperOfTheCatanstitutionVotes, getRulerOfCatanVotes} from "../../store/actions/cvr";
import VoteOnKeeperOfTheCatanstitutionModal from "./VoteOnKeeperOfTheCatanstitutionModal";

const VoteOnTitlesModal = ({rulerOfCatanVotes, keeperOfTheCatanstitutionVotes, getRulerOfCatanVotes, getKeeperOfTheCatanstitutionVotes}) => {
  const [isOpen, open, close] = useFormModal();

  useEffect(() => {
    getRulerOfCatanVotes();
    getKeeperOfTheCatanstitutionVotes();
  }, []);

  return (
    <Modal onClose={close} onOpen={open} open={isOpen} trigger={<Button>Vote for Elected Positions</Button>}>
      <Modal.Header>Elected Positions</Modal.Header>
      <Modal.Content>
        <CardGroup>
          <Card>
            <Card.Header>Ruler of Catan</Card.Header>
            <Card.Content>
              <p>May resolve active proposals that have hit the required quorum of votes and can initiate a vote to nullify a passed amendment. Decides tiebreakers for other elected positions.</p>
              <Header as="h5">Current Votes</Header>
              {Object.keys(rulerOfCatanVotes).map(v => {return <span key={v}>{rulerOfCatanVotes[v]} for <AddressLabel address={v}/><br/></span>})}
              <VoteOnRulerOfCatanModal closeContainer={close}/>
            </Card.Content>
          </Card>
          <Card>
            <Card.Header>Keeper of the Catanstitution</Card.Header>
            <Card.Content>
              <p>May mint new CVR.</p>
              <Header as="h5">Current Votes</Header>
              {Object.keys(keeperOfTheCatanstitutionVotes).map(v => {return <span key={v}>{keeperOfTheCatanstitutionVotes[v]} for <AddressLabel address={v}/><br/></span>})}
              <VoteOnKeeperOfTheCatanstitutionModal closeContainer={close}/>
            </Card.Content>
          </Card>
        </CardGroup>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={close}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  );
};

const actionCreators = {
  getRulerOfCatanVotes,
  getKeeperOfTheCatanstitutionVotes
};

const mapStateToProps = state => ({
  rulerOfCatanVotes: state.cvr.rulerOfCatanVotes,
  keeperOfTheCatanstitutionVotes: state.cvr.keeperOfTheCatanstitutionVotes
});

export default connect(mapStateToProps, actionCreators)(VoteOnTitlesModal);
