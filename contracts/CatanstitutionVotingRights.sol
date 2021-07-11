//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./open-orgs/ERC20VoterToken.sol";
import "./open-orgs/FluidVoteTitleV1.sol";

contract CatanstitutionVotingRights is ERC20VoterToken {

    FluidVoteTitleV1 public rulerOfCatan;
    FluidVoteTitleV1 public keeperOfTheCatanstitution;

    enum AmendmentStatus { PASSED, FAILED, PROPOSED }
    enum VoteStatus { NOT_VOTED, FOR, AGAINST }

    struct Amendment {
        uint256 amendmentNum; //proposal number
        string text;
        address author;
        AmendmentStatus status;
        uint256 numVotes; //how many voters voted on this amendment
    }

    //Catanstitution
    uint256 public numAcceptedAmendments;
    uint256 public numProposedAmendments;
    mapping(uint256 => Amendment) public catanstitution; //passed and ratified amendments
    mapping(address => Amendment) public proposals; //one proposal per registered voter allowed
    mapping(address => mapping(uint256 => VoteStatus)) public proposalVotes; //recorded votes for all proposals

    function initialize() public initializer {
        ERC20VoterToken.initialize("CatanstitutionVotingRights", "CVR");
        rulerOfCatan = new FluidVoteTitleV1("Ruler of Catan", msg.sender, this);
        keeperOfTheCatanstitution = new FluidVoteTitleV1("Keeper of the Catanstitution", msg.sender, this);
    }

    function mint(address to, uint256 amount) public override virtual onlyTitleHolder(keeperOfTheCatanstitution) {
        super.mint(to, amount);
        //TODO: determine if we need to register or not
        rulerOfCatan.registerNewVoter(to);
        keeperOfTheCatanstitution.registerNewVoter(to);
    }

    function proposeAmendment(string memory amendment) public {
        require(balanceOf(msg.sender) > 0, "Must own CVR to propose amendments");
        require(proposals[msg.sender].status != AmendmentStatus.PROPOSED, "You already have a proposal active, only one per registered voter");

        numProposedAmendments++;
        Amendment memory a = Amendment(numProposedAmendments, amendment, msg.sender, AmendmentStatus.PROPOSED, 1);
        proposals[msg.sender] = a;
        proposalVotes[msg.sender][numProposedAmendments] = VoteStatus.FOR;
    }

    function voteOnProposedAmendment(bool vote, address activeProposal) public {
        require(balanceOf(msg.sender) > 0, "Must own CVR to vote on proposals");
        require(proposalVotes[msg.sender][proposals[activeProposal].amendmentNum] == VoteStatus.NOT_VOTED, "You have already voted on this proposal, you may not change your vote");

        //Set vote
        if (vote) { proposalVotes[msg.sender][proposals[activeProposal].amendmentNum] = VoteStatus.FOR; }
        else { proposalVotes[msg.sender][proposals[activeProposal].amendmentNum] = VoteStatus.AGAINST; }

        //Update number of cast votes
        proposals[activeProposal].numVotes++;
        if(proposals[activeProposal].numVotes == numVoters){ //all votes are cast, resolve proposal
            _resolveAmendmentVote(proposals[activeProposal].amendmentNum);
        }
    }

    function _resolveAmendmentVote(uint256 amendmentNum) internal {
        //Count votes - weighted by CVR owned
        uint256 votesFor = 0;
        for (uint256 i = 0; i < numVoters; i++) {
            address voter = voterRegistrations[i];
            if(proposalVotes[voter][amendmentNum] == VoteStatus.FOR){
                votesFor += balanceOf(voter);
            }
        }

        //Find the amendment
        Amendment memory a;
        for (uint256 i = 0; i < numVoters; i++) {
            address voter = voterRegistrations[i];
            if(proposals[voter].amendmentNum == amendmentNum){
                a = proposals[voter];
                break;
            }
        }

        //Requires all but one voter to pass
        if(votesFor >= numVoters - 1){
            //Pass amendment
            catanstitution[++numAcceptedAmendments] = a;
            proposals[a.author].status = AmendmentStatus.PASSED;
        } else {
            proposals[a.author].status = AmendmentStatus.FAILED;
        }
    }

    function resolveAmendment(uint256 amendmentNum) public onlyTitleHolder(rulerOfCatan) {
        //TODO: check if enough votes have been cast
        _resolveAmendmentVote(amendmentNum);
    }
}
