
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('open-matches', function (table) {
        table.increments('id').primary(); // adds incrementing int for id
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.integer('home-team-id') // adds a string column
            .notNullable(); // and is required
        table.integer('away-team-id') // adds a string column
            .notNullable(); // and is required
        table.string('home-team').notNullable();
        table.string('away-team').notNullable();
        table.string('final-score');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('open-matches') // drop table when reverting
};
