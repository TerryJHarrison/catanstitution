import React, {Fragment} from 'react';
import Header from "../Header";
import {Container} from "semantic-ui-react";

const PageLayout = ({component}) => {
  return (
    <Fragment>
      <Header/>
      <Container>
        {component}
      </Container>
    </Fragment>
  );
}

export default PageLayout;
