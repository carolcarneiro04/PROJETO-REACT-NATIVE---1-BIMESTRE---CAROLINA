# App Anime — Projeto React Native (1º Bimestre)

**Dupla / Aluno(a):** CAROLINA CARNEIRO SILVA

App mobile em React Native (Expo SDK 54) que consome a **API do AniList** (GraphQL, gratuita e sem chave: `https://graphql.anilist.co`).
Documentação: https://anilist.gitbook.io/anilist-apiv2-docs

## Telas
1. **Login** – Usuário e Senha. `ENTRAR` (confere com o usuário cadastrado) e `CADASTRAR USUÁRIO`.
2. **Cadastrar usuário** – Nome, Telefone, CPF, E-mail, Curso (+ Usuário e Senha para o login). `SALVAR` grava com AsyncStorage (o "LocalStorage" do React Native) e volta ao login.
3. **Cards** – digite o nome de um anime e toque em `+` (ADD) para buscar na API e criar o card (capa, nome, status, formato, episódios, nota). Botões `EXCLUIR` e `VER MAIS DETALHES`. A lista fica salva no aparelho.
4. **Mais detalhes** – nova consulta à API pelo `id`: título original, datas, temporada, estúdio, fonte, popularidade, gêneros e sinopse.

## Como executar
```bash
cd Gitview
npm install
npx expo install --fix   # ajusta as versões das bibliotecas ao Expo SDK 54
npx expo start
```
Abra o app com o **Expo Go** (QR Code) ou pressione `a` (Android) / `w` (web).

## Estrutura
```
Gitview/
├── App.js                # NavigationContainer + rotas
└── scr/
    ├── routes.js         # Stack: login, cadastro, main, detalhes
    ├── styles.js         # styled-components
    ├── services/api.js   # axios + consultas GraphQL do AniList
    └── pages/            # login, cadastro, main, detalhes
```
