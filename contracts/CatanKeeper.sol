//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./open-orgs/TitleAccess.sol";
import "./open-orgs/VoterAccess.sol";
import "./Catanstitution.sol";

contract CatanKeeper is ERC721Upgradeable, TitleAccess, VoterAccess {

    Catanstitution controller;
    uint256 tokenId;
    VoterPool allowedRecorders;

    function initialize(string memory _name, string memory _symbol, VoterPool _allowedRecorders) public initializer {
        ERC721Upgradeable.__ERC721_init(_name, _symbol);
        allowedRecorders = _allowedRecorders;
    }

    //TODO: access control
    function setGovernanceToken(Catanstitution _controller, uint256 _tokenId) public {
        controller = _controller;
        tokenId = _tokenId;
    }

    uint256 public twoPlayerGameId;
    uint256 public threePlayerGameId;
    uint256 public fourPlayerGameId;
    uint256 public fivePlayerGameId;
    uint256 public sixPlayerGameId;

    mapping(uint256 => TwoPlayerGame) public recordedTwoPlayerGames;
    mapping(uint256 => ThreePlayerGame) public recordedThreePlayerGames;
    mapping(uint256 => FourPlayerGame) public recordedFourPlayerGames;
    mapping(uint256 => FivePlayerGame) public recordedFivePlayerGames;
    mapping(uint256 => SixPlayerGame) public recordedSixPlayerGames;

    //Game records, one per num of players
    struct TwoPlayerGame {
        address player_1;
        address player_2;
        uint8 player_1_vp;
        uint8 player_2_vp;
        string variation;
    }

    struct ThreePlayerGame {
        address player_1;
        address player_2;
        address player_3;
        uint8 player_1_vp;
        uint8 player_2_vp;
        uint8 player_3_vp;
        string variation;
    }

    struct FourPlayerGame {
        address player_1;
        address player_2;
        address player_3;
        address player_4;
        uint8 player_1_vp;
        uint8 player_2_vp;
        uint8 player_3_vp;
        uint8 player_4_vp;
        string variation;
    }

    struct FivePlayerGame {
        address player_1;
        address player_2;
        address player_3;
        address player_4;
        address player_5;
        uint8 player_1_vp;
        uint8 player_2_vp;
        uint8 player_3_vp;
        uint8 player_4_vp;
        uint8 player_5_vp;
        string variation;
    }

    struct SixPlayerGame {
        address player_1;
        address player_2;
        address player_3;
        address player_4;
        address player_5;
        address player_6;
        uint8 player_1_vp;
        uint8 player_2_vp;
        uint8 player_3_vp;
        uint8 player_4_vp;
        uint8 player_5_vp;
        uint8 player_6_vp;
        string variation;
    }

    //Functions to record new games
    function recordTwoPlayerGame(TwoPlayerGame memory game) public onlyVoters(allowedRecorders) {
        recordedTwoPlayerGames[twoPlayerGameId++] = game;
        controller.mint(msg.sender, tokenId, 1);
    }

    function recordThreePlayerGame(ThreePlayerGame memory game) public onlyVoters(allowedRecorders) {
        recordedThreePlayerGames[threePlayerGameId++] = game;
        controller.mint(msg.sender, tokenId, 1);
    }

    function recordFourPlayerGame(FourPlayerGame memory game) public onlyVoters(allowedRecorders) {
        recordedFourPlayerGames[fourPlayerGameId++] = game;
        controller.mint(msg.sender, tokenId, 1);
    }

    function recordFivePlayerGame(FivePlayerGame memory game) public onlyVoters(allowedRecorders) {
        recordedFivePlayerGames[fivePlayerGameId++] = game;
        controller.mint(msg.sender, tokenId, 1);
    }

    function recordSixPlayerGame(SixPlayerGame memory game) public onlyVoters(allowedRecorders) {
        recordedSixPlayerGames[sixPlayerGameId++] = game;
        controller.mint(msg.sender, tokenId, 1);
    }
}
