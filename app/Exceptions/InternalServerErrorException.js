"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class InternalServerErrorException extends LogicalException {
  constructor() {
    super(...arguments);
    this.message =
      "An internal server error ocurred, contact the admin of the system";
  }
}

module.exports = InternalServerErrorException;
