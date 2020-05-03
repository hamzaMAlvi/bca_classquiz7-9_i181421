import React, { Component } from "react";
import { Header, LogoutButton, getChoices, canCastVote, castVote } from './App'
import './App.css'
import { TextField, MenuItem, Box, Button } from '@material-ui/core';

class Voter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choices: [],
            selectedChoice: '',
            canVoteMessage: '',
            canVote: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.vote = this.vote.bind(this);
    }
    async componentDidMount() {
        const choices = await getChoices();
        this.setState({ choices: choices });
        const tmp = await canCastVote(this.props.address);
        if (tmp === 'Warn1') {
            this.setState({ canVoteMessage: 'You can not Vote because the reqired number of choices are not reached' });
        } else if (tmp === true) {
            this.setState({ canVoteMessage: 'You can not Vote because you have already voted once' });
        } else {
            this.setState({ canVote: false });
        }
    }
    handleChange(event) {
        this.setState({ selectedChoice: event.target.value });
    }
    vote() {
        if (this.state.selectedChoice === '')
            this.setState({ canVoteMessage: 'Please Select a Choice' });
        else {
            castVote(this.props.address, this.state.selectedChoice);
            this.setState({ selectedChoice: '', canVote: true });
            this.setState({ canVoteMessage: 'Your Vote has been casted. You can not Vote more than once' });
        }
    }

    render() {
        const choices = this.state.choices;
        const listChoices = choices.map((c) =>
            <MenuItem value={c}>{c}</MenuItem>
        );
        return (
            <div>
                <Header />
                <LogoutButton />
                <Box className='apptitle' m={2}>
                    <TextField variant='outlined' label='Select a Choice'
                        value={this.state.selectedChoice} onChange={this.handleChange} size='small'
                        style={{ width: 600 }} select
                    >
                        {listChoices}
                    </TextField>
                    <br />
                    <label>{this.state.canVoteMessage}</label>
                    <br />
                    <br />
                    <Button variant="outlined" color='primary' onClick={this.vote} disabled={this.state.canVote}>Vote</Button>
                </Box>
            </div>
        );
    }
}

export default Voter;
