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
//retrieve all the matches on dashboard page
router.get('/allMatch',(req,res)=>{
    Match
	.fetchAll()
	.then(matches => {
		let matchList = matches.models.map(match => match.attributes)
        Team
        .fetchAll()
        .then(teams => {
            let teamList = teams.models.map(team => team.attributes)
            res.json({matchList:matchList,teamList:teamList})
        })
	})
})
//adding new match into the database
router.post('/addMatch',(req,res)=>{
    console.log(req.body)
    const newMatch = new Match({
        home_team_id:req.body.homeTeamId,
        away_team_id:req.body.awayTeamId,
        home_team:req.body.homeTeam,
        away_team:req.body.awayTeam,
        final_score:"0-0",
        home_stats:"[]",
        away_stats:"[]",
    })
    console.log(newMatch.home_team)
    newMatch.save() 
    .then(match =>{
        res.json(match)
    })
})
//adding new team into the database
router.post('/addTeam',(req,res)=>{
    console.log(req.body)
    if (req.body.team_name === undefined){
        res.send('Please fill in the name')
    }else {
        let saveLogo;
        if (req.body.team_logo === null){
            saveLogo = "http://all4ed.org/wp-content/themes/all4ed/assets/images/avatar-placeholder-generic.png"
        }else{
            saveLogo = req.body.team_logo
        }
        const newTeam = new Team({
            team_name:req.body.team_name,
            abbr:req.body.abbr,
            team_logo:saveLogo
        })
        newTeam.save()
        .then(team =>{
            // const newPlayer = new Player(
            //     req.body.players
            // )
            // newPlayer.save()
            // .then(player =>{
            //     console.log(player)
                res.json(team)
            // })
        })
    }
})

//adding new players into the database
router.post('/addPlayer',(req,res)=>{
    console.log(req.body)
    let playerArr = [];
    for (let i=0; i<req.body.length; i++){
        if (req.body[i].name === undefined){
            res.send('Please fill in the name')
        }else { 
            const newPlayer = new Player(
            req.body[i]
            )
            newPlayer.save()
            .then(player => {
                playerArr.push(newPlayer)
                if (playerArr.length === req.body.length){
                res.json(playerArr)
                }
            })
        }
    }
})

//get request fetch all team for create players page
router.get('/teams',(req,res)=>{
    Team
	.fetchAll()
	.then(teams => {
        console.log('it is fetching')
		res.json(teams.models.map(team => team.attributes))
	})
})

module.exports = router;