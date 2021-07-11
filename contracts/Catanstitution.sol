//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "./open-orgs-v2/TitleAccess.sol";
import "./open-orgs-v2/VoterAccess.sol";
import "./open-orgs-v2/VoterPool.sol";
import "./open-orgs-v2/FluidVoteTitle.sol";
import "./Games.sol";

contract Catanstitution is ERC1155Upgradeable, TitleAccess, VoterAccess {

    //Token IDs
    uint256 public constant CVR = 0;
    uint256 public constant CKG = 1;

    //TODO: implement NFTs that can be claimed for various achievements
    //First Blood: Win the first game in player bracket
    //Bloodbath: Win a game by 5 or more points
    //Record Keeper: Record 10 games
    //Explorers: Record a game variety that isn't the Base
    //Robber Baron: Win a game by a single point
    //Pillaged: Lose a game by a single point
    //Ruler for a Time: Be elected Ruler of Catan (must claim while ruler / or keep history) - starting ruler is not eligible
    //Sacred Keeper: Be elected Keeper of the Catanstitution (must claim while have title / or have history) - starting keeper is eligible
    //Winning Streaks in a single bracket in order
    //Winning Streaks in games with a specific number of players


    //TODO: NFTs that automatically change hands when new games are entered based on various stats
    //Rightful Ruler of Catan: whoever has the most overall victories
    //The Power House: whoever has the largest margin of victory
    //Weakest Link: whoever has the most overall last places

    //Titles and Votes
    VoterPool public cvrHolders;
    FluidVoteTitle public rulerOfCatan;
    FluidVoteTitle public keeperOfTheCatanstitution;

    function initialize() public initializer {
        ERC1155Upgradeable.__ERC1155_init("https://api.catanstitution.online/{id}.json");

        _mint(msg.sender, CVR, 6, "CatanstitutionVotingRights");
        cvrHolders = new VoterPool();
        cvrHolders.registerVoter(msg.sender);

        rulerOfCatan = new FluidVoteTitle("Ruler of Catan", "RoC", msg.sender, cvrHolders, address(this));
        keeperOfTheCatanstitution = new FluidVoteTitle("Keeper of the Catanstitution", "KotC", msg.sender, cvrHolders, address(this));
    }

    ///////////// Catanstitution
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

    function mintCvr(address to, uint256 amount) public onlyTitleHolder(keeperOfTheCatanstitution) {
        _mint(to, CVR, amount, "CatanstitutionVotingRights");
        //TODO: determine if we need to register or not
        cvrHolders.registerVoter(to);
    }

    function proposeAmendment(string memory amendment) public onlyVoters(cvrHolders) {
        require(proposals[msg.sender].status != AmendmentStatus.PROPOSED, "You already have a proposal active, only one per registered voter");

        numProposedAmendments++;
        Amendment memory a = Amendment(numProposedAmendments, amendment, msg.sender, AmendmentStatus.PROPOSED, 1);
        proposals[msg.sender] = a;
        proposalVotes[msg.sender][numProposedAmendments] = VoteStatus.FOR;
    }

    function voteOnProposedAmendment(bool vote, address activeProposal) public onlyVoters(cvrHolders) {
        require(proposalVotes[msg.sender][proposals[activeProposal].amendmentNum] == VoteStatus.NOT_VOTED, "You have already voted on this proposal, you may not change your vote");

        //Set vote
        if (vote) { proposalVotes[msg.sender][proposals[activeProposal].amendmentNum] = VoteStatus.FOR; }
        else { proposalVotes[msg.sender][proposals[activeProposal].amendmentNum] = VoteStatus.AGAINST; }

        //Update number of cast votes
        proposals[activeProposal].numVotes++;
        if(proposals[activeProposal].numVotes == cvrHolders.numVoters()){ //all votes are cast, resolve proposal
            _resolveAmendmentVote(proposals[activeProposal].amendmentNum);
        }
    }

    function _resolveAmendmentVote(uint256 amendmentNum) internal {
        uint256 numVoters = cvrHolders.numVoters();
        //Count votes - weighted by CVR owned
        uint256 votesFor = 0;
        for (uint256 i = 0; i < numVoters; i++) {
            address voter = cvrHolders.voterRegistrations(i);
            if(proposalVotes[voter][amendmentNum] == VoteStatus.FOR){
                votesFor += balanceOf(voter, CVR);
            }
        }

        //Find the amendment
        Amendment memory a;
        for (uint256 i = 0; i < numVoters; i++) {
            address voter = cvrHolders.voterRegistrations(i);
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

    ///////////// Catan Keeper
    //Counters tracking the total number of games recorded
    uint256 public twoPlayerGameId;
    uint256 public threePlayerGameId;
    uint256 public fourPlayerGameId;
    uint256 public fivePlayerGameId;
    uint256 public sixPlayerGameId;

    mapping(uint256 => Games.TwoPlayerGame) public recordedTwoPlayerGames;
    mapping(uint256 => Games.ThreePlayerGame) public recordedThreePlayerGames;
    mapping(uint256 => Games.FourPlayerGame) public recordedFourPlayerGames;
    mapping(uint256 => Games.FivePlayerGame) public recordedFivePlayerGames;
    mapping(uint256 => Games.SixPlayerGame) public recordedSixPlayerGames;

    //Functions to record new games
    function recordTwoPlayerGame(Games.TwoPlayerGame memory game) public onlyVoters(cvrHolders) {
        recordedTwoPlayerGames[twoPlayerGameId++] = game;
        _mint(msg.sender, CKG, 1, "CatanKeeperGovernance");
    }

    function recordThreePlayerGame(Games.ThreePlayerGame memory game) public onlyVoters(cvrHolders) {
        recordedThreePlayerGames[threePlayerGameId++] = game;
        _mint(msg.sender, CKG, 1, "CatanKeeperGovernance");
    }

    function recordFourPlayerGame(Games.FourPlayerGame memory game) public onlyVoters(cvrHolders) {
        recordedFourPlayerGames[fourPlayerGameId++] = game;
        _mint(msg.sender, CKG, 1, "CatanKeeperGovernance");
    }

    function recordFivePlayerGame(Games.FivePlayerGame memory game) public onlyVoters(cvrHolders) {
        recordedFivePlayerGames[fivePlayerGameId++] = game;
        _mint(msg.sender, CKG, 1, "CatanKeeperGovernance");
    }

    function recordSixPlayerGame(Games.SixPlayerGame memory game) public onlyVoters(cvrHolders) {
        recordedSixPlayerGames[sixPlayerGameId++] = game;
        _mint(msg.sender, CKG, 1, "CatanKeeperGovernance");
    }
}
