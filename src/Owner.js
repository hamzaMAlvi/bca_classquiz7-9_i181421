import React, { Component } from "react";
import { Header, LogoutButton, InputOption, AddChoice, AddVoter } from './App'
import { Box } from "@material-ui/core";

class Owner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choiceAddress: '',
            voterAddress: '',
            choiceWarn: '',
            voterWarn: ''
        }
        this.handleChoiceChange = this.handleChoiceChange.bind(this);
        this.handleVoterChange = this.handleVoterChange.bind(this);
        this.addChoice = this.addChoice.bind(this);
        this.addVoter = this.addVoter.bind(this);
    }
    handleChoiceChange(event) {
        this.setState({ choiceAddress: event.target.value });
    }
    handleVoterChange(event) {
        this.setState({ voterAddress: event.target.value });
    }
    async addChoice() {
        const tmp = await AddChoice(this.props.address, this.state.choiceAddress);
        if (tmp === 'Warn1') {
            this.setState({
                choiceWarn: 'The given address is not a valid address. Please Enter a Valid address'
            });
        } else if (tmp === 'Warn2') {
            this.setState({
                choiceWarn: 'The given address does not exist in the list of known addresses.'
            });
        } else {
            this.setState({
                choiceWarn: 'Choice has been Added', choiceAddress: ''
            });
        }
    }
    async addVoter() {
        const tmp = await AddVoter(this.props.address, this.state.voterAddress);
        if (tmp === 'Warn1') {
            this.setState({
                voterWarn: 'The given address is not a valid address. Please Enter a Valid address'
            });
        } else if (tmp === 'Warn2') {
            this.setState({
                voterWarn: 'The given address does not exist in the list of known addresses.'
            });
        } else {
            this.setState({
                voterWarn: 'Voter has been Added', voterAddress: ''
            });
        }
    }

    render() {
        return (
            <div>
                <Header />
                <LogoutButton />
                <Box m={10} />
                <InputOption text='Add a Choice' handleclick={this.addChoice} warn={this.state.choiceWarn} address={this.state.choiceAddress} edited={this.handleChoiceChange} />
                <Box m={10} />
                <InputOption text='Add a Voter' handleclick={this.addVoter} warn={this.state.voterWarn} address={this.state.voterAddress} edited={this.handleVoterChange} />
            </div>
        );
    }
}

export default Owner;
