const MensagemService = require("../services/MensagemService");

const MensagemController = {
  async listarMensagens(req, res) {
    try {
      const conversaId = req.params.id;
      const { data, error } = await MensagemService.listarMensagens(conversaId);

      if (error) throw new Error(error);

      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async criarMensagem(req, res) {
    try {
      const { conversaId, senderId, senderType, messageText } = req.body;
      const { data, error } = await MensagemService.criarMensagem(
        conversaId,
        senderId,
        senderType,
        messageText
      );

      if (error) throw new Error(error);

      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async editarMensagem(req, res) {
    try {
      const { id } = req.params;
      const novosDados = req.body;
      const { data, error } = await MensagemService.editarMensagem(
        id,
        novosDados
      );

      if (error) throw new Error(error);

      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deletarMensagem(req, res) {
    try {
      const { id } = req.params;
      const { data, error } = await MensagemService.deletarMensagem(id);

      if (error) throw new Error(error);

      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = MensagemController;
