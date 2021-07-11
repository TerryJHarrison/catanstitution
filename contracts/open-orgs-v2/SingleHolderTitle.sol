//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract SingleHolderTitle is ERC721Upgradeable, AccessControlUpgradeable {

    bytes32 public constant TITLE_OPERATOR = keccak256("TITLE_OPERATOR");

    function initialize(string memory _title, string memory _titleAbbreviation, address _holder, address _titleOperator) public initializer {
        ERC721Upgradeable.__ERC721_init(_title, _titleAbbreviation);

        _setupRole(DEFAULT_ADMIN_ROLE, _titleOperator);
        _setupRole(TITLE_OPERATOR, _titleOperator);

        _mint(_holder, 0);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721Upgradeable, AccessControlUpgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function changeHolder(address newHolder) onlyRole(TITLE_OPERATOR) public {
        //bypass approval check, always allowing operator to change holder
        _safeTransfer(holder(), newHolder, 0, ""); //TODO: get data from somewhere?
    }

    function _changeHolder(address newHolder) internal {
        //bypass approval check, allowing implementing contracts to change holders programmatically
        _safeTransfer(holder(), newHolder, 0, ""); //TODO: get data from somewhere?
    }

    function holder() public virtual returns (address) {
        return ownerOf(0);
    }
}
