import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConsultaController from "./controllers/ConsultController";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        message: "hello world"
    })
})

app.post("/consultar", async (req, res) => {
    await ConsultaController.createConsult(req, res);
  });

app.listen(PORT, () => {
    console.log(`servidor rodando na porta 2000`);
});

