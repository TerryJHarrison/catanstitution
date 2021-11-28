//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library Games {
    struct TwoPlayer {
        address player_1;
        address player_2;
        uint8 player_1_vp;
        uint8 player_2_vp;
        string variation;
    }

    struct ThreePlayer {
        address player_1;
        address player_2;
        address player_3;
        uint8 player_1_vp;
        uint8 player_2_vp;
        uint8 player_3_vp;
        string variation;
    }

    struct FourPlayer {
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

    struct FivePlayer {
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

    struct SixPlayer {
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
}