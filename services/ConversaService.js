const ConversaModel = require("../models/ConversaModel");

class ConversaService {
  static async listarConversasAluno(alunoId) {
    return ConversaModel.listarConversasAluno(alunoId);
  }

  static async listarConversasTutor(tutorId) {
    return ConversaModel.listarConversasTutor(tutorId);
  }

  static async criarConversa(alunoId, tutorId) {
    return ConversaModel.criarConversa(alunoId, tutorId);
  }

  static async excluirConversa(conversaId) {
    return ConversaModel.excluirConversa(conversaId);
  }
}

module.exports = ConversaService;
