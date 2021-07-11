const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const VoterPool = artifacts.require("VoterPool");
const FluidVoteTitle = artifacts.require("FluidVoteTitle");
const Constitution = artifacts.require("Constitution");
const CatanKeeper = artifacts.require("CatanKeeper");
const Catanstitution = artifacts.require("Catanstitution");

module.exports = async function (deployer) {
  const existingVoterPool = await VoterPool.deployed();
  const existingFluidVoteTitle = await FluidVoteTitle.deployed();
  const existingConstitution = await Constitution.deployed();
  const existingCatanKeeper = await CatanKeeper.deployed();
  const existingCatanstitution = await Catanstitution.deployed();

  const voterPool = await upgradeProxy(existingVoterPool.address, VoterPool, {deployer});
  console.log('Upgraded VoterPool', voterPool.address);

  const fluidVoteTitle = await upgradeProxy(existingFluidVoteTitle.address, FluidVoteTitle, {deployer});
  console.log('Upgraded FluidVoteTitle', fluidVoteTitle.address);

  const constitution = await upgradeProxy(existingConstitution.address, Constitution, {deployer});
  console.log('Upgraded Constitution', constitution.address);

  const catanKeeper = await upgradeProxy(existingCatanKeeper.address, CatanKeeper, {deployer});
  console.log('Upgraded CatanKeeper', catanKeeper.address);

  const catanstitution = await upgradeProxy(existingCatanstitution.address, Catanstitution, {deployer});
  console.log('Upgraded Catanstitution', catanstitution.address);
};
