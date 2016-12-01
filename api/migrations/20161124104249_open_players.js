
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('open_players', function (table) {
        table.increments('id').primary(); // adds incrementing int for id
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.string('name');
        table.integer('squad_number').notNullable();
        table.integer('goals');
        table.integer('assist');
        table.integer('appearances');
        table.integer('open_team_id')
    }) 
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('open_players')
};
