"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class UnauthorizedException extends LogicalException {
  constructor() {
    super(...arguments);
    this.status = 401;
    this.message = "You are unauthorized to access this content";
  }
}

module.exports = UnauthorizedException;
