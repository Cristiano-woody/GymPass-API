## REQUISITOS FUNCIONAIS 

- [X] Deve ser possivel se cadastrar. 
- [X] Deve ser possivel se autenticar.
- [X] Deve ser possivel obter o perfil de um usuario logado.
- [ ] deve ser possivel obter o numero de checl-ins do usuario logado.
- [x] deve ser possivel o usuário obter o histórico de check-ins.
- [ ] deve ser possivel o usuario buscar academias proximas.
- [ ] deve ser possivel o usuario buscar academias pelo nome.
- [X] deve ser possivel o usuario realizar check-ins em uma academia.
- [ ] deve ser possivel validar o cke-in de um usuario.
- [X] deve ser possivel cadastrar uma academia.

## REGRAS DE NEGÓCIO

- [X] o usuario nao pode se cadastrar com um email duplicado.
- [X] o usuario nao ode fazer 2 check-ins no mesmo dia.
- [ ] o usuario nao pode fazer checkin se nao estiver perto da academia (100M).
- [ ] o checkin so pode ser validado 20 minutos apos ser criado.
- [ ] o checkin so pode ser validado por administradores

## REQUISITOS NÃO FUNCIONAIS

- [X] a senha do usuario precisa ser criptografada.
- [X] os dados da aplicaćão precisam ser persistidos em um banco de dados PostgreSQL.
- [ ] todas as listas de dados precisam estar paginadas com 20 itens por páginas.
- [ ] o usuário deve ser identificado por um JWT.
