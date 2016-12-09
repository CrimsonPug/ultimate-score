import React, { Component } from 'react';
import './match.css';
import axios from 'axios';
class ScoreBoard extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentScore: this.props.currentScore,
        }
    }
    componentDidUpdate(prevProps){
        if (prevProps.currentScore !== this.props.currentScore){
        axios
        .get('/openPlayers/match')
        .then((res) => {
            console.log('componentWillUpdate in scoreboard executed')
            this.setState({
                currentScore:res.data.score,
            })
        })
        }
    }
    render(){
        return(
            <div className="jumbotron row">
                <div className="half"></div>
                    <div className="scoreboard col-lg-6 col-md-8 col-sm-10 col-xs-12 col-centered">
                        <div className="team">
                            <div className="homes logo">
                                <img className="img-circle" 
                                    src="https://pbs.twimg.com/profile_images/558112868865155072/NMa8K0Tn_400x400.jpeg"/>
                            </div>
                            <div className="homes name">
                                <h3 className="visible-lg title visible-md hidden-xs visible-sm">{this.props.homeTeam}</h3>
                                <h3 className="visible-xs title hidden-md hidden-lg hidden-sm">AFC</h3>
                            </div>
                            </div>
                            <div className="scoreContainer team">
                                <h2>{this.props.currentScore}</h2>
                            </div>
                            <div className="team">
                            <div className="aways logo">
                                <img className="img-circle" 
                                        src="https://pbs.twimg.com/profile_images/658310539861479424/RRT0w90e.png"/>
                            </div>
                            <div className="aways name">
                                <h3 className="visible-lg title visible-md hidden-sm hidden-xs">{this.props.awayTeam}</h3>
                                <h3 className="visible-sm title visible-xs hidden-md hidden-lg">BSt</h3>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ScoreBoard;