import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ConsultaController } from "./controllers/ConsultController";
import { ListConsultController } from "./controllers/ListConsultController";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use(cors());

const createConsultController = new ConsultaController();
const listConsultController = new ListConsultController();
const deleteConsultController = new ConsultaController();

app.get("/", (req, res) => {
    res.json({
        message: "hello world"
    })
})

app.post("/consultar", createConsultController.createConsult.bind(createConsultController));

app.get("/listar/:id", listConsultController.listConsult.bind(listConsultController));

app.delete("/excluir/:id", deleteConsultController.deleteConsult.bind(deleteConsultController));

app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`);
});

