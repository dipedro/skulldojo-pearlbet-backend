"use strict";

const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.collection("users", collection => {
      collection.index("username_index", { username: 1 }, { unique: true });
    });
  }

  down() {
    this.collection("users", collection => {
      // reverse alternations
      collection.dropIndex("username_index");
    });
  }
}

module.exports = UserSchema;
