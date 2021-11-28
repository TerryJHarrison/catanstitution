//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "./open-orgs/TitleAccess.sol";
import "./open-orgs/VoterAccess.sol";
import "./GameStatsCalculator.sol";
import "./Catanstitution.sol";
import "./Games.sol";

contract CatanKeeper is ERC721Upgradeable, TitleAccess, VoterAccess, AccessControlUpgradeable {

    using GameStatsCalculator for Games.TwoPlayer;
    using GameStatsCalculator for Games.ThreePlayer;
    using GameStatsCalculator for Games.FourPlayer;
    using GameStatsCalculator for Games.FivePlayer;
    using GameStatsCalculator for Games.SixPlayer;

    bytes32 public constant MANAGER = keccak256("MANAGER_ROLE");

    Catanstitution controller;
    uint256 tokenId;
    VoterPool allowedRecorders;

    function initialize(string memory _name, string memory _symbol, VoterPool _allowedRecorders) public initializer {
        ERC721Upgradeable.__ERC721_init(_name, _symbol);
        allowedRecorders = _allowedRecorders;

        _setRoleAdmin(MANAGER, MANAGER);
        _setupRole(MANAGER, msg.sender);
    }

    function setGovernanceToken(Catanstitution _controller, uint256 _tokenId) external onlyRole(MANAGER) {
        controller = _controller;
        tokenId = _tokenId;
    }

    uint256 public twoPlayerGameId;
    uint256 public threePlayerGameId;
    uint256 public fourPlayerGameId;
    uint256 public fivePlayerGameId;
    uint256 public sixPlayerGameId;

    mapping(uint256 => Games.TwoPlayer) public recordedTwoPlayerGames;
    mapping(uint256 => Games.ThreePlayer) public recordedThreePlayerGames;
    mapping(uint256 => Games.FourPlayer) public recordedFourPlayerGames;
    mapping(uint256 => Games.FivePlayer) public recordedFivePlayerGames;
    mapping(uint256 => Games.SixPlayer) public recordedSixPlayerGames;

    //Stats tracked for claimable trophies
    mapping(address => uint256) public wins;
    mapping(address => uint256) public losses;
    mapping(address => uint256) public highestWinMargin;

    //Functions to update tracked stats for claimable trophies
    function _saveStats(address winner, address loser, uint8 winMargin) internal {
        wins[winner]++;
        losses[loser]++;
        if(highestWinMargin[winner] < winMargin){
            highestWinMargin[winner] = winMargin;
        }
    }

    function _updateStats(Games.TwoPlayer memory game) internal {
        address winner; address loser; uint8 winMargin;
        (winner, loser, winMargin) = game.calculateStats();
        _saveStats(winner, loser, winMargin);
    }

    function _updateStats(Games.ThreePlayer memory game) internal {
        address winner; address loser; uint8 winMargin;
        (winner, loser, winMargin) = game.calculateStats();
        _saveStats(winner, loser, winMargin);
    }

    function _updateStats(Games.FourPlayer memory game) internal {
        address winner; address loser; uint8 winMargin;
        (winner, loser, winMargin) = game.calculateStats();
        _saveStats(winner, loser, winMargin);
    }

    function _updateStats(Games.FivePlayer memory game) internal {
        address winner; address loser; uint8 winMargin;
        (winner, loser, winMargin) = game.calculateStats();
        _saveStats(winner, loser, winMargin);
    }

    function _updateStats(Games.SixPlayer memory game) internal {
        address winner; address loser; uint8 winMargin;
        (winner, loser, winMargin) = game.calculateStats();
        _saveStats(winner, loser, winMargin);
    }

    //Internal functions to record games
    function _recordTwoPlayerGame(Games.TwoPlayer memory game, address recorder) internal {
        recordedTwoPlayerGames[twoPlayerGameId++] = game;
        controller.mintGameToken(recorder);
        _updateStats(game);
    }

    function _recordThreePlayerGame(Games.ThreePlayer memory game, address recorder) internal {
        recordedThreePlayerGames[threePlayerGameId++] = game;
        controller.mintGameToken(recorder);
        _updateStats(game);
    }

    function _recordFourPlayerGame(Games.FourPlayer memory game, address recorder) internal {
        recordedFourPlayerGames[fourPlayerGameId++] = game;
        controller.mintGameToken(recorder);
        _updateStats(game);
    }

    function _recordFivePlayerGame(Games.FivePlayer memory game, address recorder) internal {
        recordedFivePlayerGames[fivePlayerGameId++] = game;
        controller.mintGameToken(recorder);
        _updateStats(game);
    }

    function _recordSixPlayerGame(Games.SixPlayer memory game, address recorder) internal {
        recordedSixPlayerGames[sixPlayerGameId++] = game;
        controller.mintGameToken(recorder);
        _updateStats(game);
    }

    //Functions to record new games
    function recordTwoPlayerGame(Games.TwoPlayer memory game) external onlyVoters(allowedRecorders) {
        _recordTwoPlayerGame(game, msg.sender);
    }

    function recordThreePlayerGame(Games.ThreePlayer memory game) external onlyVoters(allowedRecorders) {
        _recordThreePlayerGame(game, msg.sender);
    }

    function recordFourPlayerGame(Games.FourPlayer memory game) external onlyVoters(allowedRecorders) {
        _recordFourPlayerGame(game, msg.sender);
    }

    function recordFivePlayerGame(Games.FivePlayer memory game) external onlyVoters(allowedRecorders) {
        _recordFivePlayerGame(game, msg.sender);
    }

    function recordSixPlayerGame(Games.SixPlayer memory game) external onlyVoters(allowedRecorders) {
        _recordSixPlayerGame(game, msg.sender);
    }

    //Admin functions to record historical games
    function recordHistoricalTwoPlayerGame(Games.TwoPlayer memory game, address recorder) public onlyRole(MANAGER) {
        _recordTwoPlayerGame(game, recorder);
    }

    function recordHistoricalThreePlayerGame(Games.ThreePlayer memory game, address recorder) public onlyRole(MANAGER) {
        _recordThreePlayerGame(game, recorder);
    }

    function recordHistoricalFourPlayerGame(Games.FourPlayer memory game, address recorder) public onlyRole(MANAGER) {
        _recordFourPlayerGame(game, recorder);
    }

    function recordHistoricalFivePlayerGame(Games.FivePlayer memory game, address recorder) public onlyRole(MANAGER) {
        _recordFivePlayerGame(game, recorder);
    }

    function recordHistoricalSixPlayerGame(Games.SixPlayer memory game, address recorder) public onlyRole(MANAGER) {
        _recordSixPlayerGame(game, recorder);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721Upgradeable, AccessControlUpgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
