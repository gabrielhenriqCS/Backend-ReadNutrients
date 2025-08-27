# Backend ReadNutrients

## Descrição
A **API ReadNutrients** é uma aplicação que permite consultar informações nutricionais de produtos a partir do código de barras, seja escaneado ou digitado. Utiliza inteligência artificial para buscar informações detalhadas na internet e exibir os nutrientes dos produtos.

## Tecnologias Utilizadas
- **Node.js** com **Express**
- **Prisma ORM**
- **PostgreSQL** (via Prisma)
- **TypeScript**
- **Google Generative AI** para consulta de dados

## Como Usar
A API está em produção e pode ser acessada no seguinte endpoint:

```
https://api-readnutrients.com
```

### Exemplos de Uso

#### 1. Consultar histórico dos dados nutricionais do código de barras de um produto

**Requisição:**
```http
GET /nutritionconsults/historic
```

**Resposta:**
```json
{
  "id": 1,
  "barcode": "1839464854",
  "date": "2025-03-02",
  "titulo": "Consulta 1"
  "calorias": 150,
  "carboidratos": 12,
  "proteinas": 5,
  "gorduras": 4,
  "fibras": 5
}
```

#### 2. Adicionar um novo produto manualmente

**Requisição:**
```http
POST /nutritionconsults
```
```json
{
  "barcode": "1234567890123"
}
```

**Resposta:**
```json
{
  "message": "Dados nutricionais obtidos com sucesso!",
    "data": {
        "title": "Consulta via Gemini API",
        "barcode": "7896183202187",
        "nutrition": {
            "barcode": "7896183202187",
            "calorias": 0,
            "carboidratos": 0,
            "proteinas": 0,
            "gorduras": 0,
            "fibra": 0
        }
    }
}
```

## Como Rodar Localmente
Caso queira rodar a API localmente, siga os passos:

### 1. Clone o repositório
```sh
git clone https://github.com/henriquedev24/API-ReadNutrients.git
cd API-ReadNutrients
```

### 2. Configure o ambiente
Crie um arquivo `.env` baseado no `.env.example` e configure as credenciais do banco de dados e da API de IA.

### 4. Instale as dependências
```sh
npm install
```

### 5. Execute as migrações do Prisma
```sh
npx prisma migrate dev
```

### 6. Inicie o servidor
```sh
npm run dev
```
A API estará disponível em `http://localhost:3000`.

## Contribuição
Se quiser contribuir, sinta-se à vontade para abrir uma _issue_ ou enviar um _pull request_.

## Licença
Este projeto está sob a licença MIT.

