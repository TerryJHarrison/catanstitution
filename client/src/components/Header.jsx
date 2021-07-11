import React from 'react';
import {Grid, GridColumn, GridRow, Segment, Header as UIHeader} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import NetworkSelection from "./NetworkSelection";

const Header = () => {
  return (
    <Segment raised>
      <Grid columns={3}>
        <GridRow align="center" divided verticalAlign="middle">
          <GridColumn><NavLink to="/"><UIHeader as="h3">The Catanstitution</UIHeader></NavLink></GridColumn>
          <GridColumn><NavLink to="/keeper"><UIHeader as="h3">Catan Keeper</UIHeader></NavLink></GridColumn>
          <GridColumn><NetworkSelection/></GridColumn>
        </GridRow>
      </Grid>
    </Segment>
  );
}

export default Header;
