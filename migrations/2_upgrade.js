const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const CatanKeeper = artifacts.require("CatanKeeper");
const CatanstitutionVotingRights = artifacts.require("CatanstitutionVotingRights");

module.exports = async function (deployer) {
  const existingKeeper = await CatanKeeper.deployed();
  const existingCvr = await CatanstitutionVotingRights.deployed();

  const keeper = await upgradeProxy(existingKeeper.address, CatanKeeper, {deployer});
  console.log('Upgraded CatanKeeper', keeper.address);

  const cvr = await upgradeProxy(existingCvr.address, CatanstitutionVotingRights, {deployer});
  console.log('Upgraded CatanstitutionVotingRights', cvr.address);
};
