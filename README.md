# Back-end GoBarber
Aplicação back-end das aulas *GoStack* da **Rocketseat**

> Aplicação em desenvolvimento

## Sobre o back-end
- Cadastro de agendamentos
- Cadastro de usuários
- Cadastro de fotos de pefil

## Techs/Ferramentas
- Node JS
- Typescript
- Postgres
    - Banco de dados
- pg
    - Driver do Postgres
- TypeORM
    - Para integração com o banco de dados
- express
    - Para definição das rotas
- uuidv4
    - Para geração de id's aleatórios
- reflect-metadata
    - Para utilização de sintaxe declarativa
- date-fns
    - Para manipulação da data
- jsonwebtoken
    - Para criação do token
- bcryptjs
    - Para criptografia da senha e token
- multer
    - Para o envio e manipulação de imagens

## Rotas
1. [http://localhost:3333/users](http://localhost:3333/users)
    - **POST**: Rota para a criação de um usuário
        - No body da requisição deve conter os seguintes dados
            ```
            {
	            "name" : "Gustavo",
	            "email": "gustavo.bene@hotmail.com",
	            "password": "123456"
            }
            ```
        - Retornos do **POST**
            1. Caso já possua algum usuário com o mesmo email cadastrado *Email address already used.*
            2. Caso haja sucesso no cadastro do agendamento
                ```
                {
                    "name": "Gustavo",
                    "email": "gustavo.bene@hotmail.com",
                    "id": "12bac465-0d7b-4952-a38c-4a5ecb2386cb",
                    "created_at": "2020-06-27T21:44:03.264Z",
                    "updated_at": "2020-06-27T21:44:03.264Z"
                }
                ```
        -

2. [http://localhost:3333/appointments](http://localhost:3333/appointments)
    - **POST**: Rota para a criação de um agendamento.
        - Só é permitido cadastros de hora em hora
        - No body da requisição deve conter os seguintes dados
            ```
            {
                "provider_id" : "d1c00401-9daf-45ab-85a5-6567baf899ad",
                "date" : "{% now 'iso-8601', '' %}"
            }
            ```
        - Retornos do **POST**
            1. Caso haja agendamento na mesma data e horário *This appointement is already booked*
            2. Caso haja sucesso no cadastro do agendamento
                ```
                {
                    "provider_id": "d1c00401-9daf-45ab-85a5-6567baf899ad",
                    "date": "2020-06-27T18:00:00.000Z",
                    "id": "e3b0d876-e848-4598-ba9d-9b6dee92a0f4",
                    "created_at": "2020-06-27T21:33:54.087Z",
                    "updated_at": "2020-06-27T21:33:54.087Z"
                }
                ```
    - **GET** : Rota que irá listar os agendamentos
        - Retorno do **GET**
            ```
            [
                {
                    "id": "71048b82-1cca-4ec0-9252-348f082d2ec4",
                    "provider_id": null,
                    "date": "2020-06-27T17:00:00.000Z",
                    "created_at": "2020-06-27T21:03:17.868Z",
                    "updated_at": "2020-06-27T21:03:17.868Z"
                },
            ]
            ```
3. [http://localhost:3333/users/avatar](http://localhost:3333/users/avatar)
    - **PATCH**: Rota para upload da imagem de perfil
        - No body da requisição deve conter a imagem
        - Retornos do **PATCH**
            1. Caso o usuário não esteja autenticado *Only authenticated users can change avatar*
            2. Caso de sucesso
                ```
                {
                    "id": "12bac465-0d7b-4952-a38c-4a5ecb2386cb",
                    "name": "Gustavo",
                    "email": "gustavo.bene@hotmail.com",
                    "avatar": "59c5edda5d1d3f61073f-Gustavo-Perfil.png",
                    "created_at": "2020-06-27T21:44:03.264Z",
                    "updated_at": "2020-06-28T02:43:47.901Z"
                }
                ```
