//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Games.sol";
import "./UInt8Math.sol";

library GameStatsCalculator {

    using UInt8Math for uint8;

    function calculateStats(Games.TwoPlayer memory game) internal pure returns (address, address, uint8) {
        if(game.player_1_vp > game.player_2_vp){
            return (game.player_1, game.player_2, game.player_1_vp - game.player_2_vp);
        } else {
            return (game.player_2, game.player_1, game.player_2_vp - game.player_1_vp);
        }
    }

    function calculateStats(Games.ThreePlayer memory game) internal pure returns (address, address, uint8)  {
        address winner;
        address loser = address(0);
        uint8 winMargin;

        if(game.player_1_vp > game.player_2_vp && game.player_1_vp > game.player_3_vp){ //P1 wins
            winner = game.player_1;

            if(game.player_2_vp == game.player_3_vp){ //No loser
                winMargin = game.player_1_vp - game.player_2_vp;
            } else if(game.player_2_vp > game.player_3_vp) { //P3 loses
                winMargin = game.player_1_vp - game.player_2_vp;
                loser = game.player_3;
            } else { //P2 loses
                winMargin = game.player_1_vp - game.player_3_vp;
                loser = game.player_2;
            }
        } else if (game.player_2_vp > game.player_3_vp) { //P2 wins
            winner = game.player_2;

            if(game.player_1_vp == game.player_3_vp){ //No loser
                winMargin = game.player_2_vp - game.player_1_vp;
            } else if(game.player_1_vp > game.player_3_vp) { //P3 loses
                winMargin = game.player_2_vp - game.player_1_vp;
                loser = game.player_3;
            } else { //P1 loses
                winMargin = game.player_2_vp - game.player_3_vp;
                loser = game.player_1;
            }
        } else { //P3 wins
            winner = game.player_3;

            if(game.player_1_vp == game.player_2_vp){ //No loser
                winMargin = game.player_3_vp - game.player_1_vp;
            } else if(game.player_1_vp > game.player_2_vp) { //P2 loses
                winMargin = game.player_3_vp - game.player_1_vp;
                loser = game.player_2;
            } else { //P1 loses
                winMargin = game.player_3_vp - game.player_2_vp;
                loser = game.player_1;
            }
        }

        return (winner, loser, winMargin);
    }

    function calculateStats(Games.FourPlayer memory game) internal pure returns (address, address, uint8)  {
        address winner;
        address loser = address(0);
        uint8 winMargin;

        if(game.player_1_vp > game.player_2_vp && game.player_1_vp > game.player_3_vp && game.player_1_vp > game.player_4_vp){ //P1 wins
            winner = game.player_1;
            winMargin = game.player_1_vp - game.player_2_vp.max(game.player_3_vp).max(game.player_4_vp);

            if(game.player_2_vp < game.player_3_vp && game.player_2_vp < game.player_4_vp){//P2 loses
                loser = game.player_2;
            } else if(game.player_3_vp < game.player_4_vp) {//P3 loses
                loser = game.player_3;
            } else if(game.player_4_vp < game.player_3_vp){//P4 loses
                loser = game.player_4;
            }
        } else if (game.player_2_vp > game.player_3_vp && game.player_2_vp > game.player_4_vp) { //P2 wins
            winner = game.player_2;
            winMargin = game.player_2_vp - game.player_1_vp.max(game.player_3_vp).max(game.player_4_vp);

            if(game.player_1_vp < game.player_3_vp && game.player_1_vp < game.player_4_vp){//P1 loses
                loser = game.player_1;
            } else if(game.player_3_vp < game.player_4_vp) {//P3 loses
                loser = game.player_3;
            } else if(game.player_4_vp < game.player_3_vp){//P4 loses
                loser = game.player_4;
            }
        } else if(game.player_3_vp > game.player_4_vp) { //P3 wins
            winner = game.player_3;
            winMargin = game.player_3_vp - game.player_1_vp.max(game.player_2_vp).max(game.player_4_vp);

            if(game.player_1_vp < game.player_2_vp && game.player_1_vp < game.player_4_vp){//P1 loses
                loser = game.player_1;
            } else if(game.player_2_vp < game.player_4_vp) {//P2 loses
                loser = game.player_2;
            } else if(game.player_4_vp < game.player_2_vp){//P4 loses
                loser = game.player_4;
            }
        } else { //P4 wins
            winner = game.player_4;
            winMargin = game.player_4_vp - game.player_1_vp.max(game.player_2_vp).max(game.player_3_vp);

            if(game.player_1_vp < game.player_2_vp && game.player_1_vp < game.player_3_vp){//P1 loses
                loser = game.player_1;
            } else if(game.player_2_vp < game.player_3_vp) {//P2 loses
                loser = game.player_2;
            } else if(game.player_3_vp < game.player_2_vp){//P3 loses
                loser = game.player_3;
            }
        }

        return (winner, loser, winMargin);
    }

    function calculateStats(Games.FivePlayer memory game) internal pure returns (address, address, uint8)  {
        address winner;
        address loser = address(0);
        uint8 winMargin;

        if(game.player_1_vp > game.player_2_vp && game.player_1_vp > game.player_3_vp && game.player_1_vp > game.player_4_vp && game.player_1_vp > game.player_5_vp){ //P1 wins
            winner = game.player_1;
            winMargin = game.player_1_vp - game.player_2_vp.max(game.player_3_vp).max(game.player_4_vp).max(game.player_5_vp);

            if(game.player_2_vp < game.player_3_vp && game.player_2_vp < game.player_4_vp && game.player_2_vp < game.player_5_vp){//P2 loses
                loser = game.player_2;
            } else if(game.player_3_vp < game.player_2_vp && game.player_3_vp < game.player_4_vp && game.player_3_vp < game.player_5_vp) {//P3 loses
                loser = game.player_3;
            } else if(game.player_4_vp < game.player_2_vp && game.player_4_vp < game.player_3_vp && game.player_4_vp < game.player_5_vp){//P4 loses
                loser = game.player_4;
            } else if(game.player_5_vp < game.player_2_vp && game.player_5_vp < game.player_3_vp && game.player_5_vp < game.player_4_vp) { //P5 loses
                loser = game.player_5;
            }
        } else if (game.player_2_vp > game.player_3_vp && game.player_2_vp > game.player_4_vp && game.player_2_vp > game.player_5_vp) { //P2 wins
            winner = game.player_2;
            winMargin = game.player_2_vp - game.player_1_vp.max(game.player_3_vp).max(game.player_4_vp).max(game.player_5_vp);

            if(game.player_1_vp < game.player_3_vp && game.player_1_vp < game.player_4_vp && game.player_1_vp < game.player_5_vp){//P1 loses
                loser = game.player_1;
            } else if(game.player_3_vp < game.player_1_vp && game.player_3_vp < game.player_4_vp && game.player_3_vp < game.player_5_vp) {//P3 loses
                loser = game.player_3;
            } else if(game.player_4_vp < game.player_1_vp && game.player_4_vp < game.player_3_vp && game.player_4_vp < game.player_5_vp){//P4 loses
                loser = game.player_4;
            } else if(game.player_5_vp < game.player_1_vp && game.player_5_vp < game.player_3_vp && game.player_5_vp < game.player_4_vp) { //P5 loses
                loser = game.player_5;
            }
        } else if(game.player_3_vp > game.player_4_vp && game.player_3_vp > game.player_5_vp) { //P3 wins
            winner = game.player_3;
            winMargin = game.player_3_vp - game.player_1_vp.max(game.player_2_vp).max(game.player_4_vp).max(game.player_5_vp);

            if(game.player_1_vp < game.player_2_vp && game.player_1_vp < game.player_4_vp && game.player_1_vp < game.player_5_vp){//P1 loses
                loser = game.player_1;
            } else if(game.player_2_vp < game.player_1_vp && game.player_2_vp < game.player_4_vp && game.player_2_vp < game.player_5_vp) {//P2 loses
                loser = game.player_2;
            } else if(game.player_4_vp < game.player_1_vp && game.player_4_vp < game.player_2_vp && game.player_4_vp < game.player_5_vp){//P4 loses
                loser = game.player_4;
            } else if(game.player_5_vp < game.player_1_vp && game.player_5_vp < game.player_2_vp && game.player_5_vp < game.player_4_vp) { //P5 loses
                loser = game.player_5;
            }
        } else if(game.player_4_vp > game.player_5_vp) { //P4 wins
            winner = game.player_4;
            winMargin = game.player_4_vp - game.player_1_vp.max(game.player_2_vp).max(game.player_3_vp).max(game.player_5_vp);

            if(game.player_1_vp < game.player_2_vp && game.player_1_vp < game.player_3_vp && game.player_1_vp < game.player_5_vp){//P1 loses
                loser = game.player_1;
            } else if(game.player_2_vp < game.player_1_vp && game.player_2_vp < game.player_3_vp && game.player_2_vp < game.player_5_vp) {//P2 loses
                loser = game.player_2;
            } else if(game.player_3_vp < game.player_1_vp && game.player_3_vp < game.player_2_vp && game.player_3_vp < game.player_5_vp){//P3 loses
                loser = game.player_3;
            } else if(game.player_5_vp < game.player_1_vp && game.player_5_vp < game.player_2_vp && game.player_5_vp < game.player_3_vp) { //P5 loses
                loser = game.player_5;
            }
        } else { //P5 wins
            winner = game.player_5;
            winMargin = game.player_5_vp - game.player_1_vp.max(game.player_2_vp).max(game.player_3_vp).max(game.player_4_vp);

            if(game.player_1_vp < game.player_2_vp && game.player_1_vp < game.player_3_vp && game.player_1_vp < game.player_4_vp){//P1 loses
                loser = game.player_1;
            } else if(game.player_2_vp < game.player_1_vp && game.player_2_vp < game.player_3_vp && game.player_2_vp < game.player_4_vp) {//P2 loses
                loser = game.player_2;
            } else if(game.player_3_vp < game.player_1_vp && game.player_3_vp < game.player_2_vp && game.player_3_vp < game.player_4_vp){//P3 loses
                loser = game.player_3;
            } else if(game.player_4_vp < game.player_1_vp && game.player_4_vp < game.player_2_vp && game.player_4_vp < game.player_3_vp) { //P4 loses
                loser = game.player_4;
            }
        }

        return (winner, loser, winMargin);
    }

    function calculateStats(Games.SixPlayer memory game) internal pure returns (address, address, uint8)  {
        address winner;
        address loser = address(0);
        uint8 winMargin;

        if(game.player_1_vp > game.player_2_vp && game.player_1_vp > game.player_3_vp && game.player_1_vp > game.player_4_vp && game.player_1_vp > game.player_5_vp && game.player_1_vp > game.player_6_vp){ //P1 wins
            winner = game.player_1;
            winMargin = game.player_1_vp - game.player_2_vp.max(game.player_3_vp).max(game.player_4_vp).max(game.player_5_vp).max(game.player_6_vp);

            if(game.player_2_vp < game.player_3_vp && game.player_2_vp < game.player_4_vp && game.player_2_vp < game.player_5_vp && game.player_2_vp < game.player_6_vp){//P2 loses
                loser = game.player_2;
            } else if(game.player_3_vp < game.player_2_vp && game.player_3_vp < game.player_4_vp && game.player_3_vp < game.player_5_vp && game.player_3_vp < game.player_6_vp) {//P3 loses
                loser = game.player_3;
            } else if(game.player_4_vp < game.player_2_vp && game.player_4_vp < game.player_3_vp && game.player_4_vp < game.player_5_vp && game.player_4_vp < game.player_6_vp){//P4 loses
                loser = game.player_4;
            } else if(game.player_5_vp < game.player_2_vp && game.player_5_vp < game.player_3_vp && game.player_5_vp < game.player_4_vp && game.player_5_vp < game.player_6_vp) { //P5 loses
                loser = game.player_5;
            } else if (game.player_6_vp < game.player_2_vp && game.player_6_vp < game.player_3_vp && game.player_6_vp < game.player_4_vp && game.player_6_vp < game.player_5_vp) { //P6 loses
                loser = game.player_6;
            }
        } else if (game.player_2_vp > game.player_3_vp && game.player_2_vp > game.player_4_vp && game.player_2_vp > game.player_5_vp && game.player_2_vp > game.player_6_vp) { //P2 wins
            winner = game.player_2;
            winMargin = game.player_2_vp - game.player_1_vp.max(game.player_3_vp).max(game.player_4_vp).max(game.player_5_vp).max(game.player_6_vp);

            if(game.player_1_vp < game.player_3_vp && game.player_1_vp < game.player_4_vp && game.player_1_vp < game.player_5_vp && game.player_1_vp < game.player_6_vp){//P1 loses
                loser = game.player_1;
            } else if(game.player_3_vp < game.player_1_vp && game.player_3_vp < game.player_4_vp && game.player_3_vp < game.player_5_vp && game.player_3_vp < game.player_6_vp) {//P3 loses
                loser = game.player_3;
            } else if(game.player_4_vp < game.player_1_vp && game.player_4_vp < game.player_3_vp && game.player_4_vp < game.player_5_vp && game.player_4_vp < game.player_6_vp){//P4 loses
                loser = game.player_4;
            } else if(game.player_5_vp < game.player_1_vp && game.player_5_vp < game.player_3_vp && game.player_5_vp < game.player_4_vp && game.player_5_vp < game.player_6_vp) { //P5 loses
                loser = game.player_5;
            } else if (game.player_6_vp < game.player_1_vp && game.player_6_vp < game.player_3_vp && game.player_6_vp < game.player_4_vp && game.player_6_vp < game.player_5_vp) { //P6 loses
                loser = game.player_6;
            }
        } else if(game.player_3_vp > game.player_4_vp && game.player_3_vp > game.player_5_vp && game.player_3_vp > game.player_6_vp) { //P3 wins
            winner = game.player_3;
            winMargin = game.player_3_vp - game.player_1_vp.max(game.player_2_vp).max(game.player_4_vp).max(game.player_5_vp).max(game.player_6_vp);

            if(game.player_1_vp < game.player_2_vp && game.player_1_vp < game.player_4_vp && game.player_1_vp < game.player_5_vp && game.player_1_vp < game.player_6_vp){//P1 loses
                loser = game.player_1;
            } else if(game.player_2_vp < game.player_1_vp && game.player_2_vp < game.player_4_vp && game.player_2_vp < game.player_5_vp && game.player_2_vp < game.player_6_vp) {//P2 loses
                loser = game.player_2;
            } else if(game.player_4_vp < game.player_1_vp && game.player_4_vp < game.player_2_vp && game.player_4_vp < game.player_5_vp && game.player_4_vp < game.player_6_vp){//P4 loses
                loser = game.player_4;
            } else if(game.player_5_vp < game.player_1_vp && game.player_5_vp < game.player_2_vp && game.player_5_vp < game.player_4_vp && game.player_5_vp < game.player_6_vp) { //P5 loses
                loser = game.player_5;
            } else if (game.player_6_vp < game.player_1_vp && game.player_6_vp < game.player_2_vp && game.player_6_vp < game.player_4_vp && game.player_6_vp < game.player_5_vp) { //P6 loses
                loser = game.player_6;
            }
        } else if(game.player_4_vp > game.player_5_vp && game.player_4_vp > game.player_6_vp) { //P4 wins
            winner = game.player_4;
            winMargin = game.player_4_vp - game.player_1_vp.max(game.player_2_vp).max(game.player_3_vp).max(game.player_5_vp).max(game.player_6_vp);

            if(game.player_1_vp < game.player_2_vp && game.player_1_vp < game.player_3_vp && game.player_1_vp < game.player_5_vp && game.player_1_vp < game.player_6_vp){//P1 loses
                loser = game.player_1;
            } else if(game.player_2_vp < game.player_1_vp && game.player_2_vp < game.player_3_vp && game.player_2_vp < game.player_5_vp && game.player_2_vp < game.player_6_vp) {//P2 loses
                loser = game.player_2;
            } else if(game.player_3_vp < game.player_1_vp && game.player_3_vp < game.player_2_vp && game.player_3_vp < game.player_5_vp && game.player_3_vp < game.player_6_vp){//P3 loses
                loser = game.player_3;
            } else if(game.player_5_vp < game.player_1_vp && game.player_5_vp < game.player_2_vp && game.player_5_vp < game.player_3_vp && game.player_5_vp < game.player_6_vp) { //P5 loses
                loser = game.player_5;
            } else if (game.player_6_vp < game.player_1_vp && game.player_6_vp < game.player_2_vp && game.player_6_vp < game.player_3_vp && game.player_6_vp < game.player_5_vp) { //P6 loses
                loser = game.player_6;
            }
        } else if(game.player_5_vp > game.player_6_vp) { //P5 wins
            winner = game.player_5;
            winMargin = game.player_5_vp - game.player_1_vp.max(game.player_2_vp).max(game.player_3_vp).max(game.player_4_vp).max(game.player_6_vp);

            if(game.player_1_vp < game.player_2_vp && game.player_1_vp < game.player_3_vp && game.player_1_vp < game.player_4_vp && game.player_1_vp < game.player_6_vp){//P1 loses
                loser = game.player_1;
            } else if(game.player_2_vp < game.player_1_vp && game.player_2_vp < game.player_3_vp && game.player_2_vp < game.player_4_vp && game.player_2_vp < game.player_6_vp) {//P2 loses
                loser = game.player_2;
            } else if(game.player_3_vp < game.player_1_vp && game.player_3_vp < game.player_2_vp && game.player_3_vp < game.player_4_vp && game.player_3_vp < game.player_6_vp){//P3 loses
                loser = game.player_3;
            } else if(game.player_4_vp < game.player_1_vp && game.player_4_vp < game.player_2_vp && game.player_4_vp < game.player_3_vp && game.player_4_vp < game.player_6_vp) { //P4 loses
                loser = game.player_4;
            } else if (game.player_6_vp < game.player_1_vp && game.player_6_vp < game.player_2_vp && game.player_6_vp < game.player_3_vp && game.player_6_vp < game.player_4_vp) { //P6 loses
                loser = game.player_6;
            }
        } else { //P6 wins
            winner = game.player_6;
            winMargin = game.player_6_vp - game.player_1_vp.max(game.player_2_vp).max(game.player_3_vp).max(game.player_4_vp).max(game.player_5_vp);

            if(game.player_1_vp < game.player_2_vp && game.player_1_vp < game.player_3_vp && game.player_1_vp < game.player_4_vp && game.player_1_vp < game.player_5_vp){//P1 loses
                loser = game.player_1;
            } else if(game.player_2_vp < game.player_1_vp && game.player_2_vp < game.player_3_vp && game.player_2_vp < game.player_4_vp && game.player_2_vp < game.player_5_vp) {//P2 loses
                loser = game.player_2;
            } else if(game.player_3_vp < game.player_1_vp && game.player_3_vp < game.player_2_vp && game.player_3_vp < game.player_4_vp && game.player_3_vp < game.player_5_vp){//P3 loses
                loser = game.player_3;
            } else if(game.player_4_vp < game.player_1_vp && game.player_4_vp < game.player_2_vp && game.player_4_vp < game.player_3_vp && game.player_4_vp < game.player_5_vp) { //P4 loses
                loser = game.player_4;
            } else if (game.player_5_vp < game.player_1_vp && game.player_5_vp < game.player_2_vp && game.player_5_vp < game.player_3_vp && game.player_5_vp < game.player_4_vp) { //P5 loses
                loser = game.player_5;
            }
        }

        return (winner, loser, winMargin);
    }
}