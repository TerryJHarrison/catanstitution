import React, {useEffect, Fragment} from "react";
import {
  Divider,
  Header,
  Segment
} from "semantic-ui-react";
import {connect} from "react-redux";
import {
  getBalances,
  getCatanstitution,
  getCurrentProposals,
  getCurrentProposalsVotes,
  getKeeperOfTheCatanstitutionVotes,
  getRoles,
  getRulerOfCatanVotes,
  getTrophyHolders, updateTrophies
} from "../store/actions/catanstitution";
import Voters from "../components/catanstitution/Voters";
import Bylaws from "../components/catanstitution/Bylaws";
import {getUserNames} from "../store/actions/names";
import TitlesCard from "../components/titles/TitlesCard";
import TrophiesCard from "../components/score-keeping/TrophiesCard";

const Catanstitution = ({getRoles, getCatanstitution, getCurrentProposals, getBalances, getCurrentProposalsVotes, getRulerOfCatanVotes, getKeeperOfTheCatanstitutionVotes, getTrophyHolders, getUserNames}) => {

  useEffect(() => {
    //Load all data from blockchain
    getCatanstitution();
    getBalances().then(() => {
      getRoles();
      getCurrentProposals().then(() => {
        getCurrentProposalsVotes();
      });
      getRulerOfCatanVotes();
      getKeeperOfTheCatanstitutionVotes();
      getTrophyHolders();
      getUserNames();
    });
  }, []);

  return (
    <Fragment>
      <Segment>
        <Header as="h1" textAlign="center">The Catanstitution</Header>
        <Bylaws/>
        <Divider horizontal>Voters</Divider>
        <Voters/>
      </Segment>
      <TitlesCard/>
      <TrophiesCard/>
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
  getKeeperOfTheCatanstitutionVotes,
  getTrophyHolders,
  updateTrophies,
  getUserNames
};

const mapStateToProps = state => ({
  address: state.web3.accounts[0]
});

export default connect(mapStateToProps, actionCreators)(Catanstitution);
