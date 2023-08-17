// SPDX-License-Identifier: GPL-3.0

pragma solidity >= 0.6.0 <0.9.0;

contract Token {
    address public minter;
    mapping(address=> uint) public balances;

    constructor () {
        minter = msg.sender;
    }

    // create modifier 
    modifier isOwner {
        require(msg.sender == minter, "Allow for owner");
        _;
    }

    // set balance 
    function setBalance(uint amount) public isOwner {
       balances[minter] += amount;
    }

    // generate custom error 
    error balanceError(uint request, uint available);
    error conflictError(string message);

    // send balance 
    function send(address receiver, uint amount) public {
        if(msg.sender == receiver){
            revert conflictError({
                message: "Sender and receiver can't same."
            });
        }
        // check balance is exist 
        if(amount > balances[msg.sender]){
            revert balanceError({
                request: amount,
                available: balances[msg.sender]
            });
        }
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
    }
       
}