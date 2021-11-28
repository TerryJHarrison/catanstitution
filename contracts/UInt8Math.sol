// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @dev Standard uint8 math utilities missing in the Solidity language.
 * Copied from MathUpgradeable in OpenZeppelin
 */
library UInt8Math {
    /**
     * @dev Returns the largest of two numbers.
     */
    function max(uint8 a, uint8 b) internal pure returns (uint8) {
        return a >= b ? a : b;
    }

    /**
     * @dev Returns the smallest of two numbers.
     */
    function min(uint8 a, uint8 b) internal pure returns (uint8) {
        return a < b ? a : b;
    }

    /**
     * @dev Returns the average of two numbers. The result is rounded towards
     * zero.
     */
    function average(uint8 a, uint8 b) internal pure returns (uint8) {
        // (a + b) / 2 can overflow, so we distribute
        return (a / 2) + (b / 2) + ((a % 2 + b % 2) / 2);
    }
}
