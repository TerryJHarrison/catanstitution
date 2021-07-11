const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const CatanKeeper = artifacts.require("CatanKeeper");
const CatanstitutionVotingRights = artifacts.require("CatanstitutionVotingRights");

module.exports = async function (deployer) {
  const cvr = await deployProxy(CatanstitutionVotingRights, [], {deployer});
  console.log('Deployed CatanstitutionVotingRights', cvr.address);

  const keeper = await deployProxy(CatanKeeper, [], {deployer});
  console.log('Deployed CatanKeeper', keeper.address);
};
