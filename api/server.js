const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

//application
const app = express();
const PORT = process.env.PORT || 3005;
app.use(bodyParser.json());

//defines which origins and headers are permitted
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
  next();
});

const loginRoutes = require('./routes/login');
const openPlayersRoutes = require('./routes/open_players');

app.use('/login', loginRoutes);
app.use('/openPlayers', openPlayersRoutes);

app.get('*', function(req, res) {
   res.sendFile(path.resolve((__dirname+'./../build/index.html')));
});

app.listen(PORT, () => {
    console.log('Server Started on http://localhost:%s',PORT);
    console.log('Press CTRL + C to stop server');
});