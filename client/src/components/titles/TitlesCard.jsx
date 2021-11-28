import {ButtonGroup, Card, CardGroup, Divider, Header, Icon, Segment} from "semantic-ui-react";
import ProposeAmendmentModal from "../catanstitution/ProposeAmendmentModal";
import BurnTokenModal from "../cvr/BurnTokenModal";
import SetUserNameModal from "../SetUserNameModal";
import MintTokenModal from "../cvr/MintTokenModal";
import ResolveProposalsModal from "../catanstitution/ResolveProposalsModal";
import React, {Fragment} from "react";
import {connect} from "react-redux";
import AddressLabel from "../AddressLabel";
import VoteOnRulerOfCatanModal from "./VoteOnRulerOfCatanModal";
import VoteOnKeeperOfTheCatanstitutionModal from "./VoteOnKeeperOfTheCatanstitutionModal";
import SendCVRModal from "../cvr/SendCVRModal";


const TitlesCard = ({roles, proposals, balances, address}) => {
  const balance = balances.filter(b => b.address === address)[0];
  if(!balance){return null;}//loading

  return (
    <Segment>
      <Header as="h2"><Icon name="users"/>Titles</Header>
      <CardGroup centered>
        {balance.cvr > 0 &&
        <Card>
          <Card.Header textAlign="center">Settler</Card.Header>
          <Card.Meta textAlign="center">of Catan</Card.Meta>
          <Card.Content textAlign="center">
            <ButtonGroup vertical>
              <ProposeAmendmentModal/>
              <SendCVRModal/>
              <BurnTokenModal/>
              <SetUserNameModal/>
            </ButtonGroup>
          </Card.Content>
          <Card.Content>
            <p>May propose amendments, vote on other's proposals, vote on elected positions, or even burn your CVR.</p>
          </Card.Content>
        </Card>
        }
        {(balance.cvr === 0 && balance.ckg > 0) &&
        <Card>
          <Card.Header textAlign="center">Player</Card.Header>
          <Card.Meta textAlign="center">of Catan</Card.Meta>
          <Card.Content textAlign="center">
            <ButtonGroup vertical>
              <SetUserNameModal/>
            </ButtonGroup>
          </Card.Content>
          <Card.Content>
            <p>Can set your user name.</p>
          </Card.Content>
        </Card>
        }
        <Card>
          <Card.Header textAlign="center">Keeper</Card.Header>
          <Card.Meta textAlign="center">of the Catanstitution</Card.Meta>
          <Card.Content textAlign="center">
            {roles.keeperOfTheCatanstitution === balance.address &&
            <ButtonGroup vertical>
              <MintTokenModal/>
              <VoteOnKeeperOfTheCatanstitutionModal/>
            </ButtonGroup>
            }
            {roles.keeperOfTheCatanstitution !== balance.address &&
              <Fragment>
                <span>Held by <b><AddressLabel address={roles.keeperOfTheCatanstitution}/></b></span>
                <Divider/>
                <VoteOnKeeperOfTheCatanstitutionModal/>
              </Fragment>
            }
          </Card.Content>
          <Card.Content>
            <p>May mint new CVR.</p>
          </Card.Content>
        </Card>
        <Card>
          <Card.Header textAlign="center">Ruler</Card.Header>
          <Card.Meta textAlign="center">of Catan</Card.Meta>
          {roles.rulerOfCatan === balance.address && proposals.length > 0 &&
          <Card.Content textAlign="center">
            <ButtonGroup vertical>
              <ResolveProposalsModal/>
              <VoteOnRulerOfCatanModal/>
            </ButtonGroup>
          </Card.Content>
          }
          {roles.rulerOfCatan !== balance.address &&
          <Card.Content textAlign="center">
            <span>Held by <b><AddressLabel address={roles.rulerOfCatan}/></b></span>
            <Divider/>
            <VoteOnRulerOfCatanModal/>
          </Card.Content>
          }
          <Card.Content>
            <p>May resolve active proposals that have hit the required quorum of votes and can initiate a vote to nullify a passed amendment. Decides tiebreakers for other elected positions.</p>
          </Card.Content>
        </Card>
      </CardGroup>
    </Segment>
  )
}

const mapStateToProps = state => ({
  roles: state.catanstitution.roles,
  proposals: state.catanstitution.proposals,
  balances: state.catanstitution.balances,
  address: state.web3.accounts[0]
});

export default connect(mapStateToProps)(TitlesCard);