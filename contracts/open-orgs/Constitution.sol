//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "./TitleAccess.sol";
import "./VoterAccess.sol";
import "./VoterPool.sol";
import "./FluidVoteTitle.sol";

contract Constitution is ERC721Upgradeable, TitleAccess, VoterAccess, AccessControlUpgradeable {

    bytes32 public constant MANAGER = keccak256("MANAGER_ROLE");

    enum AmendmentStatus { PASSED, FAILED, PROPOSED }
    enum VoteStatus { NOT_VOTED, FOR, AGAINST }

    VoterPool voterPool;
    SingleHolderTitle resolver;

    function initialize(string memory _name, string memory _symbol, VoterPool _voterPool) public initializer {
        ERC721Upgradeable.__ERC721_init(_name, _symbol);
        voterPool = _voterPool;

        _setRoleAdmin(MANAGER, MANAGER);
        _setupRole(MANAGER, msg.sender);
    }

    function setResolver(SingleHolderTitle _resolver) public onlyRole(MANAGER) {
        resolver = _resolver;
    }

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
    mapping(uint256 => Amendment) public amendments; //passed and ratified amendments
    mapping(address => Amendment) public proposals; //one proposal per registered voter allowed
    mapping(address => mapping(uint256 => VoteStatus)) public proposalVotes; //recorded votes for all proposals

    function proposeAmendment(string memory amendment) public onlyVoters(voterPool) {
        require(proposals[msg.sender].status != AmendmentStatus.PROPOSED, "You already have a proposal active, only one per registered voter");

        numProposedAmendments++;
        Amendment memory a = Amendment(numProposedAmendments, amendment, msg.sender, AmendmentStatus.PROPOSED, 1);
        proposals[msg.sender] = a;
        proposalVotes[msg.sender][numProposedAmendments] = VoteStatus.FOR;
    }

    function voteOnProposedAmendment(bool vote, address activeProposal) public onlyVoters(voterPool) {
        require(proposalVotes[msg.sender][proposals[activeProposal].amendmentNum] == VoteStatus.NOT_VOTED, "You have already voted on this proposal, you may not change your vote");

        //Set vote
        if (vote) { proposalVotes[msg.sender][proposals[activeProposal].amendmentNum] = VoteStatus.FOR; }
        else { proposalVotes[msg.sender][proposals[activeProposal].amendmentNum] = VoteStatus.AGAINST; }

        //Update number of cast votes
        proposals[activeProposal].numVotes++;
        if(proposals[activeProposal].numVotes == voterPool.numVoters()){ //all votes are cast, resolve proposal
            _resolveAmendmentVote(proposals[activeProposal].amendmentNum);
        }
    }

    function _resolveAmendmentVote(uint256 amendmentNum) internal {
        uint256 numVoters = voterPool.numVoters();
        //Count votes - each voter gets a single vote
        uint256 votesFor = 0;
        for (uint256 i = 0; i < numVoters; i++) {
            address voter = voterPool.getVoter(i);
            if(proposalVotes[voter][amendmentNum] == VoteStatus.FOR){
                votesFor += 1;
            }
        }

        //Find the amendment
        Amendment memory a;
        for (uint256 i = 0; i < numVoters; i++) {
            address voter = voterPool.getVoter(i);
            if(proposals[voter].amendmentNum == amendmentNum){
                a = proposals[voter];
                break;
            }
        }

        //Requires all but one voter to pass
        if(votesFor >= numVoters - 1){
            //Pass amendment
            amendments[++numAcceptedAmendments] = a;
            proposals[a.author].status = AmendmentStatus.PASSED;
        } else {
            proposals[a.author].status = AmendmentStatus.FAILED;
        }
    }

    function resolveAmendment(address proposer) public onlyTitleHolder(resolver) {
        require(proposals[proposer].numVotes >= voterPool.numVoters() - 1, "Not enough votes cast");
        _resolveAmendmentVote(proposals[proposer].amendmentNum);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721Upgradeable, AccessControlUpgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
