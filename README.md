# Alura Books 📚
Projeto realizado durante os cursos de API com NodeJS e Express. Neste curso aprendemos sobre:

- Tratar erros de uma API de forma elegante;
- Aplicar validações do mongoose para garantir dados mais consistentes no MongoDB;
- Incluir buscas e filtros e utilize os operadores do MongoDB;
- Implementar paginação e reutilizar em diferentes rotas.

O projeto foi feito com o propósito de aprender sobre melhorias que podem ser implementadas em um projetos NodeJS, e como realizar manutenção para erros, validações, middlewares, etc.

## Clonando o repositório :rocket:
```bash
# Clone este repositório
$ git clone https://github.com/rafaellore/api-node-express-2

# Acesse a pasta do projeto no terminal/cmd
$ cd api-node-express-2

# Instale as dependências
$ yarn install

# Substituia a ENV utilizada para algum banco via MongoDB Atlas

# Execute a aplicação localmente
$ yarn dev
```


### Livros - Endpoints

- **`GET https://<base_url>/livros`**  
  Retorna uma lista de todos os livros cadastrados.  
  - **Parâmetros opcionais de query (paginação):**  
    - `pagina`: número da página (ex.: `?pagina=1`).  
    - `limite`: quantidade de itens por página (ex.: `?limite=10`).

- **`GET https://<base_url>/livros/busca`**  
  Realiza uma busca por livros com base em filtros específicos.  
  - **Parâmetros opcionais de query:**  
    - `editora`: filtra livros por editora (ex.: `?editora=EditoraX`).  
    - `titulo`: filtra livros cujo título contenha o valor informado (ex.: `?titulo=JavaScript`).  
    - `minPaginas`: retorna livros com no mínimo o número especificado de páginas (ex.: `?minPaginas=100`).  
    - `maxPaginas`: retorna livros com no máximo o número especificado de páginas (ex.: `?maxPaginas=500`).  
    - `nomeAutor`: retorna livros escritos por um autor específico (ex.: `?nomeAutor=João Silva`).

- **`GET https://<base_url>/livros/:id`**  
  Retorna os detalhes de um livro específico.  
  - **Parâmetros de rota:**  
    - `id`: ID do livro (ex.: `GET /livros/123`).

- **`POST https://<base_url>/livros`**  
  Cadastra um novo livro.  
  - **Corpo da requisição (JSON):**  
    ```json
    {
      "titulo": "Título do Livro",
      "editora": "Nome da Editora",
      "numeroPaginas": 250,
      "autor": "ID do Autor"
    }
    ```

- **`PUT https://<base_url>/livros/:id`**  
  Atualiza as informações de um livro existente.  
  - **Parâmetros de rota:**  
    - `id`: ID do livro (ex.: `PUT /livros/123`).  
  - **Corpo da requisição (JSON):**  
    ```json
    {
      "titulo": "Título Atualizado",
      "editora": "Editora Atualizada",
      "numeroPaginas": 300
    }
    ```

- **`DELETE https://<base_url>/livros/:id`**  
  Exclui um livro do sistema.  
  - **Parâmetros de rota:**  
    - `id`: ID do livro (ex.: `DELETE /livros/123`).

---

### Tratamento de Erros
- **404 - Não Encontrado**: Quando o `id` ou filtro fornecido não corresponde a um recurso existente.  
- **500 - Erro Interno**: Para erros inesperados durante o processamento das requisições.

### Exemplos de Uso

1. **Listar Livros (com paginação):**  
   ```bash
   curl -X GET "https://<base_url>/livros?pagina=1&limite=5"



### Autores - Endpoints

- **`GET https://<base_url>/autores`**  
  Retorna uma lista de todos os autores cadastrados.  
  - **Parâmetros opcionais de query**:  
    - `pagina`: número da página para paginação (ex.: `?pagina=1`).  
    - `limite`: quantidade de itens por página (ex.: `?limite=10`).

- **`GET https://<base_url>/autores/:id`**  
  Retorna os detalhes de um autor específico.  
  - **Parâmetros de rota**:  
    - `id`: ID do autor (ex.: `GET /autores/123`).

- **`POST https://<base_url>/autores`**  
  Cadastra um novo autor.  
  - **Corpo da requisição (JSON)**:  
    ```json
    {
      "nome": "Nome do Autor",
      "nacionalidade": "País",
    }
    ```

- **`PUT https://<base_url>/autores/:id`**  
  Atualiza as informações de um autor existente.  
  - **Parâmetros de rota**:  
    - `id`: ID do autor (ex.: `PUT /autores/123`).  
  - **Corpo da requisição (JSON)**:  
    ```json
    {
      "nome": "Nome Atualizado",
      "nacionalidade": "País Atualizado",
    }
    ```

- **`DELETE https://<base_url>/autores/:id`**  
  Exclui um autor do sistema.  
  - **Parâmetros de rota**:  
    - `id`: ID do autor (ex.: `DELETE /autores/123`).

---

### Tratamento de Erros
- **404 - Não Encontrado**: Quando o `id` fornecido não corresponde a um autor existente.  
- **500 - Erro Interno**: Para erros inesperados durante o processamento das requisições.

### Exemplos de Uso

1. **Listar Autores (com paginação):**  
   ```bash
   curl -X GET "https://<base_url>/autores?pagina=1&limite=5"


