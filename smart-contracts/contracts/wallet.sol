// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Wallet is Ownable {
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    constructor(address initialOwner) Ownable(initialOwner) {}

    function transfer(address token, address to, uint256 amount) public onlyOwner {
        require(IERC20(token).transfer(to, amount), "Transfer Unsuccessful");
    }

    function balanceOf(address token) public view returns(uint256) {
        return IERC20(token).balanceOf(address(this));
    }

    function withdraw(uint256 amount) public onlyOwner {
        require(address(this).balance >= amount, "Insufficient Balance");
        payable(msg.sender).transfer(amount);
    }

    receive() external payable {
        emit Transfer(msg.sender, address(this), msg.value);
    }
    
    fallback() external payable {
        emit Transfer(msg.sender, address(this), msg.value);
    }
}