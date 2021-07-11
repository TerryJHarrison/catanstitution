import React from "react";
import {Container, Dimmer, Divider, Loader} from "semantic-ui-react";

const Loading = () => {
  return (
    <Container textAlign="center">
      <Dimmer active>
        <Loader indeterminate size="large">
          Pulling the Catanstitution from somewhere safe...
          <p>Check your network - only the Mumbai Testnet is currently supported</p>
          <p><a href="https://docs.matic.network/docs/develop/metamask/testnet/#:~:text=To%20add%20Matic's%20Testnet%2C%20click,Network%20field%2C%20click%20on%20Save">Get Setup</a>, <a href="https://faucet.matic.network/">Get Supplied</a></p>
        </Loader>
      </Dimmer>
      <Divider/>
    </Container>
  );
}

export default Loading;
