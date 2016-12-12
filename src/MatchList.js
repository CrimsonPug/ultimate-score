import React, { Component } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import './App.css';

class MatchList extends Component{
    constructor(){
        super();
        this.state = ({
            match:[],
            team: []
        })
        this.saveMatch = this.saveMatch.bind(this)
    }
    saveMatch(match){ 
        localStorage.matchId = match.matchID
    }
    componentDidMount(){
        axios.get('/createTeam/allMatch')
        .then((res)=>{
            let matchArr = [];
            let teamList = res.data.teamList;
            for(let i=0; i<res.data.matchList.length; i++){
                let matchDescription = res.data.matchList[i].home_team + ' ' + res.data.matchList[i].final_score + ' ' + res.data.matchList[i].away_team
                let matchInfo = {
                    matchDescription:matchDescription,
                    matchID:res.data.matchList[i].id
                }
                matchArr.push(matchInfo)               
            }
            console.log(matchArr)
            this.setState({
                match:matchArr,
                team:teamList
            })
        })
    }
    render(){
        let style={"width":"50px","height":"50px"}
        return(
            <div className="row">
                <div className="col-sm-5 col-sm-offset-1">
                    <h3>Available Matches</h3>
                    {
                        this.state.match.map((match)=>{
                            return(
                                <div>
                                    <Link to="/match">
                                        <div className="well " onClick={()=>this.saveMatch(match)} value={match.matchID}>
                                            <h4>{match.matchDescription}</h4>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }                   
                </div>
                <div className="col-sm-5 ">
                    <h3>Available Teams</h3>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Team</th>
                                <th>Abbr</th>
                                <th>Logo</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.team.map((teams)=>{
                            return (
                                <tr>
                                <td>{teams.team_name}</td>
                                <td>{teams.abbr}</td>
                                <td><img className="img-circle logo"
                                        style={style}
                                        src={teams.team_logo}/>
                                </td>
                            </tr>
                            )
                        })}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export {MatchList};