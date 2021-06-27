"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class NotFoundException extends LogicalException {
  constructor(domain) {
    super(...arguments);
    this.status = 404;
    this.message = domain + " not found";
  }
}

module.exports = NotFoundException;
