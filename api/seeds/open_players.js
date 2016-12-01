
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('open_players').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('open_players').insert({id: 1, name: 'Alain Chicoine',squad_number:20,open_team_id:2}),
        knex('open_players').insert({id: 2, name: 'Andrew Dirgo',squad_number:23,open_team_id:2}),
      ]);
    });
};
