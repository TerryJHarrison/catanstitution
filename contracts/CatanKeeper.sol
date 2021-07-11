//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract CatanKeeper is Initializable {

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

    //Counters tracking the total number of games recorded
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

    //Functions to record new games
    function recordTwoPlayerGame(TwoPlayerGame memory game) public {
        recordedTwoPlayerGames[twoPlayerGameId] = game;
        emit NewTwoPlayerGameRecorded(twoPlayerGameId++);
    }

    function recordThreePlayerGame(ThreePlayerGame memory game) public {
        recordedThreePlayerGames[threePlayerGameId] = game;
        emit NewThreePlayerGameRecorded(threePlayerGameId++);
    }

    function recordFourPlayerGame(FourPlayerGame memory game) public {
        recordedFourPlayerGames[fourPlayerGameId] = game;
        emit NewFourPlayerGameRecorded(fourPlayerGameId++);
    }

    function recordFivePlayerGame(FivePlayerGame memory game) public {
        recordedFivePlayerGames[fivePlayerGameId] = game;
        emit NewFivePlayerGameRecorded(fivePlayerGameId++);
    }

    function recordSixPlayerGame(SixPlayerGame memory game) public {
        recordedSixPlayerGames[sixPlayerGameId] = game;
        emit NewSixPlayerGameRecorded(sixPlayerGameId++);
    }

    //Events tracking when games are recorded
    event NewTwoPlayerGameRecorded (
        uint256 indexed twoPlayerGameId
    );

    event NewThreePlayerGameRecorded (
        uint256 indexed threePlayerGameId
    );

    event NewFourPlayerGameRecorded (
        uint256 indexed fourPlayerGameId
    );

    event NewFivePlayerGameRecorded (
        uint256 indexed fivePlayerGameId
    );

    event NewSixPlayerGameRecorded (
        uint256 indexed sixPlayerGameId
    );
}
