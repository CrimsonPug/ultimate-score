
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('open_players', function (table) {
  table.increments('id').primary(); // adds incrementing int for id
        table.string('name').notNullable();
        table.integer('squad_number').notNullable();
        table.integer('goals');
        table.integer('assist');
        table.integer('open_team_id').notNullable();
        table.string('team_name')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('open_players')
};
