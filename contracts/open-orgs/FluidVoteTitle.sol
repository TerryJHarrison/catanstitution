//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SingleHolderTitle.sol";
import "./VoterPool.sol";

contract FluidVoteTitle is SingleHolderTitle {

    mapping(address => address) public votes;
    mapping(address => uint256) public voteCounts;
    VoterPool public voters;

    function initialize(string memory _title, string memory _titleAbbreviation, VoterPool _voters) public initializer{
        SingleHolderTitle.initialize(_title, _titleAbbreviation);
        voters = _voters;
    }

    function registerNewVoter(address voter) public {
        votes[voter] = holder();
        voteCounts[holder()]++;
    }

    function unregisterVoter(address voter) public {
        voteCounts[votes[voter]]--;
        votes[voter] = address(0);
    }

    //TODO requires to ensure fair votes
    function voteOnTitle(address chosenAddress) public {
        //update votes
        voteCounts[votes[msg.sender]]--;
        votes[msg.sender] = chosenAddress;
        voteCounts[chosenAddress]++;

        // determine winner
        address elector;
        uint256 electorVotes;
        //TODO: get rid of loop
        for (uint256 i = 0; i < voters.numVoters(); i++) { //all registered voters are eligible to be elected
            address voter = voters.voterRegistrations(i);
            if(voteCounts[voter] > electorVotes){ // elector has clear majority
                elector = voter;
                electorVotes = voteCounts[voter];
            } else if (voteCounts[voter] == electorVotes && voter == holder()){ // elector tied but is current ruler
                elector = voter;
                electorVotes = voteCounts[voter];
            }
        }

        // update title holder
        if(elector != holder()){
            _changeHolder(elector);
        }
    }
}
