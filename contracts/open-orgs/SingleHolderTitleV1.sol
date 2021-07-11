//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

//TODO: make ERC721 - upon init grant approval to contract creator (should be another contract)
//TODO: remove ability to revoke approval to contract creator
//TODO: function to update holder that also transfers the token, must be contract creator
contract SingleHolderTitleV1 is Initializable {
    string public title;
    address public holder;

    function initialize(string memory _title, address _holder) public initializer {
        title = _title;
        holder = _holder;
    }
}
