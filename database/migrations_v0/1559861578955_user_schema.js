"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.alter("users", table => {
      // alter
      table
        .integer("lastTenant")
        .nullable()
        .references("id")
        .inTable("tenants");
      table.string("token");
      table.timestamp("token_created_at");
    });
  }

  down() {
    this.table("users", table => {
      // reverse alternations
    });
  }
}

module.exports = UserSchema;
