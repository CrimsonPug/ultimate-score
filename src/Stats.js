import React, { Component } from 'react';
import {Modal,Button,FormGroup,ControlLabel,FormControl} from 'react-bootstrap';
import axios from 'axios';
// import {Edit} from './EditModal'
import './Stats.css';

class Stats extends Component{
    constructor(props){
        super(props);
        console.log(this.props.homeRoster)
        this.state = {
            loading: true,
            homeStats:'',
            awayStats:'',
            deleteScore:'',
            deleteHome:'',
            showModal: false,
            assist:'',
            scorer:'',
            editScore:'',
            roster:this.props.homeRoster
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.handleHomeDelete = this.handleHomeDelete.bind(this)
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.submitEdit = this.submitEdit.bind(this)
        this.changeAssist = this.changeAssist.bind(this)
        this.changeScorer =this.changeScorer.bind(this)
        // this.editModal =  this.editModal.bind(this)
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
    close(){
        console.log(this.state.roster)
        this.setState({
             showModal: false 
            })
  }
    submitEdit(){
        let updatedStats = {
            match: this.props.match,
            editScore: this.state.editScore,
            scorer:this.state.scorer,
            assist:'#'+ this.state.roster[this.state.assist].squadNumber+ ' ' +this.state.roster[this.state.assist].name,
            team: this.state.roster[this.state.assist].teamid
        }
        axios
        .put('/openPlayers/editStats',updatedStats)
        .then((res) => {
            console.log(res.data)
        })
        console.log(updatedStats)
        this.setState({
             showModal: false 
            })
    location.href ="/match";
    }
    open(stats){
        
        if (stats.teamId === 1){
            this.setState({
                editScore: stats.currentScore,
                showModal: true, 
                roster: this.props.awayRoster
                })
                
        }else {
            this.setState({
                roster:this.props.homeRoster,
                editScore: stats.currentScore,
                showModal: true, 
                
            })
        }
    }    
            
    handleDelete(e){
        this.setState({
            deleteScore: e.target.value
        })
        setTimeout(() => {
            this.props.handleDelete(this.state.deleteScore)
            console.log(this.state.deleteScore)
        },200)
    }
    handleHomeDelete(e){
        // console.log(e.target.value)
        this.setState({
            deleteHome: e.target.value
        })
        setTimeout(() => {
            this.props.handleHomeDelete(this.state.deleteHome)
            console.log(this.state.deleteHome)
        },200)
    }
    // editModal(e){
    //     console.log('open modal')
    // }
    componentDidUpdate(prevProps,prevState){
        if (prevProps.currentScore !== this.props.currentScore){
        axios
        .get('/openPlayers/stats')
        .then((res) => {
            console.log('fuck yea')
            let homeStats = res.data.home;
            let awayStats = res.data.away;
            console.log(homeStats,awayStats);
            this.setState({
                homeStats:homeStats,
                awayStats:awayStats
            })
        })
        }else{
            // console.log('hell no')
        }
    }
    componentDidMount(){
        axios
        .get('/openPlayers/stats')
        .then((res) => {
            console.log('componentDidMount in Stats executed')
            let homeStats = res.data.home;
            let awayStats = res.data.away;
            // console.log(awayStats);
            this.setState({
                loading:false,
                homeStats:homeStats,
                awayStats:awayStats
            })
        })
    }

    render(){
        
        if (this.state.loading){
            return(
                <div>loading...</div>
            )
        }else{
        let homeStats = this.state.homeStats;
        let awayStats = this.state.awayStats;
        let homeRoster = this.props.homeRoster;
        let awayRoster = this.props.awayRoster;
        // console.log(awayStats)
        
        return(
            <div className="stats-container">
                <h3>Stats Here!</h3>
                <div className="row">
                <h3>Stats Here!</h3>
                <div className="home-stats col-md-6 col-xs-12">
                    <h4>Alberta Flatball Club</h4>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Score</th>
                                <th>Goal</th>
                                <th>Assist</th>
                            </tr>
                        </thead>
                        <tbody>
                        { homeStats.map((stats) => {
                            return (
                            <tr>
                                <td>{stats.currentScore}</td>
                                <td>{stats.scorer}</td>
                                <td>{stats.assist}</td>
                                <td>
                                    <button type="button"  onClick={()=>this.open(stats)} className="btn btn-warning">Edit</button>
                                    <button value={stats.currentScore} onClick={this.handleHomeDelete} type="button" className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                            
                                )
                            })
                        }
                                      
                        </tbody>
                    </table>
                </div>
                <Modal show={this.state.showModal} onHide={this.close}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Edit Stats of {this.state.editScore}?</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <h4>Select the new Assist and Score</h4>
                                            <FormGroup controlId="formControlsSelect">
                                                <ControlLabel>Select New Scorer</ControlLabel>
                                                <FormControl value={this.state.player} componentClass="select" onChange={this.changeScorer} placeholder="select">
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
                                            <Button onClick={this.submitEdit} bsStyle="primary">Save changes</Button>
                                            <Button onClick={this.close}>Close</Button>
                                        </Modal.Footer>
                            </Modal>
                <div className="away-stats col-md-6 col-xs-12">
                    <h4>Brainstation Ultimate Club</h4>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Score</th>
                                <th>Goal</th>
                                <th>Assist</th>
                            </tr>
                        </thead>
                        <tbody>
                        { awayStats.map((stats) => {
                            return (
                            <tr>
                                <td>{stats.currentScore}</td>
                                <td>{stats.scorer}</td>
                                <td>{stats.assist}</td>
                                <td>
                                    <button type="button" onClick={()=>this.open(stats)} className="btn btn-warning">Edit</button>                                   
                                    <button onClick={this.handleDelete} value={stats.currentScore} type="button" className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                            
                                )
                            })
                        }
                        </tbody>
                    </table>
                    
                </div>
                </div>
            </div>
        )
    }
    }
}

export {Stats};