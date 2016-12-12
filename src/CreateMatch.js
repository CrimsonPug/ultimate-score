import React, { Component } from 'react';
import axios from 'axios';
import {Modal,Button,Tooltip,OverlayTrigger} from 'react-bootstrap';
import {Footer} from './Footer';
import {Link} from 'react-router';
import './create.css';

class CreateMatch extends Component{
    constructor(){
        super();
        this.state =({
            teams:[],
            homeTeam:null,
            awayTeam:null,
            showModal:false,
            homeAttributes:'',
            awayAttributes:''
        })
        this.pickHome = this.pickHome.bind(this)
        this.pickAway = this.pickAway.bind(this)
        this.close =this.close.bind(this)
        this.open = this.open.bind(this)
        this.saveMatch = this.saveMatch.bind(this)
    }
    saveMatch(){  
        let objData = Object.assign(this.state.homeAttributes,this.state.awayAttributes)
        console.log(objData)
        this.setState({
            showModal:false
        })
        axios.post('/createTeam/addMatch',objData)
        .then((res)=>{
            console.log(res.data)
            location.href ="/private"
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
        console.log(this.state.homeAttributes)
    }
    pickHome(e){
        console.log(e.target.value)
        this.setState({
            homeTeam:e.target.value
        })
        setTimeout(()=>{
            let homeAttributes = {
                homeTeamId:this.state.teams[this.state.homeTeam].id,
                homeTeam:this.state.teams[this.state.homeTeam].team_name
            }
            this.setState({
                homeAttributes:homeAttributes
            })
        },100)        
    }
    pickAway(e){
        console.log(e.target.value)
        this.setState({
            awayTeam:e.target.value
        })
        setTimeout(()=>{
            let awayAttributes = {
                awayTeamId:this.state.teams[this.state.awayTeam].id,
                awayTeam:this.state.teams[this.state.awayTeam].team_name
            }
            this.setState({
                awayAttributes:awayAttributes
            })
        },100)       
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
        return(
            <div>
                <div className="banner create-match">
                    <div className="banner-wrapper">
                        <h1 className="create-title">Create Match</h1>
                        <h4 className="create-title">Select Home Team and Away Team</h4>
                    </div>
                </div>
                <div className="pick-container">
                    <div className="row">
                        <div className="panel panel-primary col-lg-5 slct">
                            <div className="panel-body">
                                <h2>Select Home Team</h2>
                            </div>
                            <div className="panel-footer">
                                <select value={this.state.team} onChange={this.pickHome} className="form-control">
                                    <option>Choose Home Team...</option>
                                    {
                                        this.state.teams.map((team,i)=>{
                                            return(
                                                <option value={i}>{team.team_name}</option>
                                            )
                                        })
                                    }                              
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-5 col-lg-offset-2 panel panel-danger slct">
                            <div className="panel-body">
                                <h2>Select Away Team</h2>
                            </div>
                            <div className="panel-footer">
                                <select value={this.state.team} onChange={this.pickAway}className="form-control">
                                    <option>Choose Away Team...</option>
                                    {
                                        this.state.teams.map((team,i)=>{
                                            return(
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
                            <h3>Your team isn't here? Create one!</h3>
                            <Link to="/createTeam">
                                <button type="button" className="btn btn-default btn-lg btn-block">Create Team</button>
                            </Link>                        
                        </div>
                    </div>    
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-3">
                            <h3>All Set? Let's get going?</h3>
                            <button onClick={this.open} type="button" className="btn btn-primary btn-lg btn-block">Save Match</button>
                            <Modal show={this.state.showModal} onHide={this.close}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Review your match</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <h4>Match Up</h4>
                                    <p>{this.state.homeAttributes.homeTeam} vs {this.state.awayAttributes.awayTeam}</p>
                                    <hr />
                                    <h4>Confirm?</h4>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.saveMatch} bsStyle="primary">Submit Match</Button>
                                    <Button onClick={this.close}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export {CreateMatch};