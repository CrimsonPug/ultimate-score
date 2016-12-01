
exports.up = function(knex, Promise) {
     return knex.schema.createTableIfNotExists('users', function (table) {
        table.increments('id').primary(); // adds incrementing int for id
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.string('username') // adds a string column
            .unique() // which has to be unique
            .notNullable(); // and is required
        table.string('password').unique().notNullable()
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users') // drop table when reverting
};
