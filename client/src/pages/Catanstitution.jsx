import React, {useEffect, Fragment} from "react";
import {
  ButtonGroup,
  Card,
  CardGroup,
  Divider,
  Header,
  Segment
} from "semantic-ui-react";
import {connect} from "react-redux";
import {
  getBalances,
  getCatanstitution,
  getCurrentProposals,
  getCurrentProposalsVotes, getKeeperOfTheCatanstitutionVotes,
  getRoles, getRulerOfCatanVotes,
} from "../store/actions/cvr";
import BurnTokenModal from "../components/cvr/BurnTokenModal";
import MintTokenModal from "../components/cvr/MintTokenModal";
import ProposeAmendmentModal from "../components/catanstitution/ProposeAmendmentModal";
import Voters from "../components/catanstitution/Voters";
import VoteOnProposalsModal from "../components/catanstitution/VoteOnProposalsModal";
import ResolveProposalsModal from "../components/catanstitution/ResolveProposalsModal";
import Bylaws from "../components/catanstitution/Bylaws";
import VoteOnTitlesModal from "../components/titles/VoteOnTitlesModal";

const Catanstitution = ({getRoles, roles, getCatanstitution, getCurrentProposals, getBalances, proposals, getCurrentProposalsVotes, getRulerOfCatanVotes, getKeeperOfTheCatanstitutionVotes}) => {

  useEffect(() => {
    //Load all data from blockchain
    getRoles();
    getCatanstitution();
    getBalances().then(() => {
      getCurrentProposals().then(() => {
        getCurrentProposalsVotes();
      });
      getRulerOfCatanVotes();
      getKeeperOfTheCatanstitutionVotes();
    });
  }, []);

  return (
    <Fragment>
      <Segment>
        <Header as="h1" textAlign="center">The Catanstitution</Header>
        <Bylaws/>
        <Divider/>
        <Voters/>
      </Segment>
      {roles.ANY &&
      <Segment>
        <Header as="h2">Titles</Header>
        <CardGroup>
          {roles.SETTLER &&
          <Card>
            <Card.Header textAlign="center">Settler</Card.Header>
            <Card.Meta textAlign="center">of Catan</Card.Meta>
            <Card.Content textAlign="center">
              <ButtonGroup vertical>
                {proposals.length > 0 &&
                <VoteOnProposalsModal/>
                }
                <ProposeAmendmentModal/>
                <VoteOnTitlesModal/>
                <BurnTokenModal/>
              </ButtonGroup>
            </Card.Content>
            <Card.Content>
              <p>May propose amendments, vote on other's proposals, vote on elected positions, or even burn your CVR.</p>
            </Card.Content>
          </Card>
          }
          {roles.KEEPER_OF_THE_CATANSTITUTION &&
          <Card>
            <Card.Header textAlign="center">Keeper</Card.Header>
            <Card.Meta textAlign="center">of the Catanstitution</Card.Meta>
            <Card.Content textAlign="center">
              <ButtonGroup vertical>
                <MintTokenModal/>
              </ButtonGroup>
            </Card.Content>
            <Card.Content>
              <p>May mint new CVR.</p>
            </Card.Content>
          </Card>
          }
          {roles.RULER_OF_CATAN &&
          <Card>
            <Card.Header textAlign="center">Ruler</Card.Header>
            <Card.Meta textAlign="center">of Catan</Card.Meta>
            {proposals.length > 0 &&
            <Card.Content textAlign="center">
              <ResolveProposalsModal/>
            </Card.Content>
            }
            <Card.Content>
              <p>May resolve active proposals that have hit the required quorum of votes and can initiate a vote to nullify a passed amendment. Decides tiebreakers for other elected positions.</p>
            </Card.Content>
          </Card>
          }
        </CardGroup>
      </Segment>
      }
    </Fragment>
  );
};

const actionCreators = {
  getRoles,
  getCatanstitution,
  getCurrentProposals,
  getCurrentProposalsVotes,
  getBalances,
  getRulerOfCatanVotes,
  getKeeperOfTheCatanstitutionVotes
};

const mapStateToProps = state => ({
  roles: state.cvr.roles,
  proposals: state.cvr.proposals,
  address: state.web3.accounts[0]
});

export default connect(mapStateToProps, actionCreators)(Catanstitution);
