"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Aposta extends Model {
  static get objectIDs() {
    return ["_id"];
  } //default return ['_id']

  mentor() {
    return this.belongsTo("App/Models/Mentor", "mentorId", "_id");
  }

  aluno() {
    return this.belongsTo("App/Models/Aluno", "alunoId", "_id");
  }
}
module.exports = Aposta;
