"use strict";

const Schema = use("Schema");

class TenantSchema extends Schema {
  up() {
    this.create("tenants", table => {
      table.increments().primary();
      table
        .string("slug", 50)
        .notNullable()
        .unique();
      table
        .integer("user_id")
        .unsigned()
        .nullable()
        .references("id")
        .inTable("users");
      table
        .string("picture", 250)
        .notNullable()
        .defaultTo("");
      table
        .string("name", 250)
        .notNullable()
        .defaultTo("");
      table
        .json("customFields")
        .notNullable()
        .defaultTo("{}");
      table.timestamps(true, true);
      table
        .boolean("status")
        .notNullable()
        .defaultTo(true);
    });
  }

  down() {
    this.drop("tenants");
  }
}

module.exports = TenantSchema;
