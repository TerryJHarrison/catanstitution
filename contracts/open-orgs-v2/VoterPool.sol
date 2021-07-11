//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VoterPool is ERC721, Ownable {

    uint256 public numVoters;
    mapping(uint256 => address) public voterRegistrations;
    mapping(address => uint256) public voterRegistrationIndexes;

    constructor() ERC721("VoterPool", "VP") {
        _safeMint(msg.sender, 1);
    }

    function registerVoter(address voter) public onlyOwner {
        voterRegistrations[numVoters] = voter;
        voterRegistrationIndexes[voter] = numVoters;
        emit VoterRegistered(voter, numVoters++);
    }

    function unregisterVoter(address voter) public onlyOwner {
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
