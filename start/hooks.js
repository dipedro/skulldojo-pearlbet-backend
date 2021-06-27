"use strict";

const { hooks } = require("@adonisjs/ignitor");
const databaseConnect = require("./hooks/databaseConnect");

hooks.after.providersBooted(databaseConnect);
