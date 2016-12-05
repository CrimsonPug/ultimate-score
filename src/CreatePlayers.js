import React, { Component } from 'react';
import {Modal,Button,Tooltip,OverlayTrigger} from 'react-bootstrap';
import './create.css';

class CreatePlayer extends Component{
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
                                <select className="form-control">
                                    <option>1</option>
                                    <option>2</option>                               
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-3">
                            <h3>Your team isn't there? Create One!</h3>
                            <p>
                                <a className="btn btn-default btn-lg btn-block" href="http://localhost:3000/createTeam" role="button">Create Team</a>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2 panel panel-danger slct">
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
                            <button type="button" className="btn btn-primary btn-lg btn-block">Review Player</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export {CreatePlayer};