
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('open_players').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('open_players').insert({id: 1, name: 'Alain Chicoine',squad_number:20,open_team_id:2}),
        knex('open_players').insert({id: 2, name: 'Andrew Dirgo',squad_number:23,open_team_id:2}),
        knex('open_players').insert({id: 3, name: 'Nigel Greenway',squad_number:9,open_team_id:2}),
        knex('open_players').insert({id: 4, name: 'Derek Monderman',squad_number:3,open_team_id:2}),
        knex('open_players').insert({id: 5, name: 'Jeff Polster',squad_number:10,open_team_id:2}),
        knex('open_players').insert({id: 6, name: 'Ben Juchli',squad_number:13,open_team_id:2}),
        knex('open_players').insert({id: 7, name: 'Aleks K',squad_number:40,open_team_id:1}),
        knex('open_players').insert({id: 8, name: 'Dan DeMaria',squad_number:14,open_team_id:1}),
        knex('open_players').insert({id: 9, name: 'Ryan Chick',squad_number:4,open_team_id:1}),
        knex('open_players').insert({id: 10, name: 'Thuy D',squad_number:3,open_team_id:1}),
        knex('open_players').insert({id: 11, name: 'Will Crane',squad_number:21,open_team_id:1}),
        knex('open_players').insert({id: 12, name: 'Ikram Mustapha',squad_number:33,open_team_id:1}),
      ]);
    });
};
