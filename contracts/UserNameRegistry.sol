//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract UserNameRegistry is AccessControlUpgradeable {

    mapping(address => string) public names;

    function updateName(string memory name) public {
        names[msg.sender] = name;
    }

    function initialize() public initializer {}
}
