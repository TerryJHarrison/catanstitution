//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract VoterPool is ERC721Upgradeable, AccessControlUpgradeable {

    bytes32 public constant REGISTRATION_MANAGER = keccak256("REGISTRATION_MANAGER_ROLE");

    uint256 public numVoters;
    mapping(uint256 => address) public voterRegistrations;
    mapping(address => uint256) public voterRegistrationIndexes;

    function initialize() public initializer {
        ERC721Upgradeable.__ERC721_init("VoterPool", "VP");
        _safeMint(msg.sender, 1);

        _setRoleAdmin(REGISTRATION_MANAGER, REGISTRATION_MANAGER);
        _setupRole(REGISTRATION_MANAGER, msg.sender);
    }

    function registerVoter(address voter) public onlyRole(REGISTRATION_MANAGER) {
        voterRegistrations[numVoters] = voter;
        voterRegistrationIndexes[voter] = numVoters;
        emit VoterRegistered(voter, numVoters++);
    }

    function unregisterVoter(address voter) public onlyRole(REGISTRATION_MANAGER) {
        //TODO: get rid of loop
        //update voter registration for all voters after unregistered index
        for (uint256 i = voterRegistrationIndexes[voter]; i < numVoters; i++) {
            voterRegistrations[i] = voterRegistrations[i + 1]; //last iteration will copy an uninitialized address
        }

        emit VoterUnregistered(voter, numVoters--);
    }

    function isVoter(address voter) public virtual returns (bool){
        uint256 index = voterRegistrationIndexes[voter];
        return voterRegistrations[index] == voter;
    }

    event VoterRegistered (
        address indexed voter,
        uint256 indexed voterNum
    );

    event VoterUnregistered (
        address indexed voter,
        uint256 indexed voterNum
    );
}
