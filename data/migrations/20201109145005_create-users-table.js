
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl=>{
      tbl.increments();

      tbl.text('username',50)
        .unique()
        .notNullable();
      tbl.text('password',50)
        .notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users');
};
