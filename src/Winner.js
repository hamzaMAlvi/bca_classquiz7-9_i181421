import React, { Component } from "react";
import { Header } from './App'
import './App.css'
import { Box } from "@material-ui/core";

class Winner extends Component {
    constructor(props) {
        super(props);
        if (this.props.winner === '1') {
            this.state = {
                heading: '',
                value: 'There is no Winner because threshold of votes has not been reached.'
            };
        } else {
            this.state = {
                heading: 'The winner of Election is:',
                value: this.props.winner
            };
        }
    }
    render() {
        return (
            <div>
                <Header />
                <Box className='apptitle' m={20} >
                    <h3>{this.state.heading}</h3>
                    <br />
                    <text>{this.state.value}</text>
                </Box>
            </div>
        );
    }
}

export default Winner;
