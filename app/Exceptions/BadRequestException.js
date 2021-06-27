"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class BadRequestException extends LogicalException {
  constructor(domain) {
    super(...arguments);
    this.status = 400;
    this.message = domain + " bad request";
  }
}

module.exports = BadRequestException;
