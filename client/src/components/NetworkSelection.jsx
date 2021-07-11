import React from 'react';
import {Grid, GridColumn, GridRow, Header, Segment} from "semantic-ui-react";
import CVRBalance from "./cvr/CVRBalance";

const NetworkSelection = () => {
  return (
    <Segment basic>
      <Grid>
        <GridRow>
          <GridColumn><Header as="h3"><CVRBalance/></Header></GridColumn>
        </GridRow>
      </Grid>
    </Segment>
  );
};

export default NetworkSelection;
