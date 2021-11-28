import React from 'react';
import {Card, CardGroup, Grid, GridColumn} from "semantic-ui-react";
import {connect} from "react-redux";
import AddressLabel from "../AddressLabel";

const Voters = ({voters}) => {
  return (
    <CardGroup centered>
      {voters.map(voter =>
        <Card key={voter.address} raised>
          <Card.Header textAlign="center"><b><AddressLabel address={voter.address}/></b></Card.Header>
          <Card.Content>
            <Grid columns={2}>
              <GridColumn textAlign="right"><b>{voter.cvr}</b> CVR</GridColumn>
              <GridColumn textAlign="left"><b>{voter.ckg}</b> CKG</GridColumn>
            </Grid>
          </Card.Content>
        </Card>
      )}
    </CardGroup>
  )
};

const mapStateToProps = state => ({
  voters: state.catanstitution.balances
});

export default connect(mapStateToProps)(Voters);
