const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Use variável de ambiente

interface Teste {
  text: string;
  
}

async function testGemini(): Promise<void> {
  if (!GEMINI_API_KEY) {
    console.error("Chave de API Gemini não configurada!");
    return;
  }

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GEMINI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: {
          text: "Valores nutricionais do produto com código de barras 7896183202187",
        },
      }),
    });

    console.log("Status:", response.status);

    if (!response.ok) {
      console.error("Erro na requisição:", response.status, response.statusText);
      const errorText = await response.text();
      console.error("Corpo do erro:", errorText);
      return;
    }

    const data: Teste = (await response.json()) as Teste; // Adicione tipo
    console.log("Phrases:", data);
  } catch (error: any) {
    console.error("Erro:", error);
  }
}

testGemini();