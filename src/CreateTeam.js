import React, { Component } from 'react';
import {Modal,Button,Tooltip,OverlayTrigger} from 'react-bootstrap';
import './create.css';

class CreateTeam extends Component{
    constructor(){
        super();

    }
    render(){
        const tooltip = (
                    <Tooltip id="tooltip">Add more players</Tooltip>
)                       ;
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
                        <div className="panel panel-primary col-lg-5 slct">
                            <div className="panel-body">
                                <h2>Fill in your team's detail here</h2>
                            </div>
                            <div className="panel-footer">
                                <form>
                                    <div className="form-group">
                                        <label for="exampleInputTeam">Team Name</label>
                                        <input type="text" className="form-control" id="exampleInputTeam" placeholder="Kickass Name"/>                               
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputTeamLogo">URL Link to Team Logo</label>
                                        <input type="text" className="form-control" id="exampleInputTeamLogo" placeholder="URL Link"/>                               
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputTeamAbbr">Team Abbreviation (Short form of team name)</label>
                                        <input type="text" className="form-control" id="exampleInputTeamAbbr" placeholder="AFC"/>                               
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6 col-lg-offset-1 panel panel-danger slct">
                            <div className="panel-body">
                                <h2>Players Form</h2>
                            </div>
                            <div className="panel-footer">
                                <form className="form-inline">
                                    <div className="form-group">
                                        <label for="exampleInputName2">Name</label>
                                        <input type="text" className="form-control" id="exampleInputName2" placeholder="Jane Doe"/>
                                    </div>
                                    <div className="form-group">
                                        <label for="squadNumber">Squad Number</label>
                                        <input type="email" className="form-control" id="squadNumber" placeholder="11"/>
                                    </div>
                                    <OverlayTrigger placement="top" overlay={tooltip}>
                                        <Button bsStyle="default">+</Button>
                                    </OverlayTrigger>
                                </form>                               
                            </div>
                        </div>
                    </div>   
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-3">
                            <h3>All Set? Let's get going!</h3>
                            <button type="button" className="btn btn-primary btn-lg btn-block">Review Team</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export {CreateTeam};