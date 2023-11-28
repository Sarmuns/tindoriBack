const ConversaService = require("../services/ConversaService");

const listarConversasAluno = async (req, res) => {
  try {
    console.log("ID sendo enviado: " + req.body.id);
    const { data, error } = await ConversaService.listarConversasAluno(
      req.params.id
    );

    if (error) {
      throw new Error(`Erro ao buscar conversa do aluno: ${error}`);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarConversasTutor = async (req, res) => {
  try {
    const { data, error } = await ConversaService.listarConversasTutor(
      req.params.id
    );

    if (error) {
      throw new Error(`Erro ao buscar conversa do tutor: ${error}`);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const excluirConversa = async (req, res) => {
  try {
    const { data, error } = await ConversaService.excluirConversa(
      req.params.id
    );

    if (error) {
      throw new Error(`Erro ao buscar conversa: ${error}`);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const criarConversa = async (req, res) => {
  try {
    const { data, error } = await ConversaService.criarConversa(
      req.body.id_aluno,
      req.body.id_tutor
    );

    if (error) {
      throw new Error(`Erro ao buscar conversa do tutor: ${error}`);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarConversasAluno,
  listarConversasTutor,
  excluirConversa,
  criarConversa,
};
