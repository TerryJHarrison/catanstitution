//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "./SingleHolderTitleV1.sol";

contract ERC20VoterToken is ERC20Upgradeable, ERC20BurnableUpgradeable {

    uint256 public numVoters;
    mapping(uint256 => address) public voterRegistrations;
    mapping(address => uint256) public voterRegistrationIndexes;

    function initialize(string memory name, string memory symbol) public initializer {
        ERC20Upgradeable.__ERC20_init(name, symbol);
    }

    function mint(address to, uint256 amount) public virtual {
        if(balanceOf(to) == 0 && amount > 0){ //register new voter
            _registerVoter(to);
        }

        _mint(to, amount);
    }

    function burn(uint256 amount) public override {
        if(balanceOf(msg.sender) == amount){
            _unregisterVoter(msg.sender);
        }
        _burn(msg.sender, amount);
    }

    function _registerVoter(address voter) internal {
        voterRegistrations[numVoters] = voter;
        voterRegistrationIndexes[voter] = numVoters;
        emit VoterRegistered(voter, numVoters++);
    }

    function _unregisterVoter(address voter) internal {
        //update voter registration for all voters after unregistered index
        for (uint256 i = voterRegistrationIndexes[voter]; i < numVoters; i++) {
            voterRegistrations[i] = voterRegistrations[i + 1]; //last iteration will copy an uninitialized address
        }

        emit VoterUnregistered(voter, numVoters--);
    }

    event VoterRegistered (
        address indexed voter,
        uint256 indexed voterNum
    );

    event VoterUnregistered (
        address indexed voter,
        uint256 indexed voterNum
    );

    modifier onlyTitleHolder(SingleHolderTitleV1 title) {
        require(msg.sender == title.holder());
        _;
    }
}
