import React from 'react';
import {Button, Grid, GridColumn, GridRow, Header, Segment} from "semantic-ui-react";
import AccountBalance from "./AccountBalance";
import AddressLabel from "./AddressLabel";
import {connect} from "react-redux";
import Web3Modal from "web3modal";
import ethProvider from "eth-provider";
import Authereum from "authereum";

// const providerOptions = {
//   frame: {
//     package: ethProvider
//   },
//   authereum: {
//     package: Authereum
//   }
// };
//
// const web3Modal = new Web3Modal({
//   cacheProvider: true,
//   providerOptions
// });

//<Button onClick={web3Modal.connect} icon="circle"/>

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
