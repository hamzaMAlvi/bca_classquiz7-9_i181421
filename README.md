# BCA_ClassQuiz-07/08/09
Solution to the Class Quiz 07/08/09 in the course Blockchain and its Application offered in Spring 2020 at FAST-NU.

This application require blockchain to operate.

To operate at a local machine, setup Ganache and Truffle.

The smart contracts for blockchain written in solidity are present in folder truffle/contracts.

Deploy these contracts on local blockchain provided by ganache using truffle before running the application.

The statement of the task is given below:

You need to create a full stack decentralized voting app with following functionality:

1. There should be an option to add choices on which others can vote. Only owner can add the choices.
2. It should be possible to restrict only specific account/addresses to vote, only owner can add the addresses.
3. It is not possible to vote unless choices count reaches some threshold value, say 5 choices.
4. An account can only vote ONCE
5. Once a total number of votes (choose some number) have been casted, the winner is chosen and anyone can then query for winner.
6. ...
