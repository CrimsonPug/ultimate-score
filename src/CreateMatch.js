import React, { Component } from 'react';
import './create.css';

class CreateMatch extends Component{
    constructor(){
        super();

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
                                <select className="form-control">
                                    <option>1</option>
                                    <option>2</option>                               
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-5 col-lg-offset-2 panel panel-danger slct">
                            <div className="panel-body">
                                <h2>Select Away Team</h2>
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
                            <h3>Your team isn't here? Create one!</h3>
                            <button type="button" className="btn btn-default btn-lg btn-block">Create Team</button>
                        </div>
                    </div>    
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-3">
                            <h3>All Set? Let's get going?</h3>
                            <button type="button" className="btn btn-primary btn-lg btn-block">Save Match</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export {CreateMatch};