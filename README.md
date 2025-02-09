# API ReadNutrients

## Descrição
A **API ReadNutrients** é uma aplicação que permite consultar informações nutricionais de produtos a partir do código de barras, seja escaneado ou digitado. Utiliza inteligência artificial para buscar informações detalhadas na internet e exibir os nutrientes dos produtos.

## Tecnologias Utilizadas
- **Node.js** com **Express**
- **Prisma ORM**
- **PostgreSQL** (via Docker)
- **TypeScript**
- **Google Generative AI** para consulta de dados
- **Next.js** para a interface de exibição
- **Tailwind CSS** para estilização

## Como Usar
A API está em produção e pode ser acessada no seguinte endpoint:

```
https://api-readnutrients.com
```

### Exemplos de Uso

#### 1. Consultar informações de um produto pelo código de barras

**Requisição:**
```http
GET /nutrients/{barcode}
```

**Resposta:**
```json
{
  "name": "Iogurte Natural",
  "brand": "Marca X",
  "calories": 150,
  "carbohydrates": 12,
  "proteins": 5,
  "fats": 4
}
```

#### 2. Adicionar um novo produto manualmente

**Requisição:**
```http
POST /nutrients
```
```json
{
  "barcode": "1234567890123",
  "name": "Suco de Laranja",
  "brand": "Marca Y",
  "calories": 80,
  "carbohydrates": 20,
  "proteins": 1,
  "fats": 0
}
```

**Resposta:**
```json
{
  "message": "Produto cadastrado com sucesso!"
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

### 3. Suba o banco de dados com Docker
```sh
docker-compose up -d
```

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

