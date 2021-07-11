const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const VoterPool = artifacts.require("VoterPool");
const FluidVoteTitle = artifacts.require("FluidVoteTitle");
const Constitution = artifacts.require("Constitution");
const CatanKeeper = artifacts.require("CatanKeeper");
const Catanstitution = artifacts.require("Catanstitution");

module.exports = async function (deployer) {
  const voterPool = await deployProxy(
      VoterPool,
      [],
      {deployer});
  console.log('Deployed CVR VoterPool at ', voterPool.address);

  const constitution = await deployProxy(
      Constitution,
      ["Catanstitution", "CTN", voterPool.address],
      {deployer});
  console.log("Deployed Catanstitution's Constitution at ", constitution.address);

  const catanKeeper = await deployProxy(
      CatanKeeper,
      ["CatanKeeper", "CK", voterPool.address],
      {deployer});
  console.log('Deployed CatanKeeper at ', catanKeeper.address);

  const rulerOfCatan = await deployProxy(
      FluidVoteTitle,
      ["Ruler of Catan", "RoC", voterPool.address],
      {deployer});
  console.log('Deployed Ruler Of Catan FluidVoteTitle at ', rulerOfCatan.address);

  const keeperOfTheCatanstitution = await deployProxy(
      FluidVoteTitle,
      ["Keeper of the Catanstitution", "KotC", voterPool.address],
      {deployer});
  console.log('Deployed Keeper Of The Catanstitution FluidVoteTitle at ', keeperOfTheCatanstitution.address);

  const catanstitution = await deployProxy(
      Catanstitution,
      [voterPool.address, constitution.address, catanKeeper.address, rulerOfCatan.address, keeperOfTheCatanstitution.address],
      {deployer});
  console.log('Deployed Catanstitution at ', catanstitution.address);
};
