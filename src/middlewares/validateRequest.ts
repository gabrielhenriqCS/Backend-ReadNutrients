import { Request, Response } from "express";

// Validação para a rota POST /nutritionconsults
export function validateBarcode(req: Request, res: Response) {
  const {barcode} = req.params
  if (barcode == "") {
    res.status(400).send({
      message: "Código não pode ser vazio"
    });
  };

  if (!barcode) {
    res.status(404).send({
      message: "Código de barras não encontrado"
    });
  }
};



// function validarUUID(id: string): boolean {
//   const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
//   return uuidRegex.test(id);
// }

// Validação para a rota GET /nutritionconsults/:id
// export function validateGetConsultById(req: Request, res: Response) {
//   const { id } = req.params;
//   if (!id) {
//     res.status(404).send({
//       message: "ID não encontrado"
//     })
//   }
  
//   if (!validarUUID(id)) {
//     res.status(400).send({
//       message: "ID não é do tipo UUID"
//     })
//   }
// };


