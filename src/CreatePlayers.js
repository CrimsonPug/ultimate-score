import React, { Component } from 'react';
import {Modal,Button,Tooltip,OverlayTrigger} from 'react-bootstrap';
import axios from 'axios';
import './create.css';

class CreatePlayer extends Component{
    constructor(){
        super();
        this.state = ({
            addPlayer:[],
            showModal:false,
            teams: [],
            chosenTeam:null,
            chosenTeamName:null,
            playerName:null,
            squadNumber:null
        })
        this.addPlayer = this.addPlayer.bind(this)
        this.txtFieldChange = this.txtFieldChange.bind(this)
        this.close = this.close.bind(this)
        this.open = this.open.bind(this)
        this.pickTeam = this.pickTeam.bind(this)
        this.savePlayers = this.savePlayers.bind(this)
    }
    savePlayers(){
        console.log(this.state.addPlayer)
        this.setState({ 
                showModal: false 
            })
        axios.post('/createTeam/addPlayer',this.state.addPlayer)
        .then((res)=>{
            console.log(res.data)
        })

    }
    close() {
        this.setState({ 
                showModal: false 
            })
    }
    open() {
        this.setState({ 
                showModal: true 
            });
    }
    pickTeam(e){
        console.log(e.target.value)
        this.setState({
            chosenTeam:e.target.value,
        })
    }
    txtFieldChange(e){
        if(e.target.name === "playerName"){
            this.state.playerName = e.target.value
        }else if(e.target.name === "squadNumber"){
            this.state.squadNumber = e.target.value
        }
        this.setState({
        playerName:this.state.playerName,
        squadNumber:this.state.squadNumber
    });
    }
    addPlayer(e){
        console.log('added')
        let newAttribute = {
            name:this.state.playerName,
            squad_number:this.state.squadNumber,
            open_team_id:this.state.teams[this.state.chosenTeam].id,
            team_name:this.state.teams[this.state.chosenTeam].team_name
        }
        this.state.addPlayer.push(newAttribute)
        console.log(this.state.addPlayer)
        this.setState({
            playerName:null,
            squadNumber:null,
            chosenTeamName:newAttribute.team_name
        })
        document.getElementById("form").reset();
    }
    componentDidMount(){
        axios.get('/createTeam/teams')
        .then((res) =>{
            console.log(res.data)
            this.setState({
                teams:res.data
            })
        })
    }
    render(){
        const tooltip = (
                    <Tooltip id="tooltip">Add more players</Tooltip>
                    );      
        return(
            <div>
                <div className="banner create-match">
                    <div className="banner-wrapper">
                        <h1 className="create-title">Create Players</h1>
                        <h4 className="create-title">Sign up as a player if you already have a team</h4>
                    </div>
                </div>
                <div className="pick-container">
                    <div className="row">
                        <div className="panel panel-primary col-lg-8 col-lg-offset-2 slct">
                            <div className="panel-body">
                                <h2>Select Your Team</h2>
                            </div>
                            <div className="panel-footer">
                                <select onChange={this.pickTeam} value={this.state.team} className="form-control">
                                    <option>Choose a team...</option>
                                    {   
                                        this.state.teams.map((team,i)=>{
                                            return (
                                                <option value={i}>{team.team_name}</option>
                                            )
                                        })
                                    }                               
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-3">
                            <h3>Your team isn't there? Create One!</h3>
                            <p>
                                <a className="btn btn-default btn-lg btn-block" href="/createTeam" role="button">Create Team</a>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2 panel panel-danger slct">
                            <div className="panel-body">
                                <h2>Players Form</h2>
                            </div>
                            <div className="panel-footer">
                                <form id="form" className="form-inline">
                                    <div className="form-group">
                                        <label for="exampleInputName2">Name</label>
                                        <input 
                                            onChange={this.txtFieldChange}
                                            type="text" 
                                            className="form-control" 
                                            id="exampleInputName2"
                                            name="playerName" 
                                            placeholder="Player Name..."/>
                                    </div>
                                    <div className="form-group">
                                        <label for="squadNumber">Squad Number</label>
                                        <input 
                                            onChange={this.txtFieldChange} 
                                            type="text" 
                                            className="form-control" 
                                            id="squadNumber"
                                            name="squadNumber" 
                                            placeholder="11"/>
                                    </div>
                                    <OverlayTrigger placement="top" overlay={tooltip}>
                                        <Button onClick={this.addPlayer} bsStyle="default">+</Button>
                                    </OverlayTrigger>
                                </form>                               
                            </div>
                        </div>
                    </div>   
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-3">
                            <h3>All Set? Let's get going!</h3>
                            <button onClick={this.open} type="button" className="btn btn-primary btn-lg btn-block">Review Player</button>
                            <Modal show={this.state.showModal} onHide={this.close}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Review your roster</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <h4>Team Name</h4>
                                    <p>{this.state.chosenTeamName}</p>
                                    <hr />
                                    <h4>Team Roster</h4>
                                    {  this.state.addPlayer.map((player)=>{
                                        return(
                                    <p>#{player.squad_number} {player.name}</p>
                                        )    
                                    })    
                                    }
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.savePlayers} bsStyle="primary">Submit Players</Button>
                                    <Button onClick={this.close}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export {CreatePlayer};