"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Mentor extends Model {
  static get objectIDs() {
    return ["_id"];
  }

  static get table() {
    return 'mentores' // TODO Verificar porque no mongo ele não pega essa instrução
  }
}
module.exports = Mentor;
