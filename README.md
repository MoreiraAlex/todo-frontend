# To-Do List (Front-end)

## Sobre o Projeto

O front-end da aplicação To-Do List foi desenvolvido com HTML, CSS e JavaScript. Ele permite a interação com a API de tarefas através de chamadas AJAX, possibilitando a criação, edição, exclusão e listagem de tarefas.

## Deploy
A aplicação front-end está hospedada no GitHub Pages e pode ser acessada em:
```bash
https://moreiraalex.github.io/todo-frontend/index.html
```

## Interação com a API
O front-end se comunica com o back-end utilizando a seguinte URL para todas as requisições:
```bash
http://18.230.152.7:3000
```

## Funcionalidades

- **Adicionar nova tarefa**: Um modal é exibido para adicionar uma tarefa com título, descrição, prioridade e status.
- **Editar tarefa**: As tarefas podem ser editadas diretamente na interface, usando um modal.
- **Excluir tarefa**: Um botão de deletar permite remover tarefas.
- **Listar todas as tarefas**: As tarefas são exibidas em uma lista com seus detalhes.

## Como Rodar o Projeto

### Pré-requisitos

- Um navegador moderno (Google Chrome, Firefox, etc.).
- Conexão com a API do back-end.

### Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/MoreiraAlex/todo-frontend.git frontend
    ```

2. Navegue até a pasta do front-end:
    ```bash
    cd frontend
    ```

3. Abra o arquivo `index.html` no navegador ou sirva o conteúdo da pasta usando um servidor local como o Live Server.

### Interação com a API

A aplicação front-end se comunica com a API de tarefas (back-end) através de requisições AJAX. Para que a aplicação funcione corretamente, o back-end deve estar rodando.


## Tecnologias Utilizadas

- **HTML**
- **CSS**
- **JavaScript (AJAX)**

## Autenticação

- O front-end utiliza **JWT** para autenticar o usuário. Após o login, o token JWT é armazenado no `localStorage` e enviado nas requisições subsequentes para garantir que apenas usuários autenticados possam acessar determinadas funcionalidades.
