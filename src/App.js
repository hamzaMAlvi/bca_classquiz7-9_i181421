import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button, Box, TextField } from "@material-ui/core";
import Web3 from "web3";
import * as electionConfig from "./config";
import './App.css'
import Login from "./Login";

function getContract() {
  const web3 = new Web3("http://localhost:7545");
  const electionContract = new web3.eth.Contract(electionConfig.ELECTION_ABI, electionConfig.ELECTION_ADDRESS);
  return electionContract
}
async function checkAccount(address) {
  if (Web3.utils.isAddress(address)) {
    const web3 = new Web3("http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    if (accounts.indexOf(address) > -1) {
      return 'MT';
    }
    return 'Warn2';
  }
  return 'Warn1';
}

export async function getChoices() {
  const contract = getContract();
  const noChoices = await contract.methods.choicesCount().call();
  var choices = []
  for (var i = 0; i < noChoices; i++) {
    const tmp = await contract.methods.choices(i).call();
    choices = choices.concat(tmp);
  }
  return choices;
}
export async function AddChoice(_owner, _choice) {
  const tmp = await checkAccount(_choice);
  if (tmp === 'MT') {
    getContract().methods.addChoice(_choice).send({ from: _owner });
    return ''
  }
  return tmp;
}
export async function AddVoter(_owner, _voter) {
  const tmp = await checkAccount(_voter);
  if (tmp === 'MT') {
    getContract().methods.addVoter(_voter).send({ from: _owner });
    return ''
  }
  return tmp;
}
export async function isOwner(address) {
  const contractOwner = await getContract().methods.owner().call();
  return contractOwner === address;
}
export async function voterExists(address) {
  const contract = getContract();
  const noVoters = await contract.methods.votersCount().call();
  for (var i = 0; i < noVoters; i++) {
    var tmp = await contract.methods.voters(i).call();
    if (address === tmp) {
      return true;
    }
  }
  return false;
}
export async function canCastVote(address) {
  const contract = getContract();
  const choicesCount = await contract.methods.choicesCount().call();
  if (choicesCount < electionConfig.ELECTION_CHOICES_THRESHOLD) {
    return 'Warn1'
  }
  const voteState = await contract.methods.voted(address).call();
  return voteState;
}
export async function castVote(_voter, _choice) {
  await getContract().methods.vote(_choice).send({ from: _voter });
  return '';
}
export async function getWinner() {
  const contract = getContract();
  const castedVotes = await contract.methods.votesCasted().call();
  if (castedVotes < electionConfig.ELECTION_VOTING_THRESHOLD) {
    return '1'
  } else {
    const winner = await contract.methods.whoisWinner().call();
    return winner
  }
}

export class Header extends Component {
  render() {
    return (
      <Box className='apptitle'>
        <h1>Hamza Mustafa Alvi (i18-1421)</h1>
      </Box>
    );
  }
}
export class SomeHeading extends Component {
  render() {
    return (
      <h3 className='apptitle'>{this.props.heading}</h3>
    );
  }
}
export class InputOption extends Component {
  render() {
    return (
      <Box className='apptitle' m={3}>
        <TextField variant='outlined' label='Enter a Address' value={this.props.address} onChange={this.props.edited} size='small' style={{ width: 600 }} />
        <br />
        <label>{this.props.warn}</label>
        <br />
        <br />
        <Button variant="outlined" color='primary' onClick={this.props.handleclick}>
          {this.props.text}
        </Button>
      </Box>
    );
  }
}
export class Input extends Component {
  render() {
    return (
      <Box className='apptitle' m={1}>
        <TextField variant='outlined' label='Enter Your Address' value={this.props.address} onChange={this.props.edited} size='small' style={{ width: 600 }} />
        <br />
        <label>{this.props.warning}</label>
      </Box>
    );
  }
}
export class MyButton extends Component {
  render() {
    return (
      <Box className='apptitle' m={this.props.val}>
        <Button variant="outlined" color='primary' onClick={this.props.handleclick}>
          {this.props.text}
        </Button>
      </Box>
    );
  }
}
export class LogoutButton extends Component {
  logout = () => {
    ReactDOM.render(<Login />, document.getElementById("root"));
  };
  render() {
    return (
      <Box className='logout' m={1}>
        <Button variant="outlined" color='secondary' onClick={this.logout}>
          Logout
        </Button>
      </Box>
    );
  }
}
