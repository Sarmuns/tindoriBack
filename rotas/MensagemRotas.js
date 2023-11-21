const express = require("express");
const router = express.Router();

const MensagemController = require("../controllers/MensagemController");

router.get("/:id", MensagemController.listarMensagens);
router.post("/enviar", MensagemController.criarMensagem);
router.put("/:id", MensagemController.editarMensagem);
router.delete("/:id", MensagemController.deletarMensagem);

module.exports = router;
