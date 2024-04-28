# Football Data App

## Descrição do Projeto

Este projeto consiste em uma aplicação web para visualização de dados de competições de futebol e informações sobre times e jogadores. Utilizando a API da Football-Data.org, os usuários podem buscar competições por nome, visualizar a classificação das competições, e obter detalhes sobre times e jogadores.

## Tecnologias Utilizadas

- Next.js
- React
- TypeScript
- API da Football-Data.org

## Requisitos do Projeto

### 1. Filtrar Códigos de Liga com Detalhes e Bandeiras

**a) API Next.js:**
- Rota `/api/competicao/codes` para buscar dados de competições por nome.
- Utilização da chave de API da Football-Data.org para obter os dados.
- Filtro das competições por código e retorno de um JSON com os códigos e ícones dos campeonatos.

**b) Interface do Usuário:**
- Página `pages/competicoes/index.tsx` com interface para filtrar o nome do campeonato.
- Componente de pesquisa com autocomplete para facilitar a busca.
- Chamadas à API interna `/api/competicao/codes` para buscar os dados em tempo real.
- Exibição dos resultados da busca em uma lista com o código do campeonato, nome completo e bandeira do país.

### 2. Standings e Jogadores Destaque

**a) API Next.js:**
- Rota `/api/competicao/:code/standings` para obter dados da classificação da competição.
- Utilização da chave de API da Football-Data.org para buscar os dados da classificação.
- Retorno de um JSON com os times da temporada atual.

**b) Interface do Usuário:**
- Página `pages/competicoes/[id]/standings.tsx` para exibir os detalhes da competição selecionada.
- Exibição da classificação completa da competição, incluindo times, pontos, vitórias, etc.

### 3. Detalhes do Time e Jogador

**a) API Next.js:**
- Rota `/api/competicao/:id/time/:timeId` para obter dados do time selecionado.
- Utilização da chave de API da Football-Data.org para buscar os dados do time.
- Retorno de um JSON com o nome completo do time, escudo, estádio, treinador, lista de jogadores e respectivas informações.
- Rota `/api/jogador/:id` para obter dados do jogador selecionado.
- Utilização da chave de API da Football-Data.org para buscar os dados do jogador.
- Retorno de um JSON com o nome completo do jogador e informações relevantes.

**b) Interface do Usuário:**
- Página `pages/competicoes/[id]/time/[timeId]` para exibir os detalhes do time selecionado.
- Exibição do nome completo do time, escudo e lista de jogadores com seus respectivos nomes.
- Inclusão de fotos dos jogadores e links para suas páginas de perfil individuais.
- Página `pages/jogador/[id]` para exibir os detalhes do jogador selecionado.
- Exibição dos dados do jogador na tela.

## Comandos

Os seguintes comandos são úteis para o desenvolvimento e execução do projeto:

-   `dev`: Inicia o servidor de desenvolvimento do Next.js.
-   `build`: Compila o projeto para produção.
-   `start`: Inicia o servidor em produção.
-   `lint`: Executa a verificação de linting no código.
-   `format`: Formata automaticamente o código usando o Prettier.
