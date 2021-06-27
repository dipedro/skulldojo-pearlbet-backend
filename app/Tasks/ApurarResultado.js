"use strict";

const { ObjectId } = use("mongodb");
const Task   = use("Task");
const Mail   = use("Mail");
const _      = use("lodash");
const moment = use("moment");
const Aposta = use("App/Models/Aposta");
const Evento = use("App/Models/Evento");

class ApurarResultado extends Task {
  static get schedule() {
    return "00 23 * * *";
    // return "*/1 * * * * *";
  }

  async handle() {
    console.info("Task ApurarResultado handle");

    const database = moment(new Date()).format('YYYY-MM-DD');
    const eventos = await Evento
      .query()
      .where({
        status: true,
        data: {
          '$gte': new Date(`${database}T00:00:00`),
          '$lte': new Date(`${database}T23:59:59`)
        }
      })
      .fetch();

    console.log(database);
    if(!eventos) return;

    for await (const evento of eventos.toJSON()) {
      // Desativa o evento já apurado
      await Evento
      .query()
      .where({
        _id: ObjectId(evento._id),
      })
      .update({ status: false });

      const apostas = await Aposta
        .query()
        .where({
          eventoId: ObjectId(evento._id)
        })
        .with('aluno')
        .with('mentor')
        .fetch();

      const apostasData = apostas.toJSON();
      const vencedores = [];
      const bcc = [];

      _.chain(apostasData)
      .groupBy('mentorId')
      .map(async (data, key) => {
        const [ alunoVencedor ] = _.orderBy(data, ['aposta', 'created_at'], ['desc', 'asc'])
        const { eventoId, eventoData, alunoId, aluno, mentorId, mentor } = alunoVencedor;

        vencedores.push({
          eventoData,
          aluno,
          mentor
        });

        // Marca o aluno vencedor
        await Aposta
          .query()
          .where({
            eventoId: ObjectId(eventoId),
            mentorId: ObjectId(mentorId),
            alunoId: ObjectId(alunoId),
          })
          .update({ vencedor: true });

        bcc.push(aluno.email)
        bcc.push(mentor.email);

        return;
      })
      .value();

      const [ item ] = vencedores;
      const data = {
        dataEvento: moment(item.eventoData).format("DD/MM/YYYY"),
        vencedores
      };


      await Mail.send("emails.vencedores", data, message => {
        message.from("thiago@corelab.com.br");
        message.to("thiago.zampieri@gmail.com");
        message.bcc(bcc)
        message.subject("[Skull Dojo] Bet Pearl - Lista de Vencedores");
      });
    }
  }
}

module.exports = ApurarResultado;
