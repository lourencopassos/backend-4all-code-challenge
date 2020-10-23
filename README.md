# 📽️ API Node - Desafio Técnico Backend Node.Js

### Repositório do desafio técnico para desenvolvedor de Node.Js na empresa: 4all. Para saber mais sobre o escopo do desafio, [clique aqui](https://docs.google.com/document/d/1YUJ5fEf0bFmVFQGqCSIgOQ3PCgeBt0lsKloV2ZGWZps/edit).

## 🚀 Características do desafio

- Utilização de Node.Js
- Utilização de banco de dados SQL
- Utilização de Typescript

## 👨🏽‍💻 Tecnologias utilizadas
- Node.js
- Typescript
- MySQL
- Knex
- Express
- JwtToken
- Bcrypt
- Uuid
- MySQL Workbench

## 📝 Requisitos funcionais
Para uma visão completa das user stories do desafio, [clique aqui](https://docs.google.com/document/d/1YUJ5fEf0bFmVFQGqCSIgOQ3PCgeBt0lsKloV2ZGWZps/edit).

## 🚙 Instruções para rodar a aplicação

1. `npm install` para instalar todas as dependências;
2. `npm start` para rodar localmente o projeto.

_Observação: o repositório contém um arquivo .env para faciltar rodar localmente a aplicação. Os scripts de criação do banco de dados se encontram mais para baixo_

## 🔑 Acesso

```

email: client@4all.com.br
password: 123456

```

## 🛤 Rotas da Aplicação
- Na API desenvolvida há rotas públicas e protegidas.
- Nas protegidas, há a necessidade de usar o header "Authorization:" token.
- O token tem duração de 90 minutos.

### 🔓 Rotas Públicas

<br>

- **Criação de usuário**

**`POST /user/signup`** A rota deve receber um `email`, `password` e `name` dentro do corpo da requisição. O `password` então é encriptado utilizando o `bcrypt` antes de ser gravado no banco de dados, assim como é gerado um id utilizando o `Uuid`. A resposta deste endpoint é já a geração de token, para facilitar o login pós cadastro. 

Exemplo de requisição:

```
{
  "email": "user@email.com",
  "password": "123456",
  "name": "user"
}
```
- **Login de usuário**

**`POST /user/login`** A rota deve receber um `username`, `password` no corpo da requisição para a geração de token, que carrega o a liberação do usuário dentro da aplicação. A resposta deste é endpoint é o token.

Exemplo de requisição:

```
{
  "email": "user@email.com",
  "password": "123456"
}
```

Exemplo de resposta:

``` 
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNjAyOTg5ODk0LCJleH..."
}
```


### 🔐 Rotas Privadas

<br>

- **Logout de usuário **

**`POST /user/logout`** A rota verifica se há `token` de acesso válido e posteriormente envia para o lado do cliente um novo token com valor `null`.


Exemplo de resposta:

``` 
{
    "token": null
}
```

- **Aluguel de filmes**

**`PUT /movie/rent/:id`**  A rota recebe via _path variable_ o `id` do filme que será alugado e antes verifica se aquele filme específico está disponível. Há também verificação de validade de `token`

- **Devolução de filmes**

**`PUT /movie/return/:id`**  A rota recebe via _path variable_ o `id` do filme que será devolvido e antes verifica se aquele filme específico está de fato alugado. Há também verificação de validade de `token`

- **Lista de filmes disponíveis** 

**`GET /movie/available`** A rota verifica a validade do `token` e retorna a lista dos filmes que no banco de dados estão registrados como disponíveis. O MySQL utiliza o `1` para classificar como verdadeira uma condição e `0` como falsa.

Exemplo de resposta:

```
{
    "movies": [
        {
            "id": "5ad1fb20-d590-4aff-be04-350ee97920f0",
            "title": "Dunkirk",
            "director": "Christopher Nolan",
            "available": 1
        },
        {
            "id": "6d9e5ff7-1f11-44d5-a308-a8baacfa9ed9",
            "title": "O Irlandês",
            "director": "Martin Scorcese",
            "available": 1
        },
        {
            "id": "788cca3a-931f-4898-a209-65869ee7c5fb",
            "title": "A Ilha do Medo",
            "director": "Martin Scorcese",
            "available": 1
        },
        {
            "id": "ce3f7ab9-8963-437b-994c-02844acbdfc8",
            "title": "Dunkirk",
            "director": "Christopher Nolan",
            "available": 1
        }
    ]
}
```

- **Filtrar filmes por título** 

**`GET /movie/filter`** A rota verifica a validade do `token` e retorna a lista dos filmes a partir do nome filtrado recebido através do _query params_.

Exemplo de resposta: 

```
{
    "movies": [
        {
            "id": "b35f550d-4f1a-4f01-97d1-9e999265de13",
            "title": "Us",
            "director": "Jordan Peele",
            "available": 1
        }
    ]
}
```

- **Criar filme**

**`POST /movie/create`** A rota verifica a validade do `token` e recebe no _body_ as informações do filme a ser criado: `title`,`director` e `available`. 

Exemplo de Requisição

```
{
    "title": "Batman Begins",
    "director": "Christopher Nolan",
    "available": true
}
```

## 🗄️ Banco de dados

Tabela de usuários:

```
CREATE TABLE Users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
); 

```

Tabela de filmes

```

CREATE TABLE Movies (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  director VARCHAR(255) NOT NULL,
  available BOOLEAN NOT NULL DEFAULT 1
); 

```





#### 👋🏽 Contato

Lourenço Passos | Desenvolvedor Web Fullstack | lo.passos93@gmail.com | 51-996106010




