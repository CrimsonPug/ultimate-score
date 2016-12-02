
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('open-matches').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('open-matches').insert({id: 1, home_team_id: 2, away_team_id:1, "home_team": "Alberta FC", "away_team": "Brainstation",final_score:"0-0",home_stats:"[]",away_stats:"[]"})
      ]);
    });
};
