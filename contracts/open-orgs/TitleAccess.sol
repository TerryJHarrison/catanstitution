//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SingleHolderTitle.sol";

contract TitleAccess {
    modifier onlyTitleHolder(SingleHolderTitle title) {
        require(msg.sender == title.holder(), "Not title holder");
        _;
    }
}
