import { Request, Response } from "express";

export function errorHandler(
  req: Request,
  res: Response
) {
  res.status(500).json({ error: "Erro ao processar a requisição." });
}