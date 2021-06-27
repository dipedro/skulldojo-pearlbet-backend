"use strict";

class AuthAdmin {
  async handle({ auth }, next) {
    // TODO colocar a regra correta
    const isValid = true;
    if (isValid) await next();
  }
}

module.exports = AuthAdmin;
