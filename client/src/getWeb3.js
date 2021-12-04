import Web3 from "web3";
import Web3Modal from "web3modal";
import ethProvider from "eth-provider";
//TODO: add walletLink support for coinbase wallet - needed?

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    const providerOptions = {
      frame: {
        package: ethProvider
      }
    };

    const web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions
    });

    web3Modal.connect().then(provider => {
      const web3 = new Web3(provider);

      // Subscribe to accounts change
      provider.on("accountsChanged", (accounts) => {
        console.log(accounts);
      });

      // Subscribe to chainId change
      provider.on("chainChanged", (chainId) => {
        console.log(chainId);
      });

      // Subscribe to provider connection
      provider.on("connect", (info) => {
        console.log(info);
      });

      // Subscribe to provider disconnection
      provider.on("disconnect", (error) => {
        console.log(error);
      });
      resolve([web3, web3Modal]);
    });
  });

export default getWeb3;
