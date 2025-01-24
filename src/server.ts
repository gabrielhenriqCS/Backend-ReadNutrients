import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ConsultaController } from "./controllers/Controller";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use(cors());

const createConsultController = new ConsultaController();
const deleteConsultController = new ConsultaController();

app.get("/", (req, res) => {
    res.json({
        message: "teste"
    })
})

app.post("/consultar", createConsultController.createConsult.bind(createConsultController));

app.delete("/excluir/:id", deleteConsultController.deleteConsult.bind(deleteConsultController));

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

