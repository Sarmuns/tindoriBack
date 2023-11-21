const MensagemModel = require("../models/MensagemModel");

class MensagemService {
  static async listarMensagens(conversaId) {
    return await MensagemModel.listarMensagens(conversaId);
  }

  static async criarMensagem(conversaId, senderId, senderType, messageText) {
    return await MensagemModel.criarMensagem(
      conversaId,
      senderId,
      senderType,
      messageText
    );
  }

  static async editarMensagem(mensagemId, novosDados) {
    return await MensagemModel.editarMensagem(mensagemId, novosDados);
  }

  static async deletarMensagem(mensagemId) {
    return await MensagemModel.deletarMensagem(mensagemId);
  }
}

module.exports = MensagemService;
