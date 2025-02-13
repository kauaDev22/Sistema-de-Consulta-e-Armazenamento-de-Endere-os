# Backend do Sistema de Consulta de Endereços

Este é o backend de um sistema que permite consultar endereços por CEP usando a API ViaCEP, armazenar os endereços consultados em um banco de dados MySQL e listar os endereços salvos com opções de ordenação.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para criar a API RESTful.
- **MySQL**: Banco de dados relacional para armazenar os endereços.
- **Axios**: Biblioteca para fazer requisições HTTP à API ViaCEP.
- **Dotenv**: Para gerenciar variáveis de ambiente.

## Funcionalidades

1. **Buscar Endereço por CEP**:
   - Consulta um endereço pelo CEP usando a API ViaCEP.
   - Armazena o endereço consultado no banco de dados.
   - Retorna o endereço em formato JSON.

2. **Listar Endereços Salvos**:
   - Retorna todos os endereços armazenados no banco de dados.
   - Permite ordenar os endereços por cidade, bairro ou estado.

3. **Validações**:
   - Valida o formato do CEP antes de consultar a API ViaCEP.
   - Valida os dados do endereço retornados pela API antes de salvar no banco de dados.

## Endpoints da API

### 1. Buscar Endereço por CEP

- **Método**: `GET`
- **URL**: `/api/address/:cep`
- **Descrição**: Consulta um endereço pelo CEP e o armazena no banco de dados.
- **Parâmetros**:
  - `cep` (obrigatório): CEP a ser consultado (ex: `01001000`).
- **Resposta de Sucesso**:
  ```json
  {
    "id": 1,
    "cep": "01001-000",
    "logradouro": "Praça da Sé",
    "complemento": "lado ímpar",
    "bairro": "Sé",
    "localidade": "São Paulo",
    "uf": "SP"
  }
Resposta de Erro:

json
Copy
{
  "error": "CEP não encontrado"
}
2. Listar Endereços Salvos
Método: GET

URL: /api/addresses

Descrição: Retorna todos os endereços armazenados no banco de dados.

Parâmetros Opcionais:

sortBy: Define a ordenação dos resultados (ex: localidade:asc, bairro:desc, uf:asc).

Resposta de Sucesso:

json
Copy
[
  {
    "id": 1,
    "cep": "01001-000",
    "logradouro": "Praça da Sé",
    "complemento": "lado ímpar",
    "bairro": "Sé",
    "localidade": "São Paulo",
    "uf": "SP"
  },
  {
    "id": 2,
    "cep": "01310-930",
    "logradouro": "Avenida Paulista",
    "complemento": "lado par",
    "bairro": "Bela Vista",
    "localidade": "São Paulo",
    "uf": "SP"
  }
]
Resposta de Erro:

json
Copy
{
  "error": "Erro ao buscar endereços"
}
Como Configurar o Projeto
Pré-requisitos
Node.js (v16 ou superior)

MySQL (ou um serviço de banco de dados MySQL)

Git (opcional)

Passos para Configuração
Clone o Repositório:

bash
Copy
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio/backend
Instale as Dependências:

bash
Copy
npm install
Configure o Banco de Dados:

Crie um banco de dados MySQL chamado address_db.

Execute o script SQL abaixo para criar a tabela addresses:

sql
Copy
CREATE TABLE addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cep VARCHAR(10) NOT NULL,
  logradouro VARCHAR(255),
  complemento VARCHAR(255),
  bairro VARCHAR(255),
  localidade VARCHAR(255),
  uf VARCHAR(2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Configure as Variáveis de Ambiente:

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

env
Copy
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=address_db
Substitua sua_senha pela senha do seu MySQL.

Inicie o Servidor:

bash
Copy
npm run dev
O servidor estará rodando em http://localhost:5000.

Como Testar a API
Usando o Postman
Buscar Endereço por CEP:

Método: GET

URL: http://localhost:5000/api/address/01001000

Resposta esperada: Endereço correspondente ao CEP.

Listar Endereços Salvos:

Método: GET

URL: http://localhost:5000/api/addresses

Parâmetro opcional: sortBy=localidade:asc

Resposta esperada: Lista de endereços ordenados.

Usando o curl
Buscar Endereço por CEP:

bash
Copy
curl -X GET http://localhost:5000/api/address/01001000
Listar Endereços Salvos:

bash
Copy
curl -X GET "http://localhost:5000/api/addresses?sortBy=localidade:asc"
Estrutura do Projeto
Copy
/backend
  /config
    - db.js          # Configuração do banco de dados
  /controllers
    - addressController.js  # Controlador para manipulação de endereços
  /models
    - Address.js     # Modelo de dados para endereços
  /routes
    - index.js       # Rotas da API
  /services
    - viaCepService.js # Serviço para consulta na API ViaCEP
  /validators
    - cepValidator.js  # Validador de CEP
    - addressValidator.js # Validador de endereço
  - server.js        # Ponto de entrada do backend
  - .env             # Variáveis de ambiente
  - package.json     # Dependências e scripts do backend
Contribuição
Faça um fork do projeto.

Crie uma branch para sua feature (git checkout -b feature/nova-feature).

Commit suas mudanças (git commit -m 'Adiciona nova feature').

Push para a branch (git push origin feature/nova-feature).

Abra um Pull Request.

Licença
Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.