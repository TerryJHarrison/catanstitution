import React from 'react';
import {Grid, GridColumn, Header, Segment} from "semantic-ui-react";
import AccountBalance from "./AccountBalance";
import AddressLabel from "./AddressLabel";
import {connect} from "react-redux";

const NetworkSelection = ({address}) => {
  return (
    <Segment basic>
      <Grid>
        <GridColumn width={5}>
          <Header as="h3"><AccountBalance/></Header>
        </GridColumn>
        <GridColumn width={6} verticalAlign="middle">
          <Header as="h3"><AddressLabel address={address}/></Header>
        </GridColumn>
      </Grid>
    </Segment>
  );
};

const mapStateToProps = state => ({
  address: state.web3.accounts[0]
})

export default connect(mapStateToProps)(NetworkSelection);
