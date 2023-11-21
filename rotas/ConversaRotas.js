const express = require("express");
const router = express.Router();

const ConversaController = require("../controllers/ConversaController");

// listar
router.get("/aluno", ConversaController.listarConversasAluno);
router.get("/tutor", ConversaController.listarConversasTutor);

// deletar
router.delete("/excluir/:id", ConversaController.excluirConversa);

//criar
router.post("/criar", ConversaController.criarConversa);

module.exports = router;
