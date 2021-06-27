"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Evento extends Model {
  static get objectIDs() {
    return ["_id"];
  } //default return ['_id']

  mentores() {
    // return this.hasMany("App/Models/Mentor", "_id", "mentor_id", "_id", "_id"); //.select(["_id", "nome", "valor"])
    return this.embedsMany("App/Models/Mentor", "_id", "mentor_id", "_id", "_id"); //.select(["_id", "nome", "valor"])
  }
}
module.exports = Evento;
