"use strict";
const Evento = use("App/Models/Evento");
const MentorService = use("App/Services/MentorService");

class EventoController {
  async lista({ }) {
    const eventos = await Evento
      .query()
      .where({ status: true })
      .fetch();

    return MentorService.pegarDadosById(eventos.toJSON());
  }
}

module.exports = EventoController;
