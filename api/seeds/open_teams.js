
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('open_teams').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('open_teams').insert({id: 1, team_name: 'Furious George',initial_seed: 1}),
        knex('open_teams').insert({id: 2, team_name: 'Alberta FC', initial_seed: 2})
      ]);
    });
};
