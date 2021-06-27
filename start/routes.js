"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
const Env = use("Env");
const glob = use("glob");

Route.on("/").render("welcome", { BACKEND_URL: Env.get("BACKEND_URL") });

glob("app/Routes/*Route.js", {}, function(er, routes) {
  for (let route of routes) {
    const module = route.replace("app", "App").replace(".js", "");
    use(module);
  }
});
