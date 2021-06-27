"use strict";
const UnauthorizedException = use("App/Exceptions/UnauthorizedException");

class AuthJWTCheck {
  async handle({ auth }, next) {
    const isLoggedIn = await auth.check();
    if (isLoggedIn) {
      const token = auth.getAuthHeader();
      const user = await auth.getUser();
      const authenticationJSON = user.toJSON();
      const isValid = token === authenticationJSON.token;
      if (isValid) {
        await next();
        return;
      }
    }
    throw new UnauthorizedException();
  }
}

module.exports = AuthJWTCheck;
