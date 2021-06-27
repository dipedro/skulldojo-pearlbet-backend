"use strict";

const Rollbar = use("rollbar");
const BaseExceptionHandler = use("BaseExceptionHandler");
const Env = use("Env");

class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { response, request }) {
    if (Env.get("ROLLBAR_TOKEN")) {
      const rollbar = new Rollbar({
        accessToken: Env.get("ROLLBAR_TOKEN"),
        verbose: true,
        captureUncaught: true,
        captureUnhandledRejections: true,
        captureUsername: true,
        environment: Env.get("NODE_ENV"),
        autoInstrument: {
          network: true,
          log: true,
          dom: true,
          navigation: true,
          connectivity: true
        },
        payload: {
          // person: ...,
          context: request.all()
        }
      });

      const cb = function(rollbarErr) {
        if (rollbarErr) {
          log(`Error reporting to rollbar, ignoring: ${rollbarErr}`);
        }
      };

      Rollbar.configure({
        logLevel: "info",
        payload: { environment: "staging", context: "home#index" }
      });
      rollbar.error(error, request.request, cb);
    }

    response.status(error.status).send({
      error: {
        ...error,
        status: error.status,
        name: error.name,
        message: error.message,
        stack: error.stack.split("\n")
      }
    });
  }
}

module.exports = ExceptionHandler;
