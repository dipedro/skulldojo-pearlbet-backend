const { ServiceProvider } = require("@adonisjs/fold");
const Rollbar = require("rollbar");
const dotenv = require("dotenv");
dotenv.config();

class RollbarProvider extends ServiceProvider {
  register() {
    this.app.extend("Adonis/Src/Logger", "rollbar", () => {
      if (process.env.ROLLBAR_TOKEN) {
        const rollbar = new Rollbar({
          accessToken: process.env.ROLLBAR_TOKEN,
          captureUncaught: true,
          captureUnhandledRejections: true
        });

        rollbar.log("Hello PearlBet!");
        return rollbar;
      }
      return false;
    });
  }
}

module.exports = RollbarProvider;
