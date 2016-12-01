
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('open-matches').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('open-matches').insert({id: 1, "home-team-id": 2, "away-team-id":1, "home-team": "Alberta FC", "away-team": "Furious George"})
      ]);
    });
};
