
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('open_players').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        // knex('open_players').insert({id: 200000, name: 'Alain Chicoine',squad_number:20,open_team_id:2,goals:0,assist:0}),
        // knex('open_players').insert({id: 20000, name: 'Will Crane',squad_number:23,open_team_id:1,goals:0,assist:0}),
      ]);
    });
};
