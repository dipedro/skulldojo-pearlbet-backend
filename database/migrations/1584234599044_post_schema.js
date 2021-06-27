"use strict";

const Schema = use("Schema");

class PostSchema extends Schema {
  up() {
    this.collection("posts", collection => {
      collection.index(
        "location_index",
        { location: "2dsphere" },
        { "2dsphereIndexVersion": 2 }
      );
    });
  }

  down() {
    this.collection("users", collection => {
      // reverse alternations
      collection.dropIndex("location_index");
    });
  }
}

module.exports = PostSchema;
