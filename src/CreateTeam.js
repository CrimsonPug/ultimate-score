import React, { Component } from 'react';
import {Modal,Button} from 'react-bootstrap';
import axios from 'axios';
import './create.css';

class CreateTeam extends Component{
    constructor(){
        super();
        this.state =({
            team_name:null,
            team_logo:null,
            abbr:null,
            showModal:false,
        })
        super();
        this.txtFieldChange = this.txtFieldChange.bind(this)
        this.close = this.close.bind(this)
        this.open = this.open.bind(this)
        this.saveTeam = this.saveTeam.bind(this)
    }
    saveTeam(){
        this.setState({ 
                showModal: false 
            })
        axios.post('/createTeam/addTeam',this.state)
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
    }
    txtFieldChange(e){
        if(e.target.name === "teamName"){
            this.state.team_name = e.target.value
        }else if(e.target.name === "logoURL"){
            this.state.team_logo = e.target.value
        }else if(e.target.name === "teamAbbr"){
            this.state.abbr = e.target.value
        }
        this.setState({
            team_name:this.state.team_name,
            team_logo:this.state.team_logo,
            abbr:this.state.abbr
        });
    }
    render(){
        return(
            <div>
                <div className="banner create-match">
                    <div className="banner-wrapper">
                        <h1 className="create-title">Create Team</h1>
                        <h4 className="create-title">Sign up your team and players!</h4>
                    </div>
                </div>
                <div className="pick-container">
                    <div className="row">
                        <div className="panel panel-primary col-lg-6 col-lg-offset-3 slct">
                            <div className="panel-body">
                                <h2>Fill in your team's detail here</h2>
                            </div>
                            <div className="panel-footer">
                                <form>
                                    <div className="form-group">
                                        <label for="exampleInputTeam">Team Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="exampleInputTeam" 
                                            name="teamName"
                                            onChange={this.txtFieldChange}
                                            placeholder="Kickass Name"/>                               
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputTeamLogo">URL Link to Team Logo</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="exampleInputTeamLogo"
                                            name="logoURL"
                                            onChange={this.txtFieldChange}
                                            placeholder="URL Link"/>                               
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputTeamAbbr">Team Abbreviation (Short form of team name)</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="exampleInputTeamAbbr" 
                                            name="teamAbbr"
                                            onChange={this.txtFieldChange}
                                            placeholder="AFC"/>                               
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>   
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-3">
                            <h3>All Set? Let's get going!</h3>
                            <button onClick={this.open} type="button" className="btn btn-primary btn-lg btn-block">Review Team</button>
                            <Modal show={this.state.showModal} onHide={this.close}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Review your roster</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <h4>Team Name</h4>
                                    <p>{this.state.team_name}</p>
                                    <hr />
                                    <h4>Team Abbr</h4>
                                    <p>{this.state.abbr}</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.saveTeam} bsStyle="primary">Submit Team</Button>
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

export {CreateTeam};