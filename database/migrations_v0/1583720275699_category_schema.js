"use strict";

const Schema = use("Schema");

class CategorySchema extends Schema {
  up() {
    this.create("categories", table => {
      table.increments().primary();
      table
        .integer("tenant_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tenants")
        .index();
      table
        .integer("parentId")
        .nullable()
        .references("id")
        .inTable("categories")
        .onDelete("SET NULL")
        .onUpdate("SET DEFAULT");
      table
        .string("name", 150)
        .notNullable()
        .defaultTo("")
        .index();
      table
        .string("groupName", 150)
        .notNullable()
        .defaultTo("");
      table
        .boolean("standard")
        .notNullable()
        .defaultTo(false);
      table
        .integer("order", 11)
        .notNullable()
        .defaultTo(1);
      table.timestamps(true, true);
      table
        .boolean("status")
        .notNullable()
        .defaultTo(true);
    });
  }

  down() {
    this.drop("categories");
  }
}

module.exports = CategorySchema;
