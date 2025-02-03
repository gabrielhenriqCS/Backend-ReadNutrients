import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json([
        {
            data: "03-02-2025",
            titulo: 'Consulta 1',
            dados: {
                calorias: 2000,
                proteinas: 100,
                carboidratos: 200,
                gorduras: 50
            }
        },
        {
            data: "03-02-2025",
            titulo: 'Consulta 2',
            dados: {
                calorias: 2000,
                proteinas: 100,
                carboidratos: 200,
                gorduras: 50
            }
        },
    ])
})


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

