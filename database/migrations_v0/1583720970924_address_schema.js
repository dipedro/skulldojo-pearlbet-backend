"use strict";

const Schema = use("Schema");

class AddressSchema extends Schema {
  up() {
    this.create("addresses", table => {
      table.increments().primary();
      table
        .integer("tenant_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tenants")
        .index();
      table
        .string("place", 60)
        .notNullable()
        .defaultTo("");
      table
        .string("number", 20)
        .notNullable()
        .defaultTo("");
      table
        .string("complement", 60)
        .notNullable()
        .defaultTo("");
      table
        .string("reference", 60)
        .notNullable()
        .defaultTo("");
      table
        .string("neighborhood", 60)
        .notNullable()
        .defaultTo("");
      table
        .string("zipcode", 8)
        .notNullable()
        .defaultTo("");
      table
        .string("city", 100)
        .notNullable()
        .defaultTo("");
      table
        .string("state", 2)
        .notNullable()
        .defaultTo("");
      table.specificType("coordinates", "geometry(point, 4326)");
      table.timestamps(true, true);
      table
        .boolean("status")
        .notNullable()
        .defaultTo(true);
    });
  }

  down() {
    this.drop("addresses");
  }
}

module.exports = AddressSchema;
