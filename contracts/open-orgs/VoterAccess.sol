//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VoterPool.sol";

contract VoterAccess {
    modifier onlyVoters(VoterPool voters) {
        require(voters.isVoter(msg.sender), "Not a registered voter");
        _;
    }
}
