"use strict";

const { ObjectId } = use("mongodb");
const Mentor = use("App/Models/Mentor");

class MentorController {
  async lista({ }) {
    return Mentor.query()
      .fetch();
  }
}

module.exports = MentorController;
