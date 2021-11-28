const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const VoterPool = artifacts.require("VoterPool");
const FluidVoteTitle = artifacts.require("FluidVoteTitle");
const Constitution = artifacts.require("Constitution");
const CatanKeeper = artifacts.require("CatanKeeper");
const Catanstitution = artifacts.require("Catanstitution");
const UserNameRegistry = artifacts.require("UserNameRegistry");

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

  const userNameRegistry = await deployProxy(
      UserNameRegistry,
      [],
      {deployer});
  console.log("Deployed user name registry at ", userNameRegistry.address);

  const catanstitution = await deployProxy(
      Catanstitution,
      [voterPool.address, constitution.address, catanKeeper.address, rulerOfCatan.address, keeperOfTheCatanstitution.address, userNameRegistry.address],
      {deployer});
  console.log('Deployed Catanstitution at ', catanstitution.address);

  const catanKeeperManager = await catanKeeper.MANAGER();
  await catanKeeper.grantRole(catanKeeperManager, catanstitution.address);
  await catanKeeper.setGovernanceToken(catanstitution.address, 0);
  console.log('Setup CatanKeeper manager and governance token');

  const constitutionManager = await constitution.MANAGER();
  await constitution.grantRole(constitutionManager, catanstitution.address);
  await constitution.setResolver(rulerOfCatan.address);
  console.log('Setup Constitution manager and resolver');

  const registrationManager = await voterPool.REGISTRATION_MANAGER();
  await voterPool.grantRole(registrationManager, catanstitution.address);
  console.log('Set voter pool registration manager');

  let titleOperator = await rulerOfCatan.TITLE_OPERATOR();
  await rulerOfCatan.grantRole(titleOperator, catanstitution.address);
  console.log('Updated Ruler of Catan title operator');

  titleOperator = await keeperOfTheCatanstitution.TITLE_OPERATOR();
  await keeperOfTheCatanstitution.grantRole(titleOperator, catanstitution.address);
  console.log('Updated Keeper Of The Catanstitution title operator');
};
