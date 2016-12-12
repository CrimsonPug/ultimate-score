import React, { Component } from 'react';
import {Modal,Button,FormGroup,ControlLabel,FormControl} from 'react-bootstrap';
import axios from 'axios';
import './Menu.css';

class Menu extends Component{
    constructor(){
        super();
        this.state= {
            scorer:null,
            assist:null,
            showModal:false,
            roster:[]
        }
        this.openModal = this.openModal.bind(this)
        this.close = this.close.bind(this)
        this.submitScore = this.submitScore.bind(this)
        this.changeAssist = this.changeAssist.bind(this)
        this.changeScorer =this.changeScorer.bind(this)
    }
    changeAssist(e){
        this.setState({
            assist: e.target.value
        })
    }
    changeScorer(e){
        this.setState({
            scorer: e.target.value
        })
    }
    submitScore(){
        let updatedStats = {
            // match: this.props.match,
            scorer:this.state.scorer,
            assist:"#" + this.state.roster[this.state.assist].squadNumber + ' ' + this.state.roster[this.state.assist].name,
            team:this.state.roster[this.state.assist].teamid
        }
        this.props.submitHomeScore(updatedStats)
        this.setState({
            showModal:false
        })
    }
    openModal(e){
        if (e.target.value == this.props.awayTeamId){
            this.setState({
                showModal: true, 
                roster: this.props.awayRoster
                })             
        }else {
            this.setState({
                roster:this.props.homeRoster,
                showModal: true,                 
            })
        }
    }
    close(){
        this.setState({
             showModal: false 
            })
  }

    render(){
       if (this.props.gameOver === true){
            return(
                <div className="Done">
                    <h3>You're Done!</h3>
                </div>
            )
        }else{
        let homeRoster = this.props.homeRoster;
        let awayRoster = this.props.awayRoster;
        let homeBtnId = this.props.homeTeamId;
        let awayBtnId = this.props.awayTeamId;
        return(
            <div className="scoreBtn-container">
                <button type="button" 
                         onClick={this.openModal}
                        value={homeBtnId}
                        className="btn home-score-btn btn-default btn-lg">                                
                    Home Score!
                </button>
                <button type="button" 
                        onClick={this.openModal}
                        value={awayBtnId}
                        className="btn away-score-btn btn-default btn-lg">                               
                    Away Score!
                </button>
                <Modal show={this.state.showModal} onHide={this.close}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Enter the stats here</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <h4>Select the Scorer and Assist</h4>
                                            <FormGroup controlId="formControlsSelect">
                                                <ControlLabel>Select New Scorer</ControlLabel>
                                                <FormControl value={this.state.player} componentClass="select" onChange={this.changeScorer} placeholder="select">
                                                    <option>Pick Somebody...</option> 
                                                    {
                                                        this.state.roster.map((player) => {
                                                            return(
                                                                <option value={'#' + player.squadNumber + ' ' + player.name}>#{player.squadNumber} {player.name}</option>                                 
                                                            )
                                                        })
                                                    }                                     
                                                </FormControl>
                                                <ControlLabel>Select New Assist</ControlLabel>
                                                <FormControl value={this.state.player}  componentClass="select" onChange={this.changeAssist}placeholder="select">
                                                    <option>Pick Somebody...</option> 
                                                    {
                                                        this.state.roster.map((player, i) => {
                                                            return(
                                                                <option value={i}>#{player.squadNumber} {player.name}</option>                                 
                                                            )
                                                        })
                                                    }
                                                </FormControl>
                                            </FormGroup>                                           
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button onClick={this.submitScore} bsStyle="primary">Save changes</Button>
                                            <Button onClick={this.close}>Close</Button>
                                        </Modal.Footer>
                            </Modal>
                        
            </div>
        
        )
        }
    }
}

export {Menu};