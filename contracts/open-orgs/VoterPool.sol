//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol";

contract VoterPool is ERC721Upgradeable, AccessControlUpgradeable {

    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.AddressSet;

    bytes32 public constant REGISTRATION_MANAGER = keccak256("REGISTRATION_MANAGER_ROLE");

    EnumerableSetUpgradeable.AddressSet private voters;

    function initialize() public initializer {
        ERC721Upgradeable.__ERC721_init("VoterPool", "VP");
        _safeMint(msg.sender, 1);

        _setRoleAdmin(REGISTRATION_MANAGER, REGISTRATION_MANAGER);
        _setupRole(REGISTRATION_MANAGER, msg.sender);
    }

    function registerVoter(address voter) public onlyRole(REGISTRATION_MANAGER) {
        if(!isVoter(voter)){
            voters.add(voter);
            emit VoterRegistered(voter, voters.length());
        }
    }

    function unregisterVoter(address voter) public onlyRole(REGISTRATION_MANAGER) {
        voters.remove(voter);
        emit VoterUnregistered(voter, voters.length());
    }

    function isVoter(address voter) public virtual returns (bool){
        return voters.contains(voter);
    }

    function numVoters() public virtual returns (uint256) {
        return voters.length();
    }

    function getVoter(uint256 index) public virtual returns (address) {
        return voters.at(index);
    }

    event VoterRegistered (
        address indexed voter,
        uint256 indexed voterNum
    );

    event VoterUnregistered (
        address indexed voter,
        uint256 indexed voterNum
    );

    function supportsInterface(bytes4 interfaceId) public view override(ERC721Upgradeable, AccessControlUpgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
