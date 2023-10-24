# Teste de ROBSON MONTEIRO para candidato à vaga de Desenvolvedor Fullstack Junior

Olá avaliador,

Neste teste, apliquei todos os meus conhecimentos e utilizei o ChatGPT juntamente com modelos de projetos anteriores para tentar atender a todas as exigências da avaliação. Certamente, não consegui alcançar a perfeição, mas dediquei-me ao máximo para entregar o melhor dentro dos meus conhecimentos.

O projeto utiliza containers (DOCKER):

- O projeto possui uma arquitetura no padrão MVC.
- O frontend é baseado no framework Angular com TypeScript.
- O backend é baseado em Node.js com JavaScript.
- O banco de dados utilizado é o não-relacional MongoDB.

## Passos para executar a aplicação web:

### 1. Rodar a API ** "Pré-requisito: O Docker deve estar instalado e em execução no sistema." **

0. git clone https://github.com/Robsonnsbr/teste-robson.git

Dentro da pasta `srv-api`, abra o terminal e execute os seguintes comandos:

1. `docker-compose build`
2. Aguarde a construção terminar!
3. `docker-compose up`
4. OBS: A Api é reponsável pela construção e migração automatica de tabelas do banco(MongoDB).
6. OBS: Se tudo todos os passos estivem corretos o banco vai estar em pleno funcionamento juntamente com a API.
5. Aguarde a API iniciar!


A API estará rodando. Para confirmar, acesse o endpoint: [http://localhost:3000/](http://localhost:3000/)

### 2. Rodar o APP

Dentro da pasta `srv-web`, abra o terminal e execute os seguintes comandos:

1. `docker build -t app .`
2. Aguarde a construção terminar!
3. `docker run -it --rm -p 8080:8080 app`
4. Aguarde o APP iniciar!

O APP estará rodando. Para confirmar, acesse o endpoint: [http://localhost:8080/](http://localhost:8080/)

## Aproveite!
