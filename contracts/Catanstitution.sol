//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "./open-orgs/TitleAccess.sol";
import "./open-orgs/VoterAccess.sol";
import "./open-orgs/VoterPool.sol";
import "./open-orgs/FluidVoteTitle.sol";
import "./open-orgs/Constitution.sol";
import "./CatanKeeper.sol";
import "./UserNameRegistry.sol";

contract Catanstitution is ERC1155Upgradeable, ERC1155BurnableUpgradeable, TitleAccess, VoterAccess, AccessControlUpgradeable {

    bytes32 public constant GAME_RECORDER = keccak256("GAME_RECORDER");

    //Tokens
    uint256 public constant CVR = 0;
    uint256 public constant CKG = 1;

    //Games and Trophies
    CatanKeeper public catanKeeper;
    uint256 public constant RRoC = 2; // Rightful Ruler of Catan - most overall victories
    uint256 public constant PH = 3; // Power House - largest margin of victory
    uint256 public constant JaS = 4; // Just a Settler - most overall last places

    address public deFactoRRoC;
    address public deFactoPH;
    address public deFactoJaS;

    //Titles and Votes
    VoterPool public cvrHolders;
    FluidVoteTitle public rulerOfCatan;
    FluidVoteTitle public keeperOfTheCatanstitution;
    Constitution public constitution;

    //Users
    UserNameRegistry public userNames;

    function initialize(
        VoterPool _cvrHolders,
        Constitution _catanstitution,
        CatanKeeper _catanKeeper,
        FluidVoteTitle _rulerOfCatan,
        FluidVoteTitle _keeperOfTheCatanstitution,
        UserNameRegistry _userNames
    ) public initializer {
        ERC1155Upgradeable.__ERC1155_init("https://api.catanstitution.online/{id}.json");

        cvrHolders = _cvrHolders;
        rulerOfCatan = _rulerOfCatan;
        keeperOfTheCatanstitution = _keeperOfTheCatanstitution;
        constitution = _catanstitution;
        catanKeeper = _catanKeeper;
        userNames = _userNames;

        _setRoleAdmin(GAME_RECORDER, GAME_RECORDER);
        _setupRole(GAME_RECORDER, address(catanKeeper));

        //Mint claimable trophy NFTs during contract creation
        _mint(msg.sender, RRoC, 1, "Rightful Ruler of Catan");
        _mint(msg.sender, PH, 1, "Power House");
        _mint(msg.sender, JaS, 1, "Just a Settler");
        deFactoRRoC = msg.sender;
        deFactoPH = msg.sender;
        deFactoJaS = msg.sender;
    }

    //Keeper must mint voter tokens to themselves and distribute for better transparency
    function mintVoterToken(address voter, uint256 amount) public onlyTitleHolder(keeperOfTheCatanstitution) {
        require(amount > 0, "Can not mint nothing");

        _mint(voter, CVR, amount, "CVR");
        cvrHolders.registerVoter(voter);
    }

    function mintGameToken(address account) public onlyRole(GAME_RECORDER) {
        _mint(account, CKG, 1, "CKG");
    }

    function burn(address account, uint256 id, uint256 value) public virtual override {
        require(id == CVR || id == CKG, "Can not destroy claimable trophies");
        super.burn(account, id, value);

        //if burning the last of someones CVR, unregister them
        if(id == CVR && value == balanceOf(account, id)){
            cvrHolders.unregisterVoter(account);
        }
    }

    //Must be called by each voter after all CVR is distributed, new CVR requires re-calling by all voters
    function registerForTrophies() public onlyVoters(cvrHolders) {
        for(uint256 i = 0; i < cvrHolders.numVoters(); i++){
            address voter = cvrHolders.getVoter(i);
            if(msg.sender != voter){
                setApprovalForAll(voter, true);
            }
        }
    }

    // NFTs that can change hands based off game stats
    function transferClaimableTrophies() public onlyVoters(cvrHolders) {
        uint256 deJureRRoCWins = catanKeeper.wins(deFactoRRoC);
        uint256 deJurePHWinMargin = catanKeeper.highestWinMargin(deFactoPH);
        uint256 deJureJaSLosses = catanKeeper.losses(deFactoJaS);

        for(uint256 i = 0; i < cvrHolders.numVoters(); i++){
            address voter = cvrHolders.getVoter(i);

            if(catanKeeper.wins(voter) > deJureRRoCWins && voter != deFactoRRoC){
                safeTransferFrom(deFactoRRoC, voter, RRoC, 1, "Rightful Ruler of Catan");
                deFactoRRoC = voter;
            }

            if(catanKeeper.highestWinMargin(voter) > deJurePHWinMargin && voter != deFactoPH){
                safeTransferFrom(deFactoPH, voter, PH, 1, "Power House");
                deFactoPH = voter;
            }

            if(catanKeeper.losses(voter) > deJureJaSLosses && voter != deFactoJaS){
                safeTransferFrom(deFactoJaS, voter, JaS, 1, "Just a Settler");
                deFactoJaS = voter;
            }
        }
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC1155Upgradeable, AccessControlUpgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
