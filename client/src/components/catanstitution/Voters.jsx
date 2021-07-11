import React from 'react';
import {Header, Table} from "semantic-ui-react";
import {connect} from "react-redux";
import AddressLabel from "../AddressLabel";

const Voters = ({voters}) => {
  return (
      <Table compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="2">Registered Voters</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {voters.map(voter =>
          <Table.Row key={voter.address}>
            <Table.Cell>
              <Header as='h4'><AddressLabel address={voter.address}/></Header>
            </Table.Cell>
            <Table.Cell>{voter.balance} CVR</Table.Cell>
          </Table.Row>
          )}
        </Table.Body>
      </Table>
  );
};

const mapStateToProps = state => ({
  voters: state.cvr.balances
});

export default connect(mapStateToProps)(Voters);
