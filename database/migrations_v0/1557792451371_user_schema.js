"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", table => {
      table.increments().primary();
      table
        .string("username", 250)
        .notNullable()
        .unique(); //email account
      table.string("password", 100).notNullable();
      table
        .string("firstName", 150)
        .notNullable()
        .defaultTo("");
      table
        .string("lastName", 150)
        .notNullable()
        .defaultTo("");
      table
        .string("avatar", 300)
        .notNullable()
        .defaultTo("");
      table.string("cellphone", 100).nullable();
      table.string("telephone", 100).nullable();
      table.string("email", 250).nullable();
      table
        .integer("address_id")
        .nullable()
        .references("id")
        .inTable("addresses");
      table.timestamps(true, true);
      table
        .boolean("status")
        .notNullable()
        .defaultTo(true);
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
