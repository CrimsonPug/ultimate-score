
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('open-matches', function (table) {
        table.increments('id').primary(); // adds incrementing int for id
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.integer('home_team_id') // adds a string column
            .notNullable(); // and is required
        table.integer('away_team_id') // adds a string column
            .notNullable(); // and is required
        table.string('home_team').notNullable();
        table.string('away_team').notNullable();
        table.string('final_score');
        table.string('home_stats');
        table.string('away_stats');
        table.integer('user_id')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('open-matches') // drop table when reverting
};
