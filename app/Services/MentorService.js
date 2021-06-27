"use strict";
const Mentor = use("App/Models/Mentor");
const { pick } = use("lodash");

class MentorService {
  static async pegarDadosById(eventos) {
    const _eventos = [];
    for await (let evento of eventos) {
      const { mentor_id } = evento;
      const mentores = await Mentor
        .query()
        .where({ _id: { $in: mentor_id } })
        .fetch();

      _eventos.push({
        ...pick(evento, ["_id", "data"]),
        mentores
      });
    }
    return _eventos;
  }
}

module.exports = MentorService;
