import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Header, MyButton, Input, isOwner, voterExists, SomeHeading, getWinner } from './App';
import Owner from "./Owner";
import Voter from "./Voter";
import Winner from "./Winner";
import { Box } from "@material-ui/core";

class Login extends Component {
    constructor() {
        super();
        this.state = { address: '', warning: '' };
        this.handleChange = this.handleChange.bind(this);
        this.loginOwner = this.loginOwner.bind(this);
        this.loginVoter = this.loginVoter.bind(this);
    }

    handleChange(event) {
        this.setState({ address: event.target.value });
    }

    async loginOwner(event) {
        var tmp = await isOwner(this.state.address);
        if (tmp) {
            ReactDOM.render(<Owner address={this.state.address} />, document.getElementById("root"));
        }
        this.setState({
            address: '',
            warning: "The given address and the address of Owner does not match"
        });
    };
    async loginVoter(event) {
        var tmp = await voterExists(this.state.address);
        if (tmp) {
            ReactDOM.render(<Voter address={this.state.address} />, document.getElementById("root"));
        }
        this.setState({
            address: '',
            warning: "The is no voter with the given address. Please ask owner to add you as listed voter."
        });
    };
    async displayWinner(event) {
        var tmp = await getWinner();
        ReactDOM.render(<Winner winner={tmp} />, document.getElementById("root"));
    }

    render() {
        return (
            <div>
                <Header />
                <Box m={14} />
                <SomeHeading heading='Login' />
                <Input edited={this.handleChange} warning={this.state.warning} address={this.state.address} />
                <MyButton text='Owner' val={3} handleclick={this.loginOwner} />
                <MyButton text='Voter' val={1} handleclick={this.loginVoter} />
                <Box m={10} />
                <SomeHeading heading='Check Winner of Election' />
                <MyButton text='Winner' val={3} handleclick={this.displayWinner} />
            </div>
        );
    }
}

export default Login;