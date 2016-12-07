
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('open_teams', function (table) {
        table.increments('id').primary(); // adds incrementing int for id
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.string('team_name').notNullable();
        table.integer('games_played');
        table.integer('wins');
        table.integer('losses');
        table.integer('goals');
        table.integer('conceded');
        table.integer('goals_diff');
        table.string('abbr');
        table.string('team_logo')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('open_teams')
};
