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

contract Catanstitution is ERC1155Upgradeable, ERC1155BurnableUpgradeable, TitleAccess, VoterAccess, AccessControlUpgradeable {

    bytes32 public constant CKG_MINTER_ROLE = keccak256("CKG_MINTER_ROLE");

    //Token IDs
    uint256 public constant CVR = 0;
    uint256 public constant CKG = 1;

    //Titles and Votes
    VoterPool public cvrHolders;
    FluidVoteTitle public rulerOfCatan;
    FluidVoteTitle public keeperOfTheCatanstitution;
    Constitution public constitution;
    CatanKeeper public catanKeeper;

    function initialize(VoterPool _cvrHolders, Constitution _catanstitution, CatanKeeper _catanKeeper, FluidVoteTitle _rulerOfCatan, FluidVoteTitle _keeperOfTheCatanstitution) public initializer {
        ERC1155Upgradeable.__ERC1155_init("https://api.catanstitution.online/{id}.json");
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);

        _mint(msg.sender, CVR, 6, "CatanstitutionVotingRights");
        cvrHolders = _cvrHolders;
        cvrHolders.registerVoter(msg.sender);

        rulerOfCatan = _rulerOfCatan;
        keeperOfTheCatanstitution = _keeperOfTheCatanstitution;

        constitution = _catanstitution;
        constitution.setResolver(rulerOfCatan);

        catanKeeper = _catanKeeper;
        catanKeeper.setGovernanceToken(this, CKG);
        _setupRole(CKG_MINTER_ROLE, address(catanKeeper));
    }

    function mint(address account, uint256 id, uint256 amount) public {
        require(
            (id == CKG && hasRole(CKG_MINTER_ROLE, msg.sender)) ||
            (id == CVR && msg.sender == keeperOfTheCatanstitution.holder())
        );
        _mint(account, id, amount, ""); //TODO: determine data based off token id
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC1155Upgradeable, AccessControlUpgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
