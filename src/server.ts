import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use(cors());

app.use("/home", routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
