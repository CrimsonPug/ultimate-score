
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('open_teams').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        // knex('open_teams').insert({id: 1, team_name: 'BrainStation',abbr:'BSt',team_logo:'https://pbs.twimg.com/profile_images/658310539861479424/RRT0w90e.png'}),
        // knex('open_teams').insert({id: 2, team_name: 'Alberta FC',abbr:'AFC',team_logo:'https://pbs.twimg.com/profile_images/558112868865155072/NMa8K0Tn_400x400.jpeg'}),
      ]);
    });
};
