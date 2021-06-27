"use strict";

const Schema = use("Schema");

class EventSchema extends Schema {
  up() {
    this.create("events", table => {
      table.increments().primary();
      table.string("source", 20).notNullable(); // FILTRO / INTERESSE
      table.string("method", 20).notNullable();
      table
        .integer("tenant_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tenants")
        .index();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .index();
      table.string("title", 500).nullable();
      table.string("description", 3000).nullable();
      table.datetime("readDate", { useTz: true, precision: 6 }).notNullable();
      table.timestamps(true, true);
    });
  }

  down() {
    this.drop("events");
  }
}

module.exports = EventSchema;
