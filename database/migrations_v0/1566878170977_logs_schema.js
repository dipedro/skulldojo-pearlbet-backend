"use strict";

const Schema = use("Schema");

class LogsSchema extends Schema {
  up() {
    this.create("logs", table => {
      table.increments().primary();
      table.string("source", 20).notNullable();
      table.string("method", 20).notNullable();
      table.string("ip", 200).notNullable();
      table.string("originalUrl", 1000).nullable();
      table.string("url", 1000).nullable();
      table.string("user", 200).nullable();
      table.text("rawBody").nullable();
      table.text("body").nullable();
      table.text("headers").nullable();
      table.timestamps(true, true);
    });
  }

  down() {
    this.drop("logs");
  }
}

module.exports = LogsSchema;
