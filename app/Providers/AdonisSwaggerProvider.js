"use strict";

const { hooks } = require("@adonisjs/ignitor");
const Route = use("Route");
const Config = use("Config");

const securityDefinition = Object.keys(
  Config.get("swagger.securityDefinitions")
)[0];

function checkMiddlewareAndAddToConfigs(middlewares, middleware, callback) {
  if (
    middlewares.some(
      selectedMiddleware =>
        selectedMiddleware === middleware ||
        selectedMiddleware.startsWith(middleware)
    )
  )
    callback();
}

let routes;
hooks.after.preloading(() => {
  routes = Route.list().reduce((routes, route) => {
    if (route._route === "/swagger.json") return routes;

    route.verbs
      .filter(verb => verb !== "HEAD")
      .forEach(verb => {
        let configs = {
          tags: [route.handler.split("Controller")[0]],
          produces: ["application/json"],
          parameters: [],
          responses: {
            200: { description: "The requested data of endpoint" },
            500: { description: "A server error ocurred" }
          }
        };

        checkMiddlewareAndAddToConfigs(route.middlewareList, "auth", () => {
          configs.security = [{ [securityDefinition]: [] }];
          configs.responses[401] = {
            description: "JWT token must be provided"
          };
        });

        checkMiddlewareAndAddToConfigs(
          route.middlewareList,
          "whereClause",
          () => {
            configs.parameters.push({
              name: "whereClause",
              in: "query",
              description: "Where clauses to filter the response result"
            });
          }
        );

        checkMiddlewareAndAddToConfigs(
          route.middlewareList,
          "queryFields",
          () => {
            configs.parameters.push({
              name: "queryFields",
              in: "query",
              description:
                "Query fields to return in the response result, nested fields acceptable"
            });
          }
        );

        checkMiddlewareAndAddToConfigs(
          route.middlewareList,
          "getProfiles",
          () => {
            configs.parameters.push({
              name: "userId",
              in: "query",
              description:
                "Lawsuit filter to select a logged user Lawsuit by its id"
            });
          }
        );

        routes[route._route] = { [verb.toLowerCase()]: configs };
      });

    return routes;
  }, {});
});

function AdonisSwaggerprovider(options) {
  if (routes) {
    Object.keys(routes).forEach(routesKey => {
      options.paths[routesKey] = options.paths[routesKey] || {};

      const optionRoute = options.paths[routesKey];
      const route = routes[routesKey];

      Object.keys(route).forEach(routeKey => {
        optionRoute[routeKey] = optionRoute[routeKey] || {};

        if (route[routeKey].parameters && optionRoute[routeKey].parameters) {
          optionRoute[routeKey].parameters = [
            ...route[routeKey].parameters,
            ...optionRoute[routeKey].parameters
          ];
        }

        optionRoute[routeKey] = {
          ...route[routeKey],
          ...optionRoute[routeKey]
        };
      });
    });
  }

  return options;
}

module.exports = AdonisSwaggerprovider;
