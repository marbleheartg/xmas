// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.5.0
pragma solidity ^0.8.33;

import { ERC1155Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import { ERC1155SupplyUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Xmas is Initializable, ERC1155Upgradeable, ERC1155SupplyUpgradeable, OwnableUpgradeable {
    event Gift(address indexed sender, address indexed recipient, uint8 id, bytes message);

    error WrongId();
    error WishTooLong();

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address initialOwner) public initializer {
        __ERC1155_init("ipfs://bafybeicgztdwoh3ye7hdzcxyulfcflbfbqfgfcvrvupf5kpbxaxyzkqoey/{id}.json");
        __Ownable_init(initialOwner);
        __ERC1155Supply_init();
    }

    // function initializeV2(...) public reinitializer(2) {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address to, uint8 id, bytes calldata message) public {
        if (id > 8) revert WrongId();
        if (message.length > 256) revert WishTooLong();

        _mint(to, id, 1, "");

        emit Gift(msg.sender, to, id, message);
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override(ERC1155Upgradeable, ERC1155SupplyUpgradeable) {
        super._update(from, to, ids, values);
    }
}
