"use strict";
const Aluno = use("App/Models/Aluno");

class AlunoController {
  async lista({ }) {
    return Aluno.query()
      .fetch();
  }
}

module.exports = AlunoController;
