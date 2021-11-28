const fs = require('fs');
const Web3 = require('web3');
const ethers = require('ethers');
const Catanstitution = require('../client/src/contracts/Catanstitution.json');
const CatanKeeper = require('../client/src/contracts/CatanKeeper.json');
const gameData = require("./gameData.json");
const addresses = require("./addresses.json");

const web3 = new Web3('https://rpc-mumbai.matic.today')
const catanstitution = new web3.eth.Contract(Catanstitution.abi, Catanstitution.networks[80001].address);

const loadWallet = async() => {
  const mnemonic = fs.readFileSync('../.secret', 'utf8');
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);
  web3.eth.accounts.wallet.add(wallet);
  console.info(`Wallet ${web3.eth.accounts.wallet[0].address} loaded`)
  return web3.eth.accounts.wallet[0].address;
}

loadWallet().then(async address => {
  const catanKeeperAddress = await (await catanstitution.methods.catanKeeper.call()).call();
  const catanKeeper = new web3.eth.Contract(CatanKeeper.abi, catanKeeperAddress);

  for(const g in gameData.games){
    if(gameData.games.hasOwnProperty(g)) {
      const game = gameData.games[g];
      const numPlayers = game.num_players;
      delete game.num_players;

      //Set recorder
      const recorder = game.recorder;
      delete game.recorder;

      //Update addresses
      game.player_1 = addresses[game.player_1];
      game.player_2 = addresses[game.player_2];
      if(game.hasOwnProperty('player_3')){game.player_3 = addresses[game.player_3]}
      if(game.hasOwnProperty('player_4')){game.player_4 = addresses[game.player_4]}
      if(game.hasOwnProperty('player_5')){game.player_5 = addresses[game.player_5]}
      if(game.hasOwnProperty('player_6')){game.player_6 = addresses[game.player_6]}

      try {
        //Record game
        switch (numPlayers) {
          case 2:
            await catanKeeper.methods.recordHistoricalTwoPlayerGame(game, addresses[recorder]).send({
              from: address,
              gasLimit: 500000
            });
            break;
          case 3:
            await catanKeeper.methods.recordHistoricalThreePlayerGame(game, addresses[recorder]).send({
              from: address,
              gasLimit: 500000
            });
            break;
          case 4:
            await catanKeeper.methods.recordHistoricalFourPlayerGame(game, addresses[recorder]).send({
              from: address,
              gasLimit: 500000
            });
            break;
          case 5:
            await catanKeeper.methods.recordHistoricalFivePlayerGame(game, addresses[recorder]).send({
              from: address,
              gasLimit: 500000
            });
            break;
          case 6:
            await catanKeeper.methods.recordHistoricalSixPlayerGame(game, addresses[recorder]).send({
              from: address,
              gasLimit: 500000
            });
            break;
        }
      } catch (e){
        console.info(`Could not record ${numPlayers}-player game by ${recorder}`, e);
      }

    }
  }

  console.log('Game data loaded');
}).catch(e => {
  console.error(e);
});


