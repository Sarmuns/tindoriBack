const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const alunosRouter = require("./routes/alunos");
const tutoresRouter = require("./routes/tutores");
const materiasRouter = require("./routes/materias");

//
const ConversaRouter = require("./rotas/ConversaRotas");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Usando os roteadores para cada recurso
app.use("/alunos", alunosRouter);
app.use("/tutores", tutoresRouter);
app.use("/materias", materiasRouter);

//
app.use("/conversas", ConversaRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
