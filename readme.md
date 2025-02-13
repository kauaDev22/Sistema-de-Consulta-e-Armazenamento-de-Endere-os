# Sistema de Consulta e Armazenamento de Endereços

Este é um sistema web que permite consultar endereços por CEP usando a API ViaCEP, armazenar os endereços consultados em um banco de dados MySQL e listar os endereços salvos com opções de ordenação.

## Tecnologias Utilizadas

- **Frontend**: Vue.js
- **Backend**: Node.js (Express)
- **Banco de Dados**: MySQL
- **Outras Ferramentas**: Axios, Dotenv, Knex.js (opcional)

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

## Como Configurar o Projeto

### Pré-requisitos

- Node.js (v16 ou superior)
- MySQL (ou um serviço de banco de dados MySQL)
- Git (opcional)

### Passos para Configuração

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Instale as Dependências**:
   - No diretório do backend:
     ```bash
     cd backend
     npm install
     ```
   - No diretório do frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Configure o Banco de Dados**:
   - Crie um banco de dados MySQL chamado `address_db`.
   - Execute o script SQL abaixo para criar a tabela `addresses`:
     ```sql
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
     ```

4. **Configure as Variáveis de Ambiente**:
   - No diretório do backend, crie um arquivo `.env` com o seguinte conteúdo:
     ```env
     PORT=5000
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=sua_senha
     DB_NAME=address_db
     ```
   - Substitua `sua_senha` pela senha do seu MySQL.

5. **Inicie o Backend**:
   - No diretório do backend, execute:
     ```bash
     npm run dev
     ```
   - O servidor estará rodando em `http://localhost:5000`.

6. **Inicie o Frontend**:
   - No diretório do frontend, execute:
     ```bash
     npm run serve
     ```
   - O frontend estará rodando em `http://localhost:8080`.

## Como Testar o Sistema

### Usando o Frontend

1. **Buscar Endereço por CEP**:
   - Acesse `http://localhost:8080`.
   - Digite um CEP válido (ex: `01001000`) no campo de busca e clique em "Buscar".
   - O endereço será exibido em formato JSON e salvo no banco de dados.

2. **Listar Endereços Salvos**:
   - Na mesma página, você verá a lista de endereços salvos.
   - Use o dropdown para ordenar os endereços por cidade, bairro ou estado.

### Usando o Postman

1. **Buscar Endereço por CEP**:
   - Método: `GET`
   - URL: `http://localhost:5000/api/address/01001000`
   - Resposta esperada: Endereço correspondente ao CEP.

2. **Listar Endereços Salvos**:
   - Método: `GET`
   - URL: `http://localhost:5000/api/addresses`
   - Parâmetro opcional: `sortBy=localidade:asc`
   - Resposta esperada: Lista de endereços ordenados.

## Estrutura do Projeto

```
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

/frontend
  /public
    - index.html     # Página principal
  /src
    /assets
      - styles.css   # Estilos globais
    /components
      - AddressForm.vue  # Componente para o formulário de busca de CEP
      - AddressList.vue  # Componente para listar endereços
    /views
      - Home.vue     # Página inicial
    /router
      - index.js     # Configuração do roteador
    /store
      - index.js     # Configuração do Vuex (se necessário)
    /services
      - api.js       # Serviço para comunicação com o backend
    - main.js        # Ponto de entrada do frontend
  - package.json     # Dependências e scripts do frontend
```

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---


