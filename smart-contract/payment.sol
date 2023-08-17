// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.6.0 <0.9.0;

contract Will {
    address owner;
    uint fortune;
    bool deceased;

    constructor() payable {
        owner = msg.sender;
        fortune = msg.value;
        deceased = false;
    }

    // create modifier
    modifier isOwner() {
        require(msg.sender == owner, "Only owner access this function.");
        _;
    }

    modifier mustBeDeceased() {
        require(deceased == true, "Allow for deceased.");
        _;
    }

    address payable[] familyWallets;
    // create mapping
    mapping(address => uint) inhertiance;

    // create set inheritance function
    function setInheritance(address payable wallet, uint amount) public {
        familyWallets.push(wallet);
        inhertiance[wallet] = amount;
    }

    // create payout function
    function payout() private mustBeDeceased {
        for (uint i = 0; i < familyWallets.length; i++) {
            familyWallets[i].transfer(inhertiance[familyWallets[i]]);
        }
    }

    // set deceased-payout function
    function setDeceasedAndPayout() public isOwner {
        deceased = true;
        payout();
    }
}
