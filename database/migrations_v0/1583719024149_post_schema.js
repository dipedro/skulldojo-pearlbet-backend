"use strict";

const Schema = use("Schema");

class PostSchema extends Schema {
  up() {
    this.create("posts", table => {
      table.increments().primary();
      table
        .integer("tenant_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tenants")
        .index();
      table
        .integer("created_user")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .index();
      table
        .integer("updated_user")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .index();
      table
        .enu("stage", [
          "PENDING",
          "PUBLISHED",
          "CANCELED",
          "REMOVED",
          "FINISHED"
        ])
        .notNullable()
        .defaultTo("PENDING");
      table
        .datetime("originalDate", { useTz: true, precision: 6 })
        .notNullable();
      table
        .datetime("expiredDate", { useTz: true, precision: 6 })
        .notNullable();
      table.specificType("category_id", "integer[]").nullable();
      table
        .integer("lastCategory_id")
        .unsigned()
        .nullable()
        .references("id")
        .inTable("categories")
        .index();
      table.string("title", 250).notNullable();
      table
        .string("description", 3000)
        .notNullable()
        .defaultTo("");
      table.string("cover", 250).notNullable();
      table.specificType("assets", "TEXT[]").nullable();
      table.specificType("tags", "TEXT[]").nullable();
      table
        .integer("address_id")
        .nullable()
        .references("id")
        .inTable("addresses");
      table
        .numeric("age", 10, 2)
        .notNullable()
        .defaultTo(0.0);
      table
        .boolean("isCollection")
        .notNullable()
        .defaultTo(false);
      table.integer("amount").nullable();
      table
        .numeric("weight", 10, 5)
        .notNullable()
        .defaultTo(0.0);
      table
        .string("unitWeight", 250)
        .notNullable()
        .defaultTo("KG");
      table
        .numeric("price", 10, 2)
        .notNullable()
        .defaultTo(0.0);
      table
        .json("customFields")
        .notNullable()
        .defaultTo("{}");
      table
        .boolean("status")
        .notNullable()
        .defaultTo(true);
    });
  }

  down() {
    this.drop("posts");
  }
}

module.exports = PostSchema;
