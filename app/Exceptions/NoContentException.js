"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class NoContentException extends LogicalException {
  constructor(domain) {
    super(...arguments);
    this.status = 204;
    this.message = domain + " has no content";
  }
}

module.exports = NoContentException;
