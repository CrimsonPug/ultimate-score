
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('open_teams').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('open_teams').insert({id: 1, team_name: 'BrainStation',initial_seed: 1,abbr:'BSt'}),
        knex('open_teams').insert({id: 2, team_name: 'Alberta FC', initial_seed: 2,abbr:'AFC'}),
      ]);
    });
};
