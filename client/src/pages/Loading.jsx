import React from "react";
import {Button, Container, Dimmer, Divider, Loader} from "semantic-ui-react";

const Loading = () => {

  const addNetwork = async () => {
    console.info("adding network")
    try {
      return await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: "0x13881",
          chainName: "Mumbai Testnet",
          rpcUrls: ["https://rpc-mumbai.matic.today"],
          nativeCurrency: {
            symbol: "MATIC",
            decimals: 18,
          },
          blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
        }]
      });
    } catch(error) {
      console.error(error);
    }
  }

  const switchNetwork = async () => {
    try {
      return await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{chainId: "0x13881"}]
      });
    } catch(error) {
      console.error(error);
      if (error.code === 4902) { // chain has not been added to MetaMask
        try {
          await addNetwork();
        } catch (addError) {
          // handle "add" error
        }
      }
    }
  }

  return (
    <Container textAlign="center">
      <Dimmer active>
        <Loader indeterminate size="large">
          Pulling the Catanstitution from somewhere safe...
          <p>Check your network - only the Mumbai Testnet is currently supported<br/>
            <Button onClick={addNetwork}>Add network</Button>
            <Button onClick={switchNetwork}>Switch network</Button>
          </p>
          <p>Get Supplied: <a href="https://faucet.matic.network/">Faucet 1</a> or <a href="https://mcncheese.com/">Faucet 2</a></p>
        </Loader>
      </Dimmer>
      <Divider/>
    </Container>
  );
}

export default Loading;
