import Quagga from 'quagga';

export async function readBarcodeFromImage(imagePath: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return reject("Erro ao obter contexto do canvas"); // Retorno antecipado
      }

      ctx.drawImage(img, 0, 0);
      const base64Image = canvas.toDataURL('image/jpeg').split(',')[1]; // Conversão direta

      Quagga.decodeSingle({
        decoder: { readers: ["ean_reader", "code_128_reader", "code_39_reader", "upc_reader", "upc_a_reader"] },
        locate: true,
        src: `data:image/jpeg;base64,${base64Image}`
      }, (result: any) => {
        Quagga.stop(); // Parada imediata do Quagga
        resolve(result?.codeResult?.code || null); // Resolução simplificada
      });

      Quagga.on("error", (err: any) => {
        console.error("Erro ao decodificar com Quagga:", err);
        Quagga.stop();
        reject(err);
      });
    };

    img.onerror = reject; // Tratamento de erro simplificado
    img.src = imagePath;
  });
}

// Exemplo de uso (sem alterações):
async function lerCodigoDeBarras(caminhoDaImagem: string) {
  try {
    const codigo = await readBarcodeFromImage(caminhoDaImagem);
    if (codigo) {
      console.log("Código de barras lido:", codigo);
    } else {
      console.log("Nenhum código de barras encontrado na imagem.");
    }
  } catch (erro) {
    console.error("Ocorreu um erro:", erro);
  }
}

lerCodigoDeBarras("./caminho/para/sua/imagem.jpg");