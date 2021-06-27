"use strict";
const { ObjectId } = use("mongodb");
const Aposta = use("App/Models/Aposta");
const Aluno = use("App/Models/Aluno");

class ApostaController {
  async apostar({ request }) {
    const { eventoId, eventoData, alunoId, mentorId, aposta } = request.all();
    const esseLance = new Aposta();
    esseLance.eventoId   = ObjectId(eventoId);
    esseLance.eventoData = new Date(eventoData);
    esseLance.alunoId    = ObjectId(alunoId);
    esseLance.mentorId   = ObjectId(mentorId);
    esseLance.aposta     = aposta;

    const { alunoId: alunoIdObject } = esseLance;
    const aluno = await Aluno.query().where({ _id: alunoIdObject }).first();
    if (!aluno) return { certo: 0, saldo: 0, error: 1 };
    if (aluno.moeda < aposta) return { certo: 0, saldo: aluno.moeda };

    const certo = await esseLance.save();
    let saldo = 0;
    if (certo) {
      const alunoJSON = aluno.toJSON();
      const { moeda } = alunoJSON;
      saldo = moeda - aposta;
      await Aluno
        .query()
        .where({ _id: alunoIdObject })
        .update({ ...alunoJSON, moeda: saldo });
    }
    return { certo, saldo };
  }
}

module.exports = ApostaController;
