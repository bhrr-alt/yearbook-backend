# API do Yearbook — Documentação de Endpoints

    Base URL (produção): `https://yearbook-backend.vercel.app`

    ## Convenções

    - Todas as respostas são em JSON
    - Rotas protegidas exigem header `Authorization: Bearer <token>`
    - O campo `senhaHash` nunca é retornado em nenhuma resposta
    - Erros seguem o formato `{ "erro": "mensagem descritiva" }`


## CORS

Esta API tem CORS habilitado para qualquer origem. Você pode consumi-la
de qualquer domínio (localhost, Vercel, etc.) sem configuração adicional
no cliente.

## Auth

    ### POST /auth/register

    Cria uma nova conta de aluno.

    - **Autenticação:** Não
    - **Body:**

    ```json
    {
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "senha": "minhasenha123",
      "cidade": "Salinas",
      "frase": "Aqui começa o futuro.",
      "planosFuturos": "Cursar Ciência da Computação na UFMG"
    }
    ```

    - **Resposta de sucesso:** `201 Created`

    ```json
    {
      "id": 1,
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "cidade": "Salinas",
      "frase": "Aqui começa o futuro.",
      "planosFuturos": "Cursar Ciência da Computação na UFMG",
      "fotoUrl": null,
      "role": "USER",
      "criadoEm": "2026-04-03T10:30:00.000Z"
    }
    ```

    - **Erros:**
      - `400` — Campos obrigatórios ausentes
      - `409` — Email já cadastrado


### POST /auth/login

    Autentica um aluno e retorna um token JWT.

    - **Autenticação:** Não
    - **Body:**

    ```json
    {
      "email": "maria@email.com",
      "senha": "minhasenha123"
    }
    ```

    - **Resposta de sucesso:** `200 OK`

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

    - **Erros:**
      - `401` — Credenciais inválidas (email não existe ou senha incorreta)


## Alunos

  ###GET /alunos
  Lista todos os alunos.
  
    - **Autenticação:** Não
    - **Body:** Nenhum

    - **Resposta de sucesso:** '200 OK'

  ```json
    {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@email.com",
      "cidade": "Fruta de Leite",
      "frase": "Aprendendo sempre, sempre errar",
      "planosFuturos": "Ser desenvolvedor full-stack",
      "fotoUrl": "https://link-da-foto.com/joao.jpg",
      "role": "ALUNO",
      "criadoEm": "2026-05-12T12:34:56.000Z"
    },
    {
      "id": 2,
      "nome": "Maria Souza",
      "email": "maria@email.com",
      "cidade": "Salinas",
      "frase": "o mais forte sobriveve",
      "planosFuturos": "Trabalhar com IA",
      "fotoUrl": "https://link-da-foto.com/maria.jpg",
      "role": "ALUNO",
      "criadoEm": "2026-05-10T09:22:33.000Z"
    }
  ```
    - **Erros:** Nenhum

  ###GET /alunos/:id
  Busca um aluno pelo ID.

    - **Autenticação:** Não
    - **Body:** Nenhum

    - **Resposta de sucesso:** '200 OK'

  ```json
    {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@email.com",
      "cidade": "Fruta de Leite",
      "frase": "Tamo Tentando",
      "planosFuturos": "Ser desenvolvedor full-stack",
      "fotoUrl": "https://link-da-foto.com/joao.jpg",
      "role": "ALUNO",
      "criadoEm": "2026-05-12T12:34:56.000Z"
    }
  ```
    - **Erros:**
    - '404' — Aluno não encontrado

  ###PUT /alunos/:id
  Atualiza o próprio perfil do aluno.

    - **Autenticação:** Bearer token
    - **Body:**
  
  ```json
    {
      "nome": "João Pedro",
      "cidade": "Rubelita",
      "frase": "To ficando loco ja de programar",
      "planosFuturos": "Ser CTO",
      fotoUrl": "https://link-da-foto.com/joao-pedro.jpg"
    }
  - **Resposta de sucesso:** '200 OK'
    {
      "id": 1,
      "nome": "João Pedro",
      "email": "joao@email.com",
      "cidade": "Rubelita",
      "frase": "to ficando loco ja de programar",
      "planosFuturos": "Ser CTO",
      "fotoUrl": "https://link-da-foto.com/joao-pedro.jpg",
      "role": "ALUNO",
      "criadoEm": "2026-05-12T12:34:56.000Z"
    }
  ```
    - **Erros:**
      - '401' — Não autenticado
      - '403' — Tentativa de atualizar outro perfil

  ###DELETE /alunos/:id
  Remove um aluno (apenas ADMIN).

    - **Autenticação:** Bearer token (admin)
    - **Body:** Nenhum

    - **Resposta de sucesso:** '204 No Content'

    - **Erros:**
      - '401' — Não autenticado
      - '403' — Não é admin

## Mensagens

  ###GET /mensagens
  Lista todas as mensagens do mural.

    - **Autenticação:** Não
    - **Body:** Nenhum

    - **Resposta de sucesso:** '200 OK'

  ```json
    {
      "id": 101,
      "texto": "Feliz em terminar o curso (ainda bem que ta acabando)!",
      "imagemUrl": "https://link-da-imagem.com/mensagem1.jpg",
      "autorId": 1,
      "autor": {
      "id": 1,
      "nome": "João Silva",
      "fotoUrl": "https://link-da-foto.com/joao.jpg"
    },
    "criadoEm": "2026-05-12T14:00:00.000Z"
    }
  ```

      - **Erros:** Nenhum

  ###POST /mensagens
  Cria uma nova mensagem no mural.

    - **Autenticação:** Bearer token
    - **Body:**

  ```json
    {
      "texto": "Minha mensagem nova guys!",
      "imagemUrl": "https://link-da-imagem.com/minha-mensagem jpg"
    }
    - **Resposta de sucesso:** '201 Created'
    {
      "id": 103,
      "texto": "Minha mensagem nova guys!",
      "imagemUrl": "https://link-da-imagem.com/minha-mensagem.jpg",
      "autorId": 1,
      "autor": {
      "id": 1,
      "nome": "João Silva",
      "fotoUrl": "https://link-da-foto.com/joao.jpg"
    },
    "criadoEm": "2026-05-12T16:45:00.000Z"
    }
    ```

       Erros:
      - '400' — Texto ausente
      - '401' — Não autenticado

    ###DELETE /mensagens/:id
    Exclui uma mensagem.

    - **Autenticação:** Bearer token
    - **Body:** Nenhum

    - **Resposta de sucesso:** '204 No Content'

    - **Erros:**
      - '401' — Não autenticado
      - '403' — Não é dono da mensagem nem admin