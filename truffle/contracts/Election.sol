pragma solidity >=0.4.21 <0.7.0;

contract Election {
  address public owner;

  constructor() public {
    owner = msg.sender;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

}
