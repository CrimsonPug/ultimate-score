
const knex = require('knex')({
  client: 'postgres',
  connection: {
    host     : '127.0.0.1',
    user     : 'postgres',
    password : 'postgres',
    database : 'ultimate',
    charset  : 'utf8'
  }
});
const bookshelf = require('bookshelf')(knex);
var express = require('express');
var router = express.Router();

const Player = bookshelf.Model.extend({
    tableName: 'open_players',
    team: function() {
        return this.belongsTo(Team, 'open_team_id')
    }
})

const Team = bookshelf.Model.extend({
    tableName: 'open_teams',
    players: function() {
        return this.hasMany(Player)
    }
})

const Match = bookshelf.Model.extend({
    tableName: 'open-matches', 
})
//operation needed to key in the score
//retrieving players based on team, re
router.get('/find',(req,res)=>{
    // console.log(req.query);
    // Team
    //     .query( {where: {id: '1'}, orWhere: {id:'2'}})
    //     .fetch({withRelated: 'players'})
    //     .then(team => {
    //          const players = team.related('players')
    //          res.json(players.models.map(player => player.attributes))
    //      })

    let teams;
    Team.where({id:1})
        .fetch({withRelated: 'players'})
        .then(team => {
            const players = team.related('players')
            teams.push(players.models.map(player => player.attributes))
            console.log(teams)
            res.json('meh')
        })
})

//home team update  stats operation in Stats.js in front end
router.put('/putScoreHome',(req,res)=>{
    console.log(req.body)
    //setting up goal property for open_teams table
    let updateHomeGoal = {
            goals: req.body.homeCounter
        }
    //save the new goal for home team in the open_teams table
    new Team({id:req.body.team})
        .save(updateHomeGoal, {patch:true})
        .then(team => {
            //setting up the scorer and assist for that particular point in an object
            let updateStats= {
                currentScore: req.body.currentScore,
                scorer:req.body.scorer,
                assist:req.body.assist,
                teamId:req.body.team
            }
            //finding the stats of the match to be updated
             Match
                .where({id:req.body.match})
                .fetch() 
                .then((match)=>{
                    //parsing the stringify array
                    let home_stats = JSON.parse(match.attributes.home_stats)
                    //push the new object of the stats to update the stats
                    home_stats.push(updateStats);
                    //stringify it again to able to be saved as a string
                    let storeStats = JSON.stringify(home_stats);
                    //setting up the stats to be saved
                    let updateHomeStats = {
                        final_score: req.body.currentScore,
                        home_stats:storeStats
                    }
                    //save that new data
                    new Match({id: req.body.match})
                    .save(updateHomeStats, {patch:true})
                    .then((score)=>{
                        res.json(team.attributes)   
                    })
                })                  
        })
})

//away team update  stats operation in Stats.js in front end
router.put('/putScoreAway',(req,res)=>{
    //setting up goal property for open_teams table
    let updateAwayGoal = {
            goals: req.body.awayCounter
        }
    //save the new goal for away team in the open_teams table
    new Team({id:req.body.team})
        .save(updateAwayGoal, {patch:true})
        .then(team => {
            //setting up the scorer and assist for that particular point in an object
            let updateStats= {
                currentScore: req.body.currentScore,
                scorer:req.body.scorer,
                assist:req.body.assist,
                teamId:req.body.team
            }
            //finding the match to be updated
             Match
                .where({id:req.body.match})
                .fetch()
                .then((match)=>{
                    //parsing the stringify array
                    let away_stats = JSON.parse(match.attributes.away_stats)
                    //push the new object of the stats to update the stats
                    away_stats.push(updateStats);
                    //stringify it again to able to be saved as a string
                    let storeStats = JSON.stringify(away_stats);
                    //setting up the stats to be saved
                    let updateAwayStats = {
                        final_score: req.body.currentScore,
                        away_stats:storeStats
                    }
                    //save that new data
                    new Match({id: req.body.match})
                    .save(updateAwayStats, {patch:true})
                    .then((score)=>{
                        res.json(team.attributes)
                    })
                })         
            
        })
})

//operation or request to alter the team or database
//retrieving all the players
router.post('/',(req,res)=>{
    console.log(req.body)
    let roster = [];
    Player
        .fetchAll() 
        .then(players => {
            roster = players.models.map(player => {
                let name_age = {name: player.attributes.name,
                                squadNumber: player.attributes.squad_number, 
                                teamid: player.attributes.open_team_id,
                                teamName: player.attributes.team_name
                                } 
                return name_age;  
            })
        })
        .then( ()=>{
            return Match
            .where({id:req.body.matchId})
            .fetch()   
        }
        ).then(match => {
                Team 
                .where('id','IN',[match.attributes.home_team_id,match.attributes.away_team_id])
                .fetchAll()
                .then(teams =>{
                    let data = teams.models.map(team => team.attributes)
                    let packageData = {
                        homeAbbr:null,
                        homeLogo:null,
                        awayAbbr:null,
                        awayLogo:null
                    };
                    for (let i=0; i<data.length; i++){
                        if (data[i].id === match.attributes.home_team_id){
                                packageData.homeAbbr= data[i].abbr
                                packageData.homeLogo= data[i].team_logo           
                        }else{                   
                                packageData.awayAbbr=data[i].abbr
                                packageData.awayLogo=data[i].team_logo                        
                        }
                    }                
                    res.json({
                    scoreboardData:packageData,
                    currentScore:match.attributes.final_score,
                    matchId:match.attributes.id,
                    homeTeam:match.attributes.home_team,
                    awayTeam:match.attributes.away_team,
                    homeTeamId:match.attributes.home_team_id,
                    awayTeamId:match.attributes.away_team_id,
                    roster:roster})
        }) 

})
//retrieving updated data to the scoreboard
router.get('/match', (req,res) => {
    Match
    .where({id: 1})
    .fetch()
    .then(match => {
        let matchDetail = {
            score:match.attributes.final_score,
            homeTeam:match.attributes.home_team,
            awayTeam:match.attributes.away_team
        }
        res.json(matchDetail)
    })
})
//retrieving the score and assist stats
router.post('/stats', (req,res) => {

    Match
    .where({id:req.body.matchId})
    .fetch()
    .then(stats => {
        let homeStats = JSON.parse(stats.attributes.home_stats);
        let awayStats = JSON.parse(stats.attributes.away_stats);
        let matchStats = {
            home: homeStats,
            away: awayStats
        }
        // console.log(matchStats)
        res.json(matchStats)
    })  
})
//deleting stats
router.put('/deleteStats',(req,res)=>{  
    console.log(req.body)
        Match
            .where({id:req.body.match})
            .fetch()
            .then((match)=>{
                let found
                let away_stats = JSON.parse(match.attributes.away_stats)
                // console.log(away_stats)
                for (let i = 0; i<away_stats.length; i++){
                    if (away_stats[i].currentScore === req.body.deleteScore){
                        found = i
                        //  res.json(away_stats[i])     
                    }
                }
                if (found === undefined){
                    res.json('not there')
                }else{
                    
                    let deletedStats = away_stats.splice(found,1)
                    let storeStats = JSON.stringify(away_stats)

                    let updatedStats = {
                        final_score:req.body.currentScore,
                        away_stats: storeStats
                    }
                    new Match({id: req.body.match})
                        .save(updatedStats, {patch:true})
                        .then((score)=>{
                            res.json(match.attributes)
                        })   
                }           
            })
})
//delete home team stats 
router.put('/deleteHomeStats',(req,res)=>{  
        console.log(req.body)
        Match
            .where({id:req.body.match})
            .fetch()
            .then((match)=>{
                let found
                let home_stats = JSON.parse(match.attributes.home_stats)
                // console.log(home_stats)
                for (let i = 0; i<home_stats.length; i++){
                    if (home_stats[i].currentScore === req.body.deleteScore){
                        found = i
                        //  res.json(away_stats[i])     
                    }
                }
                if (found === undefined){
                    res.json('not there')
                }else{
                    
                    let deletedStats = home_stats.splice(found,1)
                    let storeStats = JSON.stringify(home_stats)

                    let updatedStats = {
                        final_score:req.body.currentScore,
                        home_stats: storeStats
                    }
                    new Match({id: req.body.match})
                        .save(updatedStats, {patch:true})
                        .then((score)=>{
                            res.json(match.attributes)
                        })   
                }
            
            })
})
//edit team stats
router.put('/editStats',(req,res) =>{
    Match
        .where({id:req.body.match})
        .fetch()
        .then((match) =>{
            let found;
            //verifying the home team
            if (match.attributes.home_team_id === req.body.team){
                //parsing they stringified data
                let home_stats = JSON.parse(match.attributes.home_stats)
                for (let i = 0; i<home_stats.length; i++){
                    //finding the score to edited
                    if (home_stats[i].currentScore === req.body.editScore){
                        found = i
                    }
                }
                if (found === undefined){
                    res.json('not there')
                }else{
                    //naming the stat to be edited
                    let editStat = home_stats[found]
                    //prepping the data to replace 
                    let updatedStats = {
                        currentScore: editStat.currentScore,
                        scorer: req.body.scorer,
                        assist:req.body.assist,
                        teamId:editStat.teamId
                    } 
                    //replace that data that is to be editted 
                    let storeStats = home_stats.splice(found,1,updatedStats)
                    //stringify the stats that is ready to be stored
                    let stringStats = JSON.stringify(home_stats)
                    //prepping the new data to be stored in the right column
                    let newStats = {
                        home_stats: stringStats
                    }
                    //save new data
                    new Match({id:req.body.match})
                        .save(newStats, {patch:true})
                        .then((updated) =>{
                            res.json(match.attributes)
                        })
            }
            }else if (match.attributes.away_team_id === req.body.team){
                //parsing they stringified data
                let away_stats = JSON.parse(match.attributes.away_stats)
                for (let i = 0; i<away_stats.length; i++){
                    //finding the score to edited
                    if (away_stats[i].currentScore === req.body.editScore){
                        found = i
                    }
                }
                if (found === undefined){
                    res.json('not there')
                }else{
                    //naming the stat to be edited
                    let editStat = away_stats[found]
                    //prepping the data to replace 
                    let updatedStats = {
                        currentScore: editStat.currentScore,
                        scorer: req.body.scorer,
                        assist:req.body.assist,
                        teamId:editStat.teamId
                    }
                    //replace that data that is to be editted  
                    let storeStats = away_stats.splice(found,1,updatedStats)
                    //stringify the stats that is ready to be stored
                    let stringStats = JSON.stringify(away_stats)
                    //prepping the new data to be stored in the right column
                    let newStats = {
                        away_stats: stringStats
                    } 
                    //save new data
                    new Match({id:req.body.match})
                        .save(newStats, {patch:true})
                        .then((updated) =>{
                            res.json(match.attributes)
                        })
            }
            }else{
                res.json('lol')
            }
        })
})
//retrieving team based on player
router.get('/team',(req,res)=>{
    console.log(req.query);
    Player.where(req.query)
        .fetch({withRelated: 'team'})
        .then(player => {
            console.log(player)
            res.json(player.related('team').attributes)
        })
})

//adding new players into the database
router.post('/addPlayer',(req,res)=>{
    console.log(req.query)
    if (req.query.name === undefined){
        res.send('Please fill in the name')
    }else {
        const newPlayer = new Player(
        req.query
        )
        newPlayer.save()
        .then(player => {
            res.json(player)
        })
    }
})
module.exports = router;