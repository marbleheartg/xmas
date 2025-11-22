// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Whitelist is Ownable {
    uint256 public start;

    mapping(address => bool) public whitelisted;

    constructor() Ownable(msg.sender) {
        start = block.timestamp;
    }

    function lfg() external {
        require(block.timestamp < start + 7 days, "Whitelist period ended");
        require(!whitelisted[msg.sender], "Already whitelisted");
        whitelisted[msg.sender] = true;
    }

    function startWhitelist() external onlyOwner {
        start = block.timestamp;
    }
}
