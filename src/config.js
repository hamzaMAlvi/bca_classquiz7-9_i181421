export const ELECTION_ADDRESS = "0x2820502e711Cadd060e5c50a634dc60A64a32200";
export const ELECTION_ABI = [
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback",
  },
  {
    constant: false,
    inputs: [
      {
        name: "withdraw_amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];
